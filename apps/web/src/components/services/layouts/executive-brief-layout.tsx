"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExecutiveBriefLayoutProps {
  service: Service;
}

/**
 * Executive Brief Layout - Variant A
 * 
 * Hero: Title + subtitle + 3 "outcomes" cards
 * Main: Section cards dạng "vấn đề → cách ProsFIN hỗ trợ → kết quả"
 */
export function ExecutiveBriefLayout({ service }: ExecutiveBriefLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const outcomesSection = service.sections.find((s) => s.type === "highlights");
  const contentSections = service.sections.filter(
    (s) => s.type !== "hero" && s.type !== "ctaInline" && s.type !== "highlights"
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Outcomes Cards */}
      {outcomesSection && outcomesSection.highlights && (
        <div className="space-y-6">
          <ProsfinSectionHeading
            title={outcomesSection.title || "Kết quả đạt được"}
            subtitle={outcomesSection.subtitle}
            align="left"
            titleSize="lg"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {outcomesSection.highlights.map((highlight, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
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
      )}

      {/* Main Content: Vấn đề → Cách hỗ trợ → Kết quả */}
      <ServiceSections sections={contentSections} />
    </div>
  );
}

