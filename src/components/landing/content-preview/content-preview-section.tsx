/**
 * ContentPreviewSection - Content preview (kéo traffic)
 * 
 * Option A: Tabs (Insights/Resources/Knowledge)
 * Option B: 3 columns (desktop), 1 column (mobile)
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader, AppCard, AppCardHeader, AppCardTitle, AppCardContent, AppCardDescription, AppBadge, AppLink } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";

interface ContentPreviewSectionProps {
  content?: LandingContent["contentPreview"];
}

/**
 * ContentPreviewSection - Content preview component
 * 
 * @example
 * ```tsx
 * <ContentPreviewSection content={landingContent.contentPreview} />
 * ```
 */
export function ContentPreviewSection({ content }: ContentPreviewSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  return (
    <AppSection id="content" padding="lg" background="muted">
      <AppContainer>
        <div className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            align="center"
            cta={content.cta}
          />

          {/* Grid layout */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.slice(0, 3).map((item) => (
              <AppCard key={item.id} variant="elevated" className="flex flex-col">
                <AppCardHeader>
                  <AppBadge badgeVariant="info">{item.category}</AppBadge>
                  <AppCardTitle className="mt-2 text-lg">{item.title}</AppCardTitle>
                </AppCardHeader>
                <AppCardContent className="flex flex-1 flex-col gap-4">
                  <AppCardDescription>{item.summary}</AppCardDescription>
                  <AppLink href={item.link} variant="primary" className="mt-auto">
                    Đọc thêm →
                  </AppLink>
                </AppCardContent>
              </AppCard>
            ))}
          </div>

          {content.cta && (
            <div className="flex justify-center">
              <AppLink href={content.cta.href || "/resources"} variant="primary">
                {content.cta.label || "Xem thêm tài nguyên"} →
              </AppLink>
            </div>
          )}
        </div>
      </AppContainer>
    </AppSection>
  );
}

