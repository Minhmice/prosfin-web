"use client";

import type { ServiceSection } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion/accordion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

            {section.type === "intro" && section.content && (
              <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                {section.content}
              </p>
            )}

            {section.type === "problem-solution" && (
              <div className="grid gap-8 md:grid-cols-2">
                {section.problems && section.problems.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-destructive flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Vấn đề
                    </h4>
                    <ul className="space-y-2">
                      {section.problems.map((problem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 text-destructive">•</span>
                          <span className="text-muted-foreground">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {section.solutions && section.solutions.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Giải pháp
                    </h4>
                    <ul className="space-y-2">
                      {section.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 text-primary">•</span>
                          <span className="text-muted-foreground">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {section.type === "capabilities" && section.capabilities && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.capabilities.map((capability, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      {capability.icon && (
                        <div className="mb-2 text-2xl">{capability.icon}</div>
                      )}
                      <CardTitle className="text-base">{capability.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {section.type === "requirements" && (
              <Card className="border-l-4 border-l-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Yêu cầu từ khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.items && section.items.length > 0 ? (
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 text-primary">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : section.content ? (
                    <p className="text-muted-foreground">{section.content}</p>
                  ) : null}
                </CardContent>
              </Card>
            )}

            {section.type === "faq" && section.faqs && section.faqs.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {section.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            {section.type === "bullet-steps" && section.items && (
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

