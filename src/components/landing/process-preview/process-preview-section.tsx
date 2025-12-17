/**
 * ProcessPreviewSection - Preview quy trình 4 bước
 * 
 * 4 steps, mỗi step có deliverables ngắn.
 * CTA → /process
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader, AppCard, AppCardHeader, AppCardTitle, AppCardContent, AppCardDescription, AppLink } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";

interface ProcessPreviewSectionProps {
  content?: LandingContent["processPreview"];
}

/**
 * ProcessPreviewSection - Process preview component
 * 
 * @example
 * ```tsx
 * <ProcessPreviewSection content={landingContent.processPreview} />
 * ```
 */
export function ProcessPreviewSection({ content }: ProcessPreviewSectionProps) {
  if (!content || !content.steps || content.steps.length === 0) {
    return null;
  }

  return (
    <AppSection id="process" padding="lg" background="muted">
      <AppContainer>
        <div className="flex flex-col gap-12">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            align="center"
            cta={content.cta}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step, index) => (
              <AppCard key={step.id} variant="elevated" className="flex flex-col">
                <AppCardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {step.order || index + 1}
                    </div>
                    <AppCardTitle className="text-lg">{step.title}</AppCardTitle>
                  </div>
                </AppCardHeader>
                <AppCardContent className="flex flex-1 flex-col gap-3">
                  <AppCardDescription>{step.description}</AppCardDescription>
                  {step.deliverables && step.deliverables.length > 0 && (
                    <ul className="mt-auto space-y-1 text-sm text-muted-foreground">
                      {step.deliverables.slice(0, 2).map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 text-primary" aria-hidden="true">
                            •
                          </span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AppCardContent>
              </AppCard>
            ))}
          </div>

          {content.cta && (
            <div className="flex justify-center">
              <AppLink href={content.cta.href || "/process"} variant="primary">
                {content.cta.label || "Xem quy trình chi tiết"} →
              </AppLink>
            </div>
          )}
        </div>
      </AppContainer>
    </AppSection>
  );
}

