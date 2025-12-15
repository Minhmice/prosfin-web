"use client";

import * as React from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import { caseStudyDetailMap } from "@/data/case-detail";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { CaseStudyScrollStory } from "@/components/shared/animation/case-study-scroll-story";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Case Study Detail Page
 * 
 * Trang chi tiết từng case study.
 */
export default function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = use(params);
  const caseStudy = caseStudyDetailMap[slug];

  if (!caseStudy) {
    notFound();
  }

  const {
    hero,
    context,
    challenges,
    approach,
    results,
    quote,
    learnings,
  } = caseStudy;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {hero.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
        </div>
      </ProsfinSectionWrapper>

      {/* Context */}
      <ProsfinSectionWrapper>
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-4 text-sm">
            <span className="text-muted-foreground">
              Ngành: <span className="font-medium">{context.industry}</span>
            </span>
            <span className="text-muted-foreground">
              Quy mô: <span className="font-medium">{context.size}</span>
            </span>
            <span className="text-muted-foreground">
              Thời gian: <span className="font-medium">{context.duration}</span>
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Bối cảnh</h2>
          <p className="leading-relaxed text-muted-foreground">
            {context.background}
          </p>
        </div>
      </ProsfinSectionWrapper>

      {/* Scrollytelling: Challenges → Approach → Results */}
      <ProsfinSectionWrapper>
        <CaseStudyScrollStory
          blocks={[
            {
              id: "challenges",
              title: "Thách thức",
              content: (
                <ul className="space-y-3">
                  {challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 text-destructive" aria-hidden="true">
                        •
                      </span>
                      <span className="leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "approach",
              title: "Cách ProsFIN tiếp cận",
              content: (
                <div className="space-y-6">
                  {approach.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border bg-card p-6 shadow-sm"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                          aria-label={`Bước ${idx + 1}`}
                        >
                          {idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: "results",
              title: "Kết quả & tác động",
              content: (
                <ul className="space-y-3">
                  {results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 text-primary" aria-hidden="true">
                        ✓
                      </span>
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </ProsfinSectionWrapper>

      {/* Quote */}
      {quote && (
        <ProsfinSectionWrapper>
          <div className="max-w-3xl">
            <div className="rounded-lg border-l-4 border-primary bg-muted/50 p-6">
              <p className="text-lg italic leading-relaxed">"{quote}"</p>
            </div>
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Learnings */}
      <ProsfinSectionWrapper background="muted">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Learnings & khuyến nghị
          </h2>
          <ul className="space-y-3">
            {learnings.map((learning, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  •
                </span>
                <span className="leading-relaxed">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Doanh nghiệp bạn đang ở hoàn cảnh tương tự?
          </h2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Trao đổi với ProsFIN
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}
