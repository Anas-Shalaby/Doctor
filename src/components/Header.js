"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState as useDropdownState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  // Dropdown state
  const [langOpen, setLangOpen] = useDropdownState(false);
  // Detect current locale from pathname (default to 'en')
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const realPathAfterLocal = pathname.replace(`/${currentLocale}`, "");
  const langLabel = currentLocale === "ar" ? "العربية" : "English";
  const navigation = [
    { name: t("services"), href: "/services" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AY</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {t("logo")}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* الروابط الرئيسية */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors border-b-2 border-transparent hover:border-gray-300 pb-1"
              >
                {item.name}
              </Link>
            ))}
            {/* زر الحجز */}
            <div className="pl-4 flex items-center space-x-2 relative">
              <Link href="/book-appointment" className="btn btn-primary">
                {t("book")}
              </Link>
              {/* زر تغيير اللغة بشكل دروب داون */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen((open) => !open)}
                  className="flex items-center px-3 py-1 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="mr-2">{langLabel}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      langOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                    <Link
                      href={
                        realPathAfterLocal === "" ? "/" : realPathAfterLocal
                      }
                      locale="ar"
                      className={`block w-full text-right px-4 py-2 text-sm rounded-t-lg hover:bg-blue-50 ${
                        currentLocale === "ar"
                          ? "bg-blue-100 text-gray-600 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      العربية
                    </Link>
                    <Link
                      href={
                        realPathAfterLocal === "" ? "/" : realPathAfterLocal
                      }
                      locale="en"
                      className={`block w-full mt-2 text-right px-4 py-2 text-sm rounded-b-lg hover:bg-blue-50 ${
                        currentLocale === "en"
                          ? "bg-blue-100 text-gray-600 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      English
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/book-appointment"
                className="btn btn-primary w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("book")}
              </Link>
              {/* زر تغيير اللغة في الموبايل */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen((open) => !open)}
                  className="flex items-center px-3 py-1 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="mr-2">{langLabel}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      langOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {langOpen && (
                  <div
                    className={`absolute ${
                      currentLocale === "ar" ? "right" : "left"
                    }-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in`}
                  >
                    <Link
                      href={
                        realPathAfterLocal === "" ? "/" : realPathAfterLocal
                      }
                      locale="ar"
                      className={`block w-full text-right px-4 py-2 text-sm rounded-t-lg hover:bg-blue-50 ${
                        currentLocale === "ar"
                          ? "bg-blue-100 text-gray-600 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      العربية
                    </Link>
                    <Link
                      href={
                        realPathAfterLocal === "" ? "/" : realPathAfterLocal
                      }
                      locale="en"
                      className={`block w-full text-right px-4 py-2 text-sm rounded-b-lg hover:bg-blue-50 ${
                        currentLocale === "en"
                          ? "bg-blue-100 text-gray-600 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      English
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
