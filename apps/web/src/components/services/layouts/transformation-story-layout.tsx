"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { Card, CardContent } from "@/components/ui/card";

interface TransformationStoryLayoutProps {
  service: Service;
}

/**
 * Transformation Story Layout - Variant D
 * 
 * Hero: Before/after highlights (stats hoặc highlights)
 * Main: Story blocks + proof points
 */
export function TransformationStoryLayout({ service }: TransformationStoryLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const beforeAfterSection = service.sections.find(
    (s) => s.type === "stats" || s.type === "highlights"
  );
  const storySections = service.sections.filter(
    (s) => s.type === "narrative" || s.type === "quote"
  );
  const contentSections = service.sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ctaInline" &&
      s.type !== "stats" &&
      s.type !== "highlights" &&
      s.type !== "narrative" &&
      s.type !== "quote"
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Before/After Highlights */}
      {beforeAfterSection && (
        <div className="space-y-6">
          <ProsfinSectionHeading
            title={beforeAfterSection.title || "Trước và sau"}
            subtitle={beforeAfterSection.subtitle}
            align="center"
            titleSize="lg"
          />
          {beforeAfterSection.type === "stats" && beforeAfterSection.stats && (
            <div className="grid gap-4 md:grid-cols-2">
              {beforeAfterSection.stats.map((stat, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {beforeAfterSection.type === "highlights" &&
            beforeAfterSection.highlights && (
              <div className="grid gap-4 md:grid-cols-2">
                {beforeAfterSection.highlights.map((highlight, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-muted-foreground">
                        {highlight.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold">{highlight.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
        </div>
      )}

      {/* Story Blocks */}
      {storySections.length > 0 && (
        <div className="space-y-8">
          {storySections.map((section, index) => (
            <div key={index} className="space-y-4">
              {section.type === "narrative" && section.content && (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              )}
              {section.type === "quote" && section.quote && (
                <Card className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="pt-6">
                    <p className="text-lg italic">"{section.quote.text}"</p>
                    {section.quote.author && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        — {section.quote.author}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Proof Points */}
      <ServiceSections sections={contentSections} />
    </div>
  );
}

