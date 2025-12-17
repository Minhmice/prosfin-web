"use client";

import * as React from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import { caseStudyDetailMap } from "@/data/case-detail";
import { H1, H2, ProsfinSectionWrapper, ProsfinPrimaryButton, Text } from "@/components/shared";
import { CaseStudyScrollStory } from "@/components/shared/animation/case-study-scroll-story";

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
          <H1 className="mb-4">{hero.title}</H1>
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
          <H2 className="mb-4">Bối cảnh</H2>
          <Text as="p" variant="lead" className="text-muted-foreground">
            {context.background}
          </Text>
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
                      <Text as="span" variant="body">
                        {challenge}
                      </Text>
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
                        <Text as="p" variant="large">
                          {step.title}
                        </Text>
                      </div>
                      <Text as="p" variant="lead" className="text-muted-foreground">
                        {step.description}
                      </Text>
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
                      <Text as="span" variant="body">
                        {result}
                      </Text>
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
              <Text as="p" variant="large" className="italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </Text>
            </div>
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Learnings */}
      <ProsfinSectionWrapper background="muted">
        <div className="max-w-3xl">
          <H2 className="mb-4">Learnings & khuyến nghị</H2>
          <ul className="space-y-3">
            {learnings.map((learning, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 text-primary" aria-hidden="true">
                  •
                </span>
                <Text as="span" variant="body">
                  {learning}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper>
        <div className="text-center">
          <H2 className="mb-4">Doanh nghiệp bạn đang ở hoàn cảnh tương tự?</H2>
          <ProsfinPrimaryButton href="/contact" size="lg">
            Trao đổi với ProsFIN
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}
