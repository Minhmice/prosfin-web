"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shared/accordion/accordion";
import type { ServicePageConfig } from "@/content/services/types";

interface FaqAccordionProps {
  config: ServicePageConfig;
}

export function FaqAccordion({ config }: FaqAccordionProps) {
  const items = config.faq;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="text-2xl font-semibold">Câu hỏi thường gặp</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, idx) => (
          <AccordionItem key={item.q} value={`faq-${idx}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

