"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqAccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProsfinFaqAccordionProps {
  /**
   * Array of FAQ items
   */
  items: FaqAccordionItem[];
  /**
   * Allow multiple items open at once
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinFaqAccordion - Wrapper component cho FAQ Accordion
 * 
 * Accordion component đơn giản cho FAQ section.
 * Sử dụng state để quản lý open/close items.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinFaqAccordion({
  items,
  allowMultiple = false,
  className,
}: ProsfinFaqAccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className="rounded-lg border bg-card transition-colors hover:bg-accent/50"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

