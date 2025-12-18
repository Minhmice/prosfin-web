"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface JourneyRoadmapLayoutProps {
  service: Service;
}

/**
 * Journey/Roadmap Layout - Variant B
 * 
 * Hero: Statement + timeline dọc (vertical timeline)
 * Main: Các mốc (milestones) + deliverables
 */
export function JourneyRoadmapLayout({ service }: JourneyRoadmapLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const stepsSection = service.sections.find((s) => s.type === "steps");
  const contentSections = service.sections.filter(
    (s) => s.type !== "hero" && s.type !== "ctaInline" && s.type !== "steps"
  );

  return (
    <div className="space-y-12">
      {/* Hero Statement */}
      <div className="space-y-6">
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}
        <ProsfinSectionHeading
          title={heroSection?.title || service.title}
          subtitle={heroSection?.subtitle}
          align="center"
          titleSize="xl"
        />
        {heroSection?.content && (
          <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
            {heroSection.content}
          </p>
        )}
      </div>

      {/* Vertical Timeline */}
      {stepsSection && stepsSection.steps && (
        <div className="space-y-8">
          <ProsfinSectionHeading
            title={stepsSection.title || "Hành trình triển khai"}
            subtitle={stepsSection.subtitle}
            align="left"
            titleSize="lg"
          />
          <div className="relative space-y-8 pl-8">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
            
            {stepsSection.steps.map((step, index) => (
              <div key={index} className="relative space-y-2">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {index < stepsSection.steps!.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deliverables */}
      <ServiceSections sections={contentSections} />
    </div>
  );
}

