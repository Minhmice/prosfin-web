"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Accordion wrapper theo pattern shadcn/ui (API tương đương),
 * nhưng implement bằng state nội bộ để tránh vấn đề tương thích/hydration.
 *
 * Lưu ý: không đặt trong `components/ui/**` theo rule của repo.
 */
type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  collapsible: boolean;
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
};

export function Accordion({
  type,
  collapsible = false,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openSingle, setOpenSingle] = React.useState<string | null>(() => {
    if (type !== "single") return null;
    return typeof defaultValue === "string" ? defaultValue : null;
  });
  const [openMultiple, setOpenMultiple] = React.useState<string[]>(() => {
    if (type !== "multiple") return [];
    return Array.isArray(defaultValue) ? defaultValue : [];
  });

  const isOpen = React.useCallback(
    (value: string) =>
      type === "single" ? openSingle === value : openMultiple.includes(value),
    [openMultiple, openSingle, type]
  );

  const toggle = React.useCallback(
    (value: string) => {
      if (type === "single") {
        setOpenSingle((prev) => {
          if (prev === value) return collapsible ? null : prev;
          return value;
        });
        return;
      }
      setOpenMultiple((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    },
    [collapsible, type]
  );

  const ctx = React.useMemo<AccordionContextValue>(
    () => ({ type, collapsible, isOpen, toggle }),
    [collapsible, isOpen, toggle, type]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemContextValue = {
  value: string;
  triggerId: string;
  contentId: string;
  open: boolean;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

export function AccordionItem({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");

  const reactId = React.useId();
  const triggerId = `accordion-trigger-${reactId}`;
  const contentId = `accordion-content-${reactId}`;
  const open = ctx.isOpen(value);

  return (
    <AccordionItemContext.Provider
      value={{ value, triggerId, contentId, open }}
    >
      <div
        data-state={open ? "open" : "closed"}
        className={cn("rounded-lg border bg-card", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);
  if (!ctx || !item)
    throw new Error("AccordionTrigger must be used within AccordionItem");

  return (
    <h3 className="flex">
      <button
        id={item.triggerId}
        type="button"
        aria-controls={item.contentId}
        aria-expanded={item.open}
        data-state={item.open ? "open" : "closed"}
        onClick={() => ctx.toggle(item.value)}
        className={cn(
          "flex flex-1 items-center justify-between gap-4 p-4 text-left font-semibold text-foreground transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            item.open && "rotate-180"
          )}
        />
      </button>
    </h3>
  );
}

export function AccordionContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const item = React.useContext(AccordionItemContext);
  if (!item)
    throw new Error("AccordionContent must be used within AccordionItem");

  return (
    <AnimatePresence>
      {item.open && (
        <motion.div
          id={item.contentId}
          role="region"
          aria-labelledby={item.triggerId}
          data-state="open"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 22,
            duration: 0.3,
          }}
          className={cn("overflow-hidden", className)}
        >
          <div className="px-4 pt-1 pb-4 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
