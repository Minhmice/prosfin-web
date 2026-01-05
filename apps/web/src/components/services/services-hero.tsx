"use client";

import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";

interface ServicesHeroProps {
  onOpenWizard: () => void;
}

/**
 * ServicesHero - Hero section for /services page
 * 
 * Features:
 * - Title: "Chọn đúng dịch vụ ProsFIN trong 60 giây"
 * - Subtitle with pain + outcome
 * - CTA Primary: Open wizard
 * - CTA Secondary: Scroll to results
 */
export function ServicesHero({ onOpenWizard }: ServicesHeroProps) {
  const scrollToResults = () => {
    const resultsElement = document.getElementById("services-results");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title="Chọn đúng dịch vụ ProsFIN trong 60 giây"
        subtitle="Bạn đang đứng trước nhiều lựa chọn dịch vụ? Hãy để chúng tôi giúp bạn tìm đúng giải pháp phù hợp với nhu cầu và mục tiêu của doanh nghiệp."
        align="center"
        titleSize="xl"
      />
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ProsfinPrimaryButton onClick={onOpenWizard} size="lg">
          Trả lời 4 câu để nhận gợi ý
        </ProsfinPrimaryButton>
        <ProsfinSecondaryButton onClick={scrollToResults} size="lg">
          Xem tất cả dịch vụ
        </ProsfinSecondaryButton>
      </div>
    </div>
  );
}

