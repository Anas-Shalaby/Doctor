"use client";

import Link from "next/link";
import { Calendar, MessageCircle, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations();
  const features = [
    {
      icon: Calendar,
      title: t("hero.feature1.title"),
      description: t("hero.feature1.description"),
    },
    {
      icon: MessageCircle,
      title: t("hero.feature2.title"),
      description: t("hero.feature2.description"),
    },
    {
      icon: Shield,
      title: t("hero.feature3.title"),
      description: t("hero.feature3.description"),
    },
    {
      icon: Clock,
      title: t("hero.feature4.title"),
      description: t("hero.feature4.description"),
    },
  ];

  return (
    <section className="bg-white ">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/book-appointment" className="btn btn-primary">
                {t("hero.cta1")}
              </Link>
              <Link href="/services" className="btn btn-secondary">
                {t("hero.cta2")}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-500">
                  {t("hero.stats.patients")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  10+
                </div>
                <div className="text-sm text-gray-500">
                  {t("hero.stats.years")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  98%
                </div>
                <div className="text-sm text-gray-500">
                  {t("hero.stats.success")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Image
                    src="/images/WhatsApp Image 2025-07-20 at 19.15.58.jpeg"
                    alt="Amany Youssef"
                    width={500}
                    height={400}
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t("hero.doctorName")}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t("hero.doctorTitle")}
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {t("hero.doctorDegree")}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {t("hero.doctorLicensed")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <feature.icon className="w-6 h-6 mx-auto mb-3 text-gray-600" />
              <h3 className="font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
