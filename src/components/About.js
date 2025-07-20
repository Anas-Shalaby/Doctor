"use client";

import { Award, BookOpen, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  const credentials = [
    {
      icon: Award,
      title: t("about.credentials.0.title"),
      description: t("about.credentials.0.description"),
    },
    {
      icon: BookOpen,
      title: t("about.credentials.1.title"),
      description: t("about.credentials.1.description"),
    },
    {
      icon: Users,
      title: t("about.credentials.2.title"),
      description: t("about.credentials.2.description"),
    },
    {
      icon: Clock,
      title: t("about.credentials.3.title"),
      description: t("about.credentials.3.description"),
    },
  ];

  const specializations = [
    t("about.specializations.0"),
    t("about.specializations.1"),
    t("about.specializations.2"),
    t("about.specializations.3"),
    t("about.specializations.4"),
    t("about.specializations.5"),
    t("about.specializations.6"),
    t("about.specializations.7"),
  ];

  return (
    <section className="bg-white section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              {t("about.title")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t("about.p2")}
            </p>

            {/* Specializations */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t("about.specializationsTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary">{t("about.cta")}</button>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Professional Photo */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <img
                    src="images/WhatsApp Image 2025-04-01 at 19.08.25.jpeg"
                    alt="Dr / Amany Youssef image"
                  />
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 border border-gray-100 text-center"
                >
                  <credential.icon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <h4 className="font-medium text-xs mb-1 text-gray-900">
                    {credential.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {credential.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
