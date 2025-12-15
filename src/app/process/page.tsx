"use client";

import * as React from "react";
import { processPageContent } from "@/data/process-page";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { ProsfinFaqAccordion } from "@/components/shared/accordion/prosfin-faq-accordion";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";
import { ProcessTimelineScroll } from "@/components/shared/animation/process-timeline-scroll";

/**
 * Process Page
 * 
 * Trang quy trình làm việc chi tiết.
 */
export default function ProcessPage() {
  const { hero, stepDetails, personas, timelineBlocks, scopeNote } =
    processPageContent;

  // Convert stepDetails to accordion items
  const accordionItems = stepDetails.map((step) => ({
    id: step.id,
    question: step.title,
    answer: [
      "Bạn cần chuẩn bị:",
      ...step.whatToPrepare.map((item) => `• ${item}`),
      "",
      "ProsFIN làm gì:",
      ...step.whatProsfinDoes.map((item) => `• ${item}`),
      "",
      "Bạn nhận được:",
      ...step.whatYouGet.map((item) => `• ${item}`),
    ].join("\n"),
  }));

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          align="center"
          titleSize="xl"
        />
        <div className="mt-8 text-center">
          <ProsfinPrimaryButton href={hero.cta.href} size="lg">
            {hero.cta.label}
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Step Details - Scrollytelling */}
      <ProsfinSectionWrapper>
        <RevealOnScroll direction="up" delay={0}>
          <div>
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Chi tiết từng bước trong quy trình
            </h2>
            <ProcessTimelineScroll
              steps={stepDetails.map((step) => ({
                id: step.id,
                order: step.order,
                title: step.title,
                description: `${step.whatToPrepare.length} mục cần chuẩn bị. ProsFIN sẽ ${step.whatProsfinDoes.join(", ").toLowerCase()}. Bạn nhận được ${step.whatYouGet.length} deliverable.`,
              }))}
            />
          </div>
        </RevealOnScroll>
      </ProsfinSectionWrapper>

      {/* Timeline */}
      <ProsfinSectionWrapper background="muted">
        <RevealOnScroll direction="up" delay={0}>
          <div>
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Timeline dự kiến & cường độ làm việc
            </h2>
            <div className="space-y-8">
              {timelineBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                >
                  <h3 className="mb-4 text-lg font-semibold">{block.period}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">
                        Hoạt động:
                      </p>
                      <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                        {block.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">
                        Deliverables:
                      </p>
                      <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                        {block.deliverables.map((deliverable, i) => (
                          <li key={i}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </ProsfinSectionWrapper>

      {/* Personas */}
      <ProsfinSectionWrapper>
        <div>
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            Ví dụ hành trình theo persona
          </h2>
          <div className="space-y-8">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 text-xl font-semibold">{persona.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {persona.industry} • {persona.size}
                </p>
                <div className="space-y-4">
                  {persona.journey.map((step, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-4">
                      <p className="mb-1 text-sm font-medium">{step.week}</p>
                      <p className="mb-2 text-sm leading-relaxed">
                        {step.activity}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        → {step.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Scope Note */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <div className="rounded-lg border-2 border-primary bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">{scopeNote.title}</h3>
            <p className="leading-relaxed text-muted-foreground">
              {scopeNote.content}
            </p>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Bắt đầu từ bước 1: Khám sức khỏe tài chính
          </h2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Đặt lịch trao đổi
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

