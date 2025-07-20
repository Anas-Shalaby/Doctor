"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations();
  const testimonials = [
    {
      name: t("testimonials.items.0.name"),
      rating: 5,
      text: t("testimonials.items.0.text"),
      location: t("testimonials.items.0.location"),
    },
    {
      name: t("testimonials.items.1.name"),
      rating: 5,
      text: t("testimonials.items.1.text"),
      location: t("testimonials.items.1.location"),
    },
    {
      name: t("testimonials.items.2.name"),
      rating: 5,
      text: t("testimonials.items.2.text"),
      location: t("testimonials.items.2.location"),
    },
    {
      name: t("testimonials.items.3.name"),
      rating: 5,
      text: t("testimonials.items.3.text"),
      location: t("testimonials.items.3.location"),
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
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  98%
                </div>
                <div className="text-sm text-gray-600">
                  {t("testimonials.stats.satisfaction")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">
                  {t("testimonials.stats.lives")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">
                  10+
                </div>
                <div className="text-sm text-gray-600">
                  {t("testimonials.stats.years")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
