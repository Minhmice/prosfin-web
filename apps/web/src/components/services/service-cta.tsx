"use client";

import type { CtaConfig } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";

interface ServiceCtaProps {
  cta?: CtaConfig;
  title?: string;
  subtitle?: string;
}

/**
 * ServiceCta - CTA section for service pages
 * 
 * Hiển thị CTA section nổi bật trỏ về contact/leads.
 * Lấy CTA từ service.cta nếu có, fallback về default.
 */
export function ServiceCta({
  cta,
  title = "Sẵn sàng bắt đầu?",
  subtitle = "Đăng ký tư vấn miễn phí với đội ngũ chuyên gia ProsFIN",
}: ServiceCtaProps) {
  const ctaLabel = cta?.label || "Đăng ký tư vấn";
  const ctaHref = cta?.href || "/contact";

  return (
    <div className="space-y-6 rounded-lg border-2 border-primary/20 bg-primary/5 p-8 text-center">
      <ProsfinSectionHeading
        title={title}
        subtitle={subtitle}
        align="center"
        titleSize="lg"
      />
      <ProsfinPrimaryButton href={ctaHref} size="lg">
        {ctaLabel}
      </ProsfinPrimaryButton>
    </div>
  );
}

