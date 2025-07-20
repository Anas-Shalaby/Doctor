"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();
  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.info.0.title"),
      info: t("contact.info.0.info"),
      subtext: t("contact.info.0.subtext"),
    },
    {
      icon: Mail,
      title: t("contact.info.1.title"),
      info: t("contact.info.1.info"),
      subtext: t("contact.info.1.subtext"),
    },
    {
      icon: MapPin,
      title: t("contact.info.2.title"),
      info: t("contact.info.2.info"),
      subtext: t("contact.info.2.subtext"),
    },
    {
      icon: Clock,
      title: t("contact.info.3.title"),
      info: t("contact.info.3.info"),
      subtext: t("contact.info.3.subtext"),
    },
  ];

  return (
    <section className="bg-white section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              {t("contact.infoTitle")}
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-700" dir="ltr">
                      {item.info}
                    </p>
                    <p className="text-sm text-gray-500">{item.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency */}
            <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-xl">
              <h4 className="font-medium text-red-900 mb-2">
                {t("contact.crisisTitle")}
              </h4>
              <p className="text-red-700 mb-3 text-sm">
                {t("contact.crisisDesc")}
              </p>
              <div className="space-y-1">
                <p className="font-medium text-red-900 text-sm">
                  {t("contact.crisis911")}
                </p>
                <p className="font-medium text-red-900 text-sm">
                  {t("contact.crisis988")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {t("contact.formTitle")}
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.firstName")}
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder={t("contact.form.firstNamePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.lastName")}
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder={t("contact.form.lastNamePlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  className="input"
                  placeholder={t("contact.form.phonePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.help")}
                </label>
                <select className="input">
                  <option>{t("contact.form.options.0")}</option>
                  <option>{t("contact.form.options.1")}</option>
                  <option>{t("contact.form.options.2")}</option>
                  <option>{t("contact.form.options.3")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={4}
                  className="input resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                {t("contact.form.send")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-900 rounded-2xl p-8 text-white text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">
              {t("contact.ctaTitle")}
            </h3>
            <p className="mb-6 text-gray-300 text-sm">{t("contact.ctaDesc")}</p>
            <button className="btn bg-white text-gray-900 hover:bg-gray-100">
              {t("contact.ctaBtn")}
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <Phone className="w-8 h-8 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("contact.quickTitle")}
            </h3>
            <p className="mb-6 text-gray-600 text-sm">
              {t("contact.quickDesc")}
            </p>
            <button className="btn btn-secondary">
              {t("contact.quickBtn")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
