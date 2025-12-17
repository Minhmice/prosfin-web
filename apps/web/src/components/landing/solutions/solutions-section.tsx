/**
 * SolutionsSection - Giải pháp theo pain points
 * 
 * Grid 3-6 cards, mỗi card: icon + title + mô tả + link.
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader, AppCard, AppCardContent, AppLink } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";

interface SolutionsSectionProps {
  content?: LandingContent["solutions"];
}

/**
 * SolutionsSection - Solutions grid component
 * 
 * @example
 * ```tsx
 * <SolutionsSection content={landingContent.solutions} />
 * ```
 */
export function SolutionsSection({ content }: SolutionsSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  return (
    <AppSection id="solutions" padding="lg" background="muted">
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
            {content.items.map((item) => (
              <AppCard key={item.id} variant="elevated" className="flex flex-col">
                <AppCardContent className="flex flex-1 flex-col gap-4">
                  {item.icon && (
                    <div className="text-4xl" role="img" aria-hidden="true">
                      {item.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="flex-1 text-muted-foreground">{item.description}</p>
                  {item.link && (
                    <AppLink href={item.link} variant="primary" className="mt-auto">
                      Xem chi tiết →
                    </AppLink>
                  )}
                </AppCardContent>
              </AppCard>
            ))}
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}

