"use client";

import * as React from "react";
import { HeroSection } from "@/components/app/hero-section";
import { ProblemsSection } from "@/components/landing/problems/problems-section";
import { ServicesSection } from "@/components/landing/services/services-section";
import { ProcessSection } from "@/components/landing/process/process-section";
import { AboutSection } from "@/components/landing/about/about-section";
import { FaqSection } from "@/components/landing/faq/faq-section";
import { FinalCtaSection } from "@/components/landing/contact/final-cta-section";
import { HeroLeadFormModal } from "@/components/app/hero-lead-form-modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleServiceCtaClick = (serviceId: string, ctaType?: string) => {
    if (ctaType === "modal") {
      setIsModalOpen(true);
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
      <HeroLeadFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
