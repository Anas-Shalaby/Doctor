import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <div className="mb-8">
        <Header />
      </div>
      <div className="mb-8">
        <Hero />
      </div>
      <div className="mb-8">
        <Services />
      </div>
      <div className="mb-8">
        <About />
      </div>
      <div className="mb-8">
        <Testimonials />
      </div>
      <div className="mb-8">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
