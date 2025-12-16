"use client";

import * as React from "react";
import { FaqItem } from "@/data/faq-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion/accordion";

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
 * Sử dụng Radix Accordion wrapper (shadcn-like) để render items.
 */
export function FaqList({ items, className }: FaqListProps) {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="mb-2">
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

