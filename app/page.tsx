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
import { Suspense } from "react";

 function HomePageSections() {
  return (
    <>
      <Header />

      <main className="flow-root shrink-0">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <StatisticsSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <CtaSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}


export default function Home() {
  return(
    <Suspense>
      <HomePageSections  />
    </Suspense>
  )
}