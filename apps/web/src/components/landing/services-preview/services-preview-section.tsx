/**
 * ServicesPreviewSection - Preview gói dịch vụ
 * 
 * Render 3-4 cards từ services, badge "Phổ biến" cho 1 gói.
 * CTA: "Xem toàn bộ dịch vụ" → /services
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader, AppCard, AppCardHeader, AppCardTitle, AppCardContent, AppCardDescription, AppBadge, AppButton, AppLink } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";
import { useHeroModal } from "@/components/landing/hero/hero-modal-context";
import { cn } from "@/lib/utils";

interface ServicesPreviewSectionProps {
  content?: LandingContent["servicesPreview"];
}

/**
 * ServicesPreviewSection - Services preview grid component
 * 
 * @example
 * ```tsx
 * <ServicesPreviewSection content={landingContent.servicesPreview} />
 * ```
 */
export function ServicesPreviewSection({ content }: ServicesPreviewSectionProps) {
  const { openModal } = useHeroModal();

  if (!content || !content.services || content.services.length === 0) {
    return null;
  }

  const popularServiceId = content.services[0]?.id; // First service as popular

  const handleCtaClick = (service: LandingContent["servicesPreview"]["services"][0]) => {
    if (service.ctaType === "modal") {
      openModal();
    } else if (service.ctaTarget) {
      if (service.ctaTarget.startsWith("#")) {
        const element = document.querySelector(service.ctaTarget);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Use router for navigation instead of direct window.location
        window.location.assign(service.ctaTarget);
      }
    }
  };

  return (
    <AppSection id="services" padding="lg" background="default">
      <AppContainer>
        <div className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            align="center"
            cta={content.cta}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.services.slice(0, 3).map((service) => (
              <AppCard
                key={service.id}
                variant="elevated"
                className={cn(
                  "flex flex-col transition-all hover:shadow-lg",
                  service.id === popularServiceId && "ring-2 ring-primary"
                )}
              >
                <AppCardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <AppCardTitle className="text-xl">{service.title}</AppCardTitle>
                    {service.id === popularServiceId && (
                      <AppBadge badgeVariant="primary">Phổ biến</AppBadge>
                    )}
                  </div>
                  <AppCardDescription className="mt-2">
                    {service.shortDescription}
                  </AppCardDescription>
                </AppCardHeader>
                <AppCardContent className="flex flex-1 flex-col gap-4">
                  {service.pillBenefits && service.pillBenefits.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.pillBenefits.slice(0, 3).map((benefit, idx) => (
                        <AppBadge key={idx} badgeVariant="info" className="text-xs">
                          {benefit}
                        </AppBadge>
                      ))}
                    </div>
                  )}
                  {service.idealClient && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Phù hợp:</span> {service.idealClient}
                    </p>
                  )}
                  {service.ctaLabel && (
                    <AppButton
                      brandVariant="outline"
                      size="sm"
                      onClick={() => handleCtaClick(service)}
                      className="mt-auto w-full"
                    >
                      {service.ctaLabel}
                    </AppButton>
                  )}
                </AppCardContent>
              </AppCard>
            ))}
          </div>

          {content.cta && (
            <div className="flex justify-center">
              <AppLink href={content.cta.href || "/services"} variant="primary">
                {content.cta.label || "Xem toàn bộ dịch vụ"} →
              </AppLink>
            </div>
          )}
        </div>
      </AppContainer>
    </AppSection>
  );
}

