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

export default function Services() {
  const t = useTranslations();
  const services = [
    {
      icon: Brain,
      title: t("services.items.0.title"),
      description: t("services.items.0.description"),
      duration: t("services.items.0.duration"),
      price: t("services.items.0.price"),
      id: "Cognitive Behavioral Therapy",
    },
    {
      icon: Heart,
      title: t("services.items.1.title"),
      description: t("services.items.1.description"),
      duration: t("services.items.1.duration"),
      price: t("services.items.1.price"),
      id: "Stress Management",
    },
    {
      icon: Users,
      title: t("services.items.2.title"),
      description: t("services.items.2.description"),
      duration: t("services.items.2.duration"),
      price: t("services.items.2.price"),
      id: "Group Session",
    },
    {
      icon: MessageSquare,
      title: t("services.items.3.title"),
      description: t("services.items.3.description"),
      duration: t("services.items.3.duration"),
      price: t("services.items.3.price"),
      id: "Couples Therapy",
    },
    {
      icon: Calendar,
      title: t("services.items.4.title"),
      description: t("services.items.4.description"),
      duration: t("services.items.4.duration"),
      price: t("services.items.4.price"),
      id: "Online Consultation",
    },
    {
      icon: Shield,
      title: t("services.items.5.title"),
      description: t("services.items.5.description"),
      duration: t("services.items.5.duration"),
      price: t("services.items.5.price"),
      id: "Crisis Support",
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
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
                    <service.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-4">
                  <div className="text-xs text-gray-500">
                    {service.duration}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {service.price}
                  </div>
                </div>
                <div className="btn btn-primary w-full text-center pointer-events-none select-none">
                  {t("services.bookSession")}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

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
