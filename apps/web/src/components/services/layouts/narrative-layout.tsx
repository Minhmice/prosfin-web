"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionWrapper } from "@/components/shared";

interface NarrativeLayoutProps {
  service: Service;
}

/**
 * NarrativeLayout - Story/longform layout
 * 
 * Layout ưu tiên narrative flow:
 * - Hero với large typography
 * - Narrative sections (intro, quote, story flow)
 * - Proof/numbers section nổi bật
 * - Related content ở cuối
 */
export function NarrativeLayout({ service }: NarrativeLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const introSection = service.sections.find((s) => s.type === "intro");
  const quoteSection = service.sections.find((s) => s.type === "quote");
  const statsSection = service.sections.find((s) => s.type === "stats");
  const narrativeSections = service.sections.filter(
    (s) => s.type === "narrative" || s.type === "intro"
  );
  const otherSections = service.sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ctaInline" &&
      s.type !== "intro" &&
      s.type !== "quote" &&
      s.type !== "stats" &&
      s.type !== "narrative"
  );

  return (
    <div className="space-y-12">
      {/* Hero với large typography */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Intro section */}
      {introSection && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <div className="max-w-4xl mx-auto">
            <ServiceSections sections={[introSection]} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Narrative flow */}
      {narrativeSections.length > 0 && (
        <ProsfinSectionWrapper>
          <div className="max-w-3xl mx-auto space-y-8">
            <ServiceSections sections={narrativeSections} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Quote nổi bật */}
      {quoteSection && (
        <ProsfinSectionWrapper background="primary" padding="lg">
          <div className="max-w-3xl mx-auto">
            <ServiceSections sections={[quoteSection]} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Proof/Numbers section nổi bật */}
      {statsSection && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <ServiceSections sections={[statsSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Other sections */}
      {otherSections.length > 0 && (
        <ProsfinSectionWrapper>
          <ServiceSections sections={otherSections} />
        </ProsfinSectionWrapper>
      )}
    </div>
  );
}




