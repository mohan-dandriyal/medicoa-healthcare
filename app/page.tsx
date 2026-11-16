import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CtaSection from "@/components/sections/CtaSection";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProjectSection";
import ServicesSection from "@/components/sections/ServiceSection";
import StatisticsSection from "@/components/sections/StatisticsSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <Header />

      <HeroSection />

      <div className="bg-[#f6fafabf] mt-12">

        <AboutSection />
      </div>

      <div className="mt-12">
        <ServicesSection />
      </div>

      <div className="mt-12">
        <WhyChooseUsSection />
      </div>

      <div className="mt-12">
      <StatisticsSection />
      </div>

      <TestimonialsSection />

      <TeamSection />

      <FAQSection />

      <CtaSection />

      <ProductsSection />

      <ContactSection />

      <Footer />
    </>
  );
}
