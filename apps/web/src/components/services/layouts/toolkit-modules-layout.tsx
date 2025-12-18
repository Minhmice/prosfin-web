"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "../service-hero";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared";

interface ToolkitModulesLayoutProps {
  service: Service;
}

/**
 * Toolkit/Modules Layout - Variant C
 * 
 * Hero: Module grid (cards)
 * Main: Accordion theo module
 */
export function ToolkitModulesLayout({ service }: ToolkitModulesLayoutProps) {
  const heroSection = service.sections.find((s) => s.type === "hero");
  const modulesSection = service.sections.find((s) => s.type === "highlights");
  const contentSections = service.sections.filter(
    (s) => s.type !== "hero" && s.type !== "ctaInline" && s.type !== "highlights"
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <ServiceHero service={service} layoutVariant="advisor" />

      {/* Module Grid */}
      {modulesSection && modulesSection.highlights && (
        <div className="space-y-6">
          <ProsfinSectionHeading
            title={modulesSection.title || "Các module công cụ"}
            subtitle={modulesSection.subtitle}
            align="left"
            titleSize="lg"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modulesSection.highlights.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{module.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Accordion by Module */}
      {contentSections.length > 0 && (
        <div className="space-y-6">
          <ProsfinSectionHeading
            title="Chi tiết các module"
            align="left"
            titleSize="lg"
          />
          <Accordion type="single" collapsible className="w-full">
            {contentSections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {section.title || `Module ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {section.content && (
                      <p className="text-muted-foreground">{section.content}</p>
                    )}
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="mt-1.5 text-primary">•</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

