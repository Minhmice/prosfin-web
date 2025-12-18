"use client";

import type { Service, ServiceLayoutVariant } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface ServiceHeroProps {
  service: Service;
  layoutVariant: ServiceLayoutVariant;
}

/**
 * ServiceHero - Hero section for service detail page
 * 
 * Hiển thị hero section với title, subtitle, tags và CTA buttons.
 * Layout có thể thay đổi theo layoutVariant.
 */
export function ServiceHero({ service, layoutVariant }: ServiceHeroProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");

  if (!heroSection) {
    return null;
  }

  const isAdvisor = layoutVariant === "advisor";
  const isCoaching = layoutVariant === "execution-coaching";

  return (
    <div className="space-y-6">
      {service.tags && service.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <AppBadge key={tag} variant="outline">
              {tag}
            </AppBadge>
          ))}
        </div>
      )}

      <ProsfinSectionHeading
        title={heroSection.title || service.title}
        subtitle={heroSection.subtitle}
        align={isAdvisor ? "left" : "center"}
        titleSize="xl"
      />

      {heroSection.content && (
        <p className="text-lg text-muted-foreground">{heroSection.content}</p>
      )}

      {isCoaching && (
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Chương trình coaching được thiết kế theo 4 giai đoạn, đảm bảo triển khai hiệu quả và bền vững.
          </p>
        </div>
      )}

      {heroSection.cta && (
        <div className="flex flex-col gap-4 sm:flex-row">
          <ProsfinPrimaryButton href={heroSection.cta.href} size="lg">
            {heroSection.cta.label}
          </ProsfinPrimaryButton>
          {isAdvisor && (
            <ProsfinSecondaryButton href="/contact" size="lg">
              Trao đổi thêm
            </ProsfinSecondaryButton>
          )}
        </div>
      )}
    </div>
  );
}

