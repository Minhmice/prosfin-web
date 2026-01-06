"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionWrapper } from "@/components/shared";

interface SplitPanelLayoutProps {
  service: Service;
}

/**
 * SplitPanelLayout - Problems vs Solutions split view
 * 
 * Layout ưu tiên problem-solution sections:
 * - Hero balanced
 * - Problems vs Solutions split view (2 cột)
 * - Use existing problem-solution section type
 * - Outcomes callout
 */
export function SplitPanelLayout({ service }: SplitPanelLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const problemSolutionSection = service.sections.find((s) => s.type === "problem-solution");
  const outcomesSection = service.sections.find((s) => s.type === "highlights");
  const quoteSection = service.sections.find((s) => s.type === "quote");
  const otherSections = service.sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ctaInline" &&
      s.type !== "problem-solution" &&
      s.type !== "highlights" &&
      s.type !== "quote"
  );

  return (
    <div className="space-y-12">
      {/* Hero balanced */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Problems vs Solutions - Main focus */}
      {problemSolutionSection && (
        <ProsfinSectionWrapper padding="lg">
          <ServiceSections sections={[problemSolutionSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Outcomes callout */}
      {outcomesSection && (
        <ProsfinSectionWrapper background="primary" padding="lg">
          <ServiceSections sections={[outcomesSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Quote */}
      {quoteSection && (
        <ProsfinSectionWrapper>
          <ServiceSections sections={[quoteSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Other sections */}
      {otherSections.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <ServiceSections sections={otherSections} />
        </ProsfinSectionWrapper>
      )}
    </div>
  );
}




