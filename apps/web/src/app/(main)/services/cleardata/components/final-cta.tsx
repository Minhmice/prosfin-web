"use client";

import * as React from "react";
import { Shield } from "lucide-react";
import { ProsfinSectionWrapper, ProsfinSectionHeading, ProsfinPrimaryButton, ProsfinSecondaryButton, ProsfinBadge } from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { ClearDataForm } from "./cleardata-form";
import type { FinalCtaContent } from "@/data/services/cleardata";

export interface FinalCtaSectionProps {
  content: FinalCtaContent;
  onBookCallClick?: () => void;
}

/**
 * FinalCtaSection - Final CTA section với form
 */
export function FinalCtaSection({
  content,
  onBookCallClick,
}: FinalCtaSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  const handleBookCallClick = () => {
    trackEvent(AnalyticsEvent.BOOK_CALL_CLICK);
    if (onBookCallClick) onBookCallClick();
  };

  return (
    <ProsfinSectionWrapper background="default" padding="xl">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <ProsfinSectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          titleSize="xl"
          align="center"
        />

        {/* Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-10">
          {content.bullets.map((bullet, index) => (
            <ProsfinBadge key={index} variant="default">
              {bullet}
            </ProsfinBadge>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {content.trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted"
            >
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{badge}</span>
            </div>
          ))}
        </div>

        {/* Form Card - Centered */}
        <div className="max-w-md mx-auto">
          <ClearDataForm
            title={content.formTitle}
            primaryCtaLabel={content.primaryCtaLabel}
            secondaryCtaLabel={content.secondaryCtaLabel}
            privacyNote={content.privacyNote}
            onBookCallClick={handleBookCallClick}
          />
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

