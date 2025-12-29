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
  question: React.ReactNode;
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
          <AccordionTrigger>
            <span className="flex-1 pr-4">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
