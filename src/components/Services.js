"use client";

import {
  Brain,
  Heart,
  Users,
  MessageSquare,
  Calendar,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ICONS = {
  cbt: Brain,
  stress: Heart,
  group: Users,
  couples: MessageSquare,
  online: Calendar,
  crisis: Shield,
  consultation: Brain,
};

export default function Services() {
  const t = useTranslations();
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
    <section className="bg-gray-50 section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            {lang === "ar" ? "جاري تحميل الخدمات..." : "Loading services..."}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = ICONS[service.icon] || Brain;
              return (
                <Link
                  key={service.id}
                  href={`/book-appointment?service=${service.id}`}
                  className="block"
                  scroll={false}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card-hover cursor-pointer hover:shadow-lg transition"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {lang === "ar" ? service.title_ar : service.title_en}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {lang === "ar"
                        ? service.description_ar
                        : service.description_en}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-4">
                      <div className="text-xs text-gray-500">
                        {service.duration || ""}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {service.price
                          ? `${service.price} ${lang === "ar" ? "جنيه" : "EGP"}`
                          : ""}
                      </div>
                    </div>
                    <div className="btn btn-primary w-full text-center pointer-events-none select-none">
                      {t("services.bookSession")}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t("services.ctaTitle")}
            </h3>
            <p className="text-gray-600 mb-6">{t("services.ctaDesc")}</p>
            <button className="btn btn-primary">{t("services.ctaBtn")}</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
