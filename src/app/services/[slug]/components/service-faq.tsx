import * as React from "react";
import { H2 } from "@/components/shared";
import { FaqCategoryAccordion } from "@/components/faq/faq-category-accordion";

export function ServiceFaqSection({
  title,
  faqs,
}: {
  title: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div>
      <H2 className="mb-8">{title}</H2>
      <FaqCategoryAccordion
        items={faqs.map((faq) => ({
          id: faq.question,
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </div>
  );
}


