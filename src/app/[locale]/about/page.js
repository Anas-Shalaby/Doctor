import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("about");
  const lang =
    typeof window !== "undefined" ? document.documentElement.lang : "ar";

  return (
    <>
      <Header />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: نبذة وصورة */}
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-6 text-center lg:text-right">
              {t("title")}
            </h1>
            <div className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <p className="mb-4">{t("p1")}</p>
              <p className="mb-4">{t("p2")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/book-appointment" className="btn btn-primary">
                {t("book")}
              </Link>
            </div>
          </div>
          {/* Right: صورة شخصية */}
          <div className="flex justify-center">
            <div className="bg-gray-50 rounded-2xl p-8 w-full max-w-xs">
              <div className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Image
                  src="/images/WhatsApp Image 2025-07-20 at 19.15.58.jpeg"
                  alt="Amany Youssef"
                  width={300}
                  height={400}
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t("name")}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{t("desc")}</p>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {t("specialization")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* التخصصات */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            {t("specializationsTitle")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(t.raw("specializations") || []).map((item, idx) => (
              <li
                key={idx}
                className="bg-white rounded-xl p-6 shadow text-center text-gray-700 font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* الاعتمادات والخبرات */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            {t("credentialsTitle")}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(t.raw("credentials") || []).map((cred, idx) => (
              <li
                key={idx}
                className="bg-gray-50 rounded-xl p-6 shadow text-center"
              >
                <div className="font-semibold mb-1 text-gray-900">
                  {cred.title}
                </div>
                <div className="text-gray-600">{cred.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
