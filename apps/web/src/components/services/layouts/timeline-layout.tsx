"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ServiceSections } from "../service-sections";
import { ProsfinSectionWrapper } from "@/components/shared";
import { Separator } from "@/components/ui/separator";

interface TimelineLayoutProps {
  service: Service;
}

/**
 * TimelineLayout - Timeline/roadmap layout
 * 
 * Layout ưu tiên timeline visualization:
 * - Hero với timeline preview
 * - Full timeline visualization
 * - Milestones/steps với dates
 * - Deliverables checklist
 */
export function TimelineLayout({ service }: TimelineLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const stepsSection = service.sections.find((s) => s.type === "steps" || s.type === "bullet-steps");
  const listSection = service.sections.find((s) => s.type === "list");
  const requirementsSection = service.sections.find((s) => s.type === "requirements");
  const otherSections = service.sections.filter(
    (s) =>
      s.type !== "hero" &&
      s.type !== "ctaInline" &&
      s.type !== "steps" &&
      s.type !== "bullet-steps" &&
      s.type !== "list" &&
      s.type !== "requirements"
  );

  return (
    <div className="space-y-12">
      {/* Hero với timeline preview */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Timeline Visualization - Steps */}
      {stepsSection && (
        <ProsfinSectionWrapper padding="lg">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
            
            <div className="space-y-8 relative">
              {stepsSection.steps?.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-2 pt-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  {index < (stepsSection.steps?.length || 0) - 1 && (
                    <Separator className="ml-20 mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Deliverables checklist */}
      {listSection && (
        <ProsfinSectionWrapper background="muted">
          <ServiceSections sections={[listSection]} />
        </ProsfinSectionWrapper>
      )}

      {/* Requirements */}
      {requirementsSection && (
        <ProsfinSectionWrapper>
          <ServiceSections sections={[requirementsSection]} />
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




