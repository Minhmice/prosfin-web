"use client";

import * as React from "react";
import { HeroSection } from "@/components/app/hero-section";
import { ProblemsSection } from "@/components/landing/problems/problems-section";
import { ServicesSection } from "@/components/landing/services/services-section";
import { ProcessSection } from "@/components/landing/process/process-section";
import { HeroLeadFormModal } from "@/components/app/hero-lead-form-modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleServiceCtaClick = (serviceId: string, ctaType?: string) => {
    if (ctaType === "modal") {
      setIsModalOpen(true);
    }
  };

  return (
    <main>
      <HeroSection />
      <ProblemsSection />
      <ServicesSection onServiceCtaClick={handleServiceCtaClick} />
      <ProcessSection />
      <HeroLeadFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}
