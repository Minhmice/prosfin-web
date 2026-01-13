"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinSectionWrapper } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FrameworkLayoutProps {
  service: Service;
}

/**
 * FrameworkLayout - Framework + steps layout
 * 
 * Layout ưu tiên framework overview và steps:
 * - Hero ngắn gọn
 * - Framework overview
 * - Steps với visual indicators
 * - Capabilities grid
 * - Quick reference
 */
export function FrameworkLayout({ service }: FrameworkLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const stepsSection = service.sections.find((s) => s.type === "steps" || s.type === "bullet-steps");
  const capabilitiesSection = service.sections.find((s) => s.type === "capabilities");
  const highlightsSection = service.sections.find((s) => s.type === "highlights");
  const otherSections = service.sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ctaInline" &&
      s.type !== "steps" &&
      s.type !== "bullet-steps" &&
      s.type !== "capabilities" &&
      s.type !== "highlights"
  );

  return (
    <div className="space-y-12">
      {/* Hero ngắn gọn */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Framework Overview - Highlights */}
      {highlightsSection && highlightsSection.highlights && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <div className="space-y-6">
            <ProsfinSectionHeading
              title={highlightsSection.title || "Framework Overview"}
              subtitle={highlightsSection.subtitle}
              align="center"
              titleSize="lg"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {highlightsSection.highlights.map((highlight, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-base">{highlight.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{highlight.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Steps với visual indicators */}
      {stepsSection && (
        <ProsfinSectionWrapper>
          <ServiceSections sections={[stepsSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Capabilities grid */}
      {capabilitiesSection && (
        <ProsfinSectionWrapper background="muted">
          <ServiceSections sections={[capabilitiesSection]} />
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






