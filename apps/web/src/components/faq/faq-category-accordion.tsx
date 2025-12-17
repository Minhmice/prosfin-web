"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion/accordion";

export type FaqAccordionEntry = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

/**
 * FaqCategoryAccordion
 * Wrapper client component để đảm bảo accordion luôn hydrate & clickable trong Server Pages.
 */
export function FaqCategoryAccordion({
  items,
}: {
  items: FaqAccordionEntry[];
}) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="mb-2">
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
