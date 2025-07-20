"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import { Send, SendIcon } from "lucide-react";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyCAMx5Mj7oQwldDkyLR5mbAecgwXRV8OmI";

export default function ChatBot() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: t("chatbot.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // جلب الأسئلة المقترحة من الترجمة
  const suggestedQuestions = t.raw("chatbot.suggestedQuestions") || [];

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // تحديث رسالة الترحيب عند تغيير اللغة
  useEffect(() => {
    setMessages([{ from: "bot", text: t("chatbot.welcome") }]);
  }, [t]);

  // بناء البرومبت التعريفي
  function buildPrompt(userInput) {
    return (
      t("chatbot.introPrompt") +
      "\n" +
      t("chatbot.drInfo") +
      "\n\n" +
      (userInput || "")
    );
  }

  // تحقق إذا كان السؤال عن الحجز أو الدفع
  function checkQuickAnswer(q) {
    const bookingKeywords = ["حجز", "book", "موعد", "booking"]; // عربي وإنجليزي
    const paymentKeywords = ["دفع", "pay", "الدفع", "payment"]; // عربي وإنجليزي
    const servicesKeywords = [
      "الخدمات",
      "services",
      "أنواع الخدمات",
      "service",
    ];
    const lowerQ = q.toLowerCase();
    if (bookingKeywords.some((k) => lowerQ.includes(k))) {
      return t("chatbot.bookingSteps");
    }
    if (paymentKeywords.some((k) => lowerQ.includes(k))) {
      return t("chatbot.paymentSteps");
    }
    if (servicesKeywords.some((k) => lowerQ.includes(k))) {
      return t("chatbot.servicesList");
    }
    return null;
  }

  // عند الضغط على سؤال مقترح
  const handleSuggested = (q) => {
    if (loading) return;
    const quick = checkQuickAnswer(q);
    if (quick) {
      setInput("");
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: q },
        { from: "bot", text: quick },
      ]);
      return;
    }
    setInput("");
    setMessages((msgs) => [...msgs, { from: "user", text: q }]);
    setLoading(true);
    const prompt = buildPrompt(q);
    fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: aiText || t("chatbot.autoReply") },
        ]);
      })
      .catch(() => {
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: t("chatbot.error") },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const quick = checkQuickAnswer(input);
    if (quick) {
      setMessages([
        ...messages,
        { from: "user", text: input },
        { from: "bot", text: quick },
      ]);
      setInput("");
      return;
    }
    const userMsg = { from: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const prompt = buildPrompt(input);
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
      if (!res.ok) throw new Error("api");
      const data = await res.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: aiText || t("chatbot.autoReply") },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: t("chatbot.error") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bubble Message */}
      {!open && (
        <div className="fixed bottom-24 right-8 z-50 max-w-xs bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 text-gray-900 text-sm font-cairo animate-fade-in flex items-center gap-2">
          <span role="img" aria-label="wave">
            👋
          </span>
          <span>{t("chatbot.bubbleMessage")}</span>
        </div>
      )}
      {/* زر عائم */}
      <button
        className="fixed bottom-6 font-cairo right-6 z-50 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition cursor-pointer border-2 border-white"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("chatbot.open")}
        style={{ cursor: "pointer" }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 3C7.03 3 3 6.58 3 11c0 1.61.62 3.09 1.68 4.34L3 21l6.06-1.64C10.67 19.78 11.32 20 12 20c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* صندوق الشات */}
      {open && (
        <div
          className="fixed right-6 z-50 w-[380px] max-w-[98vw] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in"
          style={{ height: "540px", bottom: 24 }}
        >
          {/* رأس الشات */}
          <div className="bg-gradient-to-l from-gray-900 via-gray-800 to-gray-700 text-white px-5 py-4 flex justify-between items-center shadow-md">
            <span className="font-bold text-lg">{t("chatbot.title")}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("chatbot.close")}
              className="text-white hover:text-gray-300 transition cursor-pointer rounded-full w-8 h-8 flex items-center justify-center text-2xl"
              style={{ fontSize: 28, lineHeight: 1, cursor: "pointer" }}
            >
              ×
            </button>
          </div>
          {/* الرسائل */}
          <div className="flex-1 px-4 py-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-base shadow-md whitespace-pre-line break-words
                  ${
                    msg.from === "user"
                      ? "bg-gray-100 text-gray-900 rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                  }`}
                >
                  {msg.from === "bot" ? (
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-bold text-gray-900"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic text-gray-700" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc pl-5 my-2" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal pl-5 my-2" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-2" {...props} />
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="px-4 py-2 rounded-2xl text-base shadow-md bg-white border border-gray-200 text-gray-600 animate-pulse max-w-[80%]">
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* الأسئلة المقترحة */}
          {open && !input && !loading && suggestedQuestions.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-base text-gray-700 hover:bg-gray-100 transition cursor-pointer font-medium"
                  onClick={() => handleSuggested(q)}
                  type="button"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {/* إدخال الرسالة */}
          <form
            className="flex border-t border-gray-100 bg-white px-4 py-3 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="flex-1 px-4 py-3 outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
              placeholder={t("chatbot.inputPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              dir="rtl"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 text-base"
              disabled={!input.trim() || loading}
              style={{ cursor: "pointer" }}
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
