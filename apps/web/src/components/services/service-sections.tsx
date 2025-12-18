"use client";

import type { ServiceSection } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ServiceSectionsProps {
  sections: ServiceSection[];
}

/**
 * ServiceSections - Render service sections based on type
 * 
 * Map và render các sections của service theo type.
 */
export function ServiceSections({ sections }: ServiceSectionsProps) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        if (section.type === "hero" || section.type === "ctaInline") {
          return null; // Hero và CTA được render riêng
        }

        return (
          <div key={index} className="space-y-4">
            {section.title && (
              <ProsfinSectionHeading
                title={section.title}
                subtitle={section.subtitle}
                align="left"
                titleSize="lg"
              />
            )}

            {section.type === "narrative" && section.content && (
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            )}

            {section.type === "list" && section.items && (
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="mt-1.5 text-primary">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.type === "highlights" && section.highlights && (
              <div className="grid gap-4 md:grid-cols-3">
                {section.highlights.map((highlight, highlightIndex) => (
                  <Card key={highlightIndex}>
                    <CardHeader>
                      <CardTitle className="text-sm">{highlight.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{highlight.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {section.type === "steps" && section.steps && (
              <div className="space-y-6">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="space-y-2">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {stepIndex + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    {stepIndex < section.steps!.length - 1 && <Separator className="ml-12" />}
                  </div>
                ))}
              </div>
            )}

            {section.type === "quote" && section.quote && (
              <Card className="border-l-4 border-l-primary">
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

            {section.type === "stats" && section.stats && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {section.stats.map((stat, statIndex) => (
                  <Card key={statIndex}>
                    <CardContent className="pt-6">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

