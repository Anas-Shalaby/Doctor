import Link from "next/link";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const quickLinks = [
    { name: t("footer.quickLinks.0"), href: "/" },
    { name: t("footer.quickLinks.1"), href: "/services" },
    { name: t("footer.quickLinks.2"), href: "/about" },
    { name: t("footer.quickLinks.3"), href: "/contact" },
    { name: t("footer.quickLinks.4"), href: "/book-appointment" },
  ];

  const services = [
    t("footer.services.0"),
    t("footer.services.1"),
    t("footer.services.2"),
    t("footer.services.3"),
    t("footer.services.4"),
    t("footer.services.5"),
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-semibold text-sm">AY</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t("footer.doctorName")}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t("footer.doctorTitle")}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-6">{t("footer.quickLinksTitle")}</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium mb-6">{t("footer.servicesTitle")}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-6">{t("footer.contactTitle")}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {t("footer.email")}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  {t("footer.address")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">
                  {t("footer.hours")}
                </span>
              </div>
            </div>

            <Link
              href="/book-appointment"
              className="inline-block mt-6 btn bg-white text-gray-900 hover:bg-gray-100"
            >
              {t("footer.bookAppointment")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/hipaa"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("footer.hipaa")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
