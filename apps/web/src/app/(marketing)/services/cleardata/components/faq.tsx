"use client";

import * as React from "react";
import { ProsfinSectionWrapper, ProsfinSectionHeading } from "@/components/shared";
import { FaqCategoryAccordion } from "@/components/faq/faq-category-accordion";
import { parseMarkers } from "@/lib/content/parse-markers";
import type { FaqContent } from "@/data/services/cleardata";

export interface FaqSectionProps {
  content: FaqContent;
}

/**
 * FaqSection - FAQ section với accordion
 * Dùng parseMarkers để convert {tm} marker thành superscript từ data
 */
export function FaqSection({ content }: FaqSectionProps) {
  const faqData = content.items
    .filter((item) => item.question && item.answer)
    .map((item, index) => ({
      id: `faq-${index + 1}`,
      question: parseMarkers(item.question!),
      answer: parseMarkers(item.answer!),
    }));

  return (
    <ProsfinSectionWrapper background="muted" padding="default">
      <ProsfinSectionHeading
        title={content.title}
        subtitle={content.subheadline}
        titleSize="xl"
      />

      <div className="mt-10">
        <FaqCategoryAccordion items={faqData} />
      </div>
    </ProsfinSectionWrapper>
  );
}

