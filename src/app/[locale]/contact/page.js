"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { submitContactRequest } from "@/services/contactService";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const t = useTranslations("contact");
  const lang =
    typeof window !== "undefined" ? document.documentElement.lang : "ar";
  const info = t.raw("info") || [];
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const success = await submitContactRequest({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      topic: form.topic.value,
      message: form.message.value,
    });
    setLoading(false);
    if (success) {
      toast.success(
        lang === "ar" ? "تم إرسال الرسالة بنجاح" : "Message sent successfully"
      );
      form.reset();
    } else {
      toast.error(
        lang === "ar" ? "حدث خطأ أثناء إرسال الرسالة" : "Error sending message"
      );
    }
  }

  return (
    <>
      <Header />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          {/* معلومات التواصل */}
          <div>
            <div
              className={`flex flex-col items-start ${
                lang == "ar" ? "lg:text-right" : "lg:text-left"
              }`}
            >
              <h1 className="text-4xl font-semibold text-gray-900 mb-6  ">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0  ">
                {t("subtitle")}
              </p>
            </div>
            <ul className="space-y-4 mb-8 max-w-xl mx-auto lg:mx-0">
              {info.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-1"
                >
                  <div className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </div>
                  <div
                    className="text-gray-700 font-bold"
                    dir={`${lang == "ar" ? "ltr" : "rtl"}`}
                  >
                    {item.info}
                  </div>
                  <div className="text-gray-500 text-sm">{item.subtext}</div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/book-appointment"
                className="btn bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
              >
                {lang === "ar"
                  ? "احجز موعدك الآن"
                  : "Book Your Appointment Now"}
              </Link>
            </div>
          </div>
          {/* نموذج التواصل */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg max-w-xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                {t("formTitle")}
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    name="firstName"
                    type="text"
                    placeholder={t("form.firstNamePlaceholder")}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                    required
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder={t("form.lastNamePlaceholder")}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                    required
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  required
                />
                <input
                  name="phone"
                  type="text"
                  placeholder={t("form.phonePlaceholder")}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                />
                <select
                  name="topic"
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                >
                  {t.raw("form.options").map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  placeholder={t("form.messagePlaceholder")}
                  className="border border-gray-200 rounded-lg px-4 py-2 min-h-[100px] focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition"
                  disabled={loading}
                >
                  {loading
                    ? lang === "ar"
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : t("form.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
