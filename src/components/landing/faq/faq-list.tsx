import * as React from "react";
import { FaqItem } from "@/data/faq-content";
import { ProsfinFaqAccordion } from "@/components/shared/accordion/prosfin-faq-accordion";

export interface FaqListProps {
  /**
   * Array of FAQ items
   */
  items: FaqItem[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FaqList - List component cho FAQ items
 * 
 * Component riêng của FAQ Section.
 * Sử dụng ProsfinFaqAccordion để render items.
 */
export function FaqList({ items, className }: FaqListProps) {
  // Convert FaqItem to FaqAccordionItem format
  const accordionItems = items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <ProsfinFaqAccordion items={accordionItems} className={className} />
  );
}

