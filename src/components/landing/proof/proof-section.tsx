/**
 * ProofSection - Social proof (case studies/testimonials)
 * 
 * 2-3 highlight cards (ngành, kết quả, mô tả).
 * CTA → /case-studies
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader, AppCard, AppCardHeader, AppCardTitle, AppCardContent, AppCardDescription, AppBadge, AppLink } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";

interface ProofSectionProps {
  content?: LandingContent["proof"];
}

/**
 * ProofSection - Social proof component
 * 
 * @example
 * ```tsx
 * <ProofSection content={landingContent.proof} />
 * ```
 */
export function ProofSection({ content }: ProofSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  return (
    <AppSection id="proof" padding="lg" background="default">
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
            {content.items.slice(0, 3).map((item) => (
              <AppCard key={item.id} variant="elevated" className="flex flex-col">
                <AppCardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <AppBadge badgeVariant="info">{item.industry}</AppBadge>
                  </div>
                  <AppCardTitle className="mt-4 text-xl">{item.result}</AppCardTitle>
                </AppCardHeader>
                <AppCardContent className="flex flex-1 flex-col gap-4">
                  <AppCardDescription>{item.description}</AppCardDescription>
                  {item.link && (
                    <AppLink href={item.link} variant="primary" className="mt-auto">
                      Xem chi tiết →
                    </AppLink>
                  )}
                </AppCardContent>
              </AppCard>
            ))}
          </div>

          {content.cta && (
            <div className="flex justify-center">
              <AppLink href={content.cta.href || "/case-studies"} variant="primary">
                {content.cta.label || "Xem thêm câu chuyện khách hàng"} →
              </AppLink>
            </div>
          )}
        </div>
      </AppContainer>
    </AppSection>
  );
}

