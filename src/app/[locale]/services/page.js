"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ICONS = {
  consultation: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#E0E7FF" />
      <path
        d="M32 18C26.477 18 22 22.477 22 28C22 33.523 26.477 38 32 38C37.523 38 42 33.523 42 28C42 22.477 37.523 18 32 18ZM32 36C27.582 36 24 32.418 24 28C24 23.582 27.582 20 32 20C36.418 20 40 23.582 40 28C40 32.418 36.418 36 32 36Z"
        fill="#6366F1"
      />
      <path
        d="M32 40C24.268 40 18 46.268 18 54H20C20 47.373 25.373 42 32 42C38.627 42 44 47.373 44 54H46C46 46.268 39.732 40 32 40Z"
        fill="#6366F1"
      />
    </svg>
  ),
  cbt: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#FDE68A" />
      <rect x="20" y="28" width="24" height="16" rx="4" fill="#F59E42" />
      <rect x="28" y="20" width="8" height="16" rx="4" fill="#F59E42" />
      <rect x="24" y="36" width="16" height="4" rx="2" fill="#FFF7ED" />
    </svg>
  ),
  stress: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#A7F3D0" />
      <rect x="22" y="30" width="20" height="12" rx="6" fill="#059669" />
      <rect x="28" y="22" width="8" height="8" rx="4" fill="#059669" />
    </svg>
  ),
  group: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#FECACA" />
      <ellipse cx="32" cy="36" rx="14" ry="8" fill="#EF4444" />
      <ellipse cx="32" cy="28" rx="6" ry="6" fill="#EF4444" />
    </svg>
  ),
  couples: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#C7D2FE" />
      <ellipse cx="24" cy="36" rx="6" ry="8" fill="#6366F1" />
      <ellipse cx="40" cy="36" rx="6" ry="8" fill="#6366F1" />
    </svg>
  ),
  online: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
      <rect x="20" y="24" width="24" height="16" rx="4" fill="#3B82F6" />
      <rect x="28" y="32" width="8" height="4" rx="2" fill="#FFF" />
    </svg>
  ),
  crisis: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mb-4"
    >
      <circle cx="32" cy="32" r="32" fill="#FCA5A5" />
      <rect x="28" y="20" width="8" height="24" rx="4" fill="#DC2626" />
      <rect x="28" y="48" width="8" height="4" rx="2" fill="#DC2626" />
    </svg>
  ),
};

export default function ServicesPage() {
  const t = useTranslations("services");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });
      if (!error) setServices(data);
      setLoading(false);
    }
    fetchServices();
  }, []);

  const lang =
    typeof window !== "undefined" ? document.documentElement.lang : "ar";

  return (
    <>
      <Header />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">{t("title")}</h1>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          {lang === "ar"
            ? "نقدم مجموعة متكاملة من الخدمات النفسية لمساعدتك على تحقيق التوازن النفسي والنجاح في حياتك. جميع الجلسات بسرية تامة وبإشراف أخصائيين معتمدين."
            : "We offer a comprehensive range of mental health services to help you achieve balance and success in your life. All sessions are confidential and supervised by certified specialists."}
        </p>
        {loading ? (
          <div className="text-center py-12">
            {lang === "ar" ? "جاري تحميل الخدمات..." : "Loading services..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
              >
                {ICONS[service.icon] || ICONS["consultation"]}
                <h2 className="text-xl font-semibold mb-2">
                  {lang === "ar" ? service.title_ar : service.title_en}
                </h2>
                <p className="text-gray-600 text-center">
                  {lang === "ar"
                    ? service.description_ar
                    : service.description_en}
                </p>
              </div>
            ))}
          </div>
        )}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {lang === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <li className="bg-gray-50 rounded-lg p-6 shadow">
              <span className="text-3xl">🔒</span>
              <p className="mt-2 font-semibold">
                {lang === "ar"
                  ? "سرية تامة وخصوصية"
                  : "Full confidentiality & privacy"}
              </p>
            </li>
            <li className="bg-gray-50 rounded-lg p-6 shadow">
              <span className="text-3xl">🎓</span>
              <p className="mt-2 font-semibold">
                {lang === "ar" ? "خبرة معتمدة" : "Certified expertise"}
              </p>
            </li>
            <li className="bg-gray-50 rounded-lg p-6 shadow">
              <span className="text-3xl">💻</span>
              <p className="mt-2 font-semibold">
                {lang === "ar"
                  ? "جلسات أونلاين مرنة"
                  : "Flexible online sessions"}
              </p>
            </li>
          </ul>
        </section>
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {lang === "ar" ? "كيف تبدأ؟" : "How to Start?"}
          </h3>
          <ol className="list-decimal list-inside max-w-xl mx-auto text-gray-700 space-y-2">
            <li>
              {lang === "ar"
                ? "اختر الخدمة المناسبة لك من القائمة أعلاه."
                : "Choose the right service for you from the list above."}
            </li>
            <li>
              {lang === "ar"
                ? "احجز موعدك بسهولة عبر الموقع."
                : "Book your appointment easily through the website."}
            </li>
            <li>
              {lang === "ar"
                ? "ابدأ رحلتك نحو التغيير مع أخصائي معتمد."
                : "Start your journey towards change with a certified specialist."}
            </li>
          </ol>
        </section>
        <div className="text-center">
          <Link
            href="/book-appointment"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-bold shadow hover:bg-indigo-700 transition"
          >
            {lang === "ar" ? "احجز موعدك الآن" : "Book Your Appointment Now"}
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
