"use client";

import type { CtaConfig } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { ArrowRight } from "lucide-react";

interface BigLeadCtaProps {
  cta?: CtaConfig;
  title?: string;
  subtitle?: string;
  showSecondaryButton?: boolean;
}

/**
 * BigLeadCTA - Large CTA component for service pages
 * 
 * Component riêng cho CTA lớn ở cuối service pages:
 * - Large heading và subheading
 * - Primary button: "Đăng ký tư vấn" → `/contact` hoặc lead form
 * - Secondary button (optional): "Xem quy trình" → `/process`
 * - Design nổi bật với border/background highlight
 */
export function BigLeadCta({
  cta,
  title = "Sẵn sàng bắt đầu?",
  subtitle = "Đăng ký tư vấn miễn phí với đội ngũ chuyên gia ProsFIN. Chúng tôi sẽ liên hệ với bạn trong 24 giờ.",
  showSecondaryButton = true,
}: BigLeadCtaProps) {
  const ctaLabel = cta?.label || "Đăng ký tư vấn";
  const ctaHref = cta?.href || "/contact";

  return (
    <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12 text-center shadow-lg">
      <div className="mx-auto max-w-3xl space-y-8">
        <ProsfinSectionHeading
          title={title}
          subtitle={subtitle}
          align="center"
          titleSize="xl"
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ProsfinPrimaryButton href={ctaHref} size="lg" className="gap-2">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </ProsfinPrimaryButton>
          
          {showSecondaryButton && (
            <ProsfinSecondaryButton href="/process" size="lg" variant="outline">
              Xem quy trình làm việc
            </ProsfinSecondaryButton>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Hoặc gọi hotline: <a href="tel:+84123456789" className="text-primary hover:underline font-medium">+84 123 456 789</a>
        </p>
      </div>
    </div>
  );
}


