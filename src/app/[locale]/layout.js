import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ChatBot from "@/components/ChatBot";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. Amany Youssef - Licensed Clinical Psychologist",
  description:
    "Professional psychological services including therapy, counseling, and mental health support. Book your consultation today.",
  keywords:
    "psychology, therapy, counseling, mental health, CBT, stress management, anxiety, depression",
  author: "Dr. Amany Youssef",
  // viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({ children, params }) {
  // استخدم اللغة الافتراضية (يمكن تغييرها لاحقًا حسب الحاجة)
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={locale === "ar" ? "font-cairo" : inter.className}>
        <Toaster position="top-center" />
        <NextIntlClientProvider>
          {children}
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
