"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
  ProsfinSecondaryButton,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { trackEvent } from "@/lib/analytics";
import type { PricingContent } from "@/data/services/cleardata";

export interface PricingSectionProps {
  content: PricingContent;
  onBookCallClick?: () => void;
}

/**
 * PricingSection - Pricing and fit section
 */
export function PricingSection({
  content,
  onBookCallClick,
}: PricingSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  const handleFormClick = () => {
    trackEvent("lead_checklist_submit");
    const heroForm = document.querySelector("#hero-form");
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookCallClick = () => {
    trackEvent("book_call_click");
    if (onBookCallClick) onBookCallClick();
  };

  return (
    <ProsfinSectionWrapper background="default" padding="xl">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`transition-opacity duration-700 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <ProsfinSectionHeading
          title={content.title}
          subtitle={content.subheadline}
          titleSize="xl"
        />

        <div className="grid grid-cols-12 gap-8 mt-12">
          {/* Left - Pricing Card (5 cols) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-foreground text-background border-2 border-foreground rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl mb-6 font-semibold">Giá dịch vụ</h3>

              <div className="mb-6">
                <div className="text-5xl mb-2 font-bold">
                  {content.priceAmount}{" "}
                  <span className="text-2xl">{content.pricePeriod}</span>
                </div>
                <p className="text-sm text-background/80">
                  {content.priceNote}
                </p>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {content.includedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-background mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <ProsfinPrimaryButton
                  onClick={handleFormClick}
                  className="w-full bg-background text-foreground hover:bg-background/90"
                >
                  {content.primaryCtaLabel}
                </ProsfinPrimaryButton>
                <ProsfinSecondaryButton
                  onClick={handleBookCallClick}
                  className="w-full border-2 border-background text-background hover:bg-background/10"
                >
                  {content.secondaryCtaLabel}
                </ProsfinSecondaryButton>
              </div>
            </div>
          </div>

          {/* Right - Fit / Not Fit (7 cols) */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Fit Card */}
            <div className="bg-muted border border-border rounded-2xl p-7">
              <h3 className="text-xl mb-5 font-semibold">{content.fitTitle}</h3>
              <ul className="space-y-3">
                {content.fitItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Fit Card */}
            <div className="bg-muted border border-border rounded-2xl p-7">
              <h3 className="text-xl mb-5 font-semibold">
                {content.notFitTitle}
              </h3>
              <ul className="space-y-3">
                {content.notFitItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">{content.note}</p>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}
