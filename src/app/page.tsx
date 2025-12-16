"use client";

import { HeroSection } from "@/components/landing/hero/hero-section";
import { ProblemsSection } from "@/components/landing/problems/problems-section";
import { ServicesSection } from "@/components/landing/services/services-section";
import { ProcessSection } from "@/components/landing/process/process-section";
import { AboutSection } from "@/components/landing/about/about-section";
import { FaqSection } from "@/components/landing/faq/faq-section";
import { FinalCtaSection } from "@/components/landing/contact/final-cta-section";
import { useHeroModal } from "@/components/landing/hero/hero-modal-context";

export default function Home() {
  const { openModal } = useHeroModal();

  const handleServiceCtaClick = (serviceId: string, ctaType?: string) => {
    if (ctaType === "modal") {
      openModal();
    }
  };

  const handleContactSubmit = (data: unknown) => {
    // TODO: Connect to API endpoint /api/leads or Supabase
    console.log("Contact form submitted:", data);
    alert("Thông tin đã được ghi nhận (demo). Chúng tôi sẽ liên hệ với bạn sớm nhất!");
  };

  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <ServicesSection onServiceCtaClick={handleServiceCtaClick} />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <FinalCtaSection onSubmitLead={handleContactSubmit} />
    </>
  );
}
