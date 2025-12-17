"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProcessTimelineStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface ProcessTimelineScrollProps {
  /**
   * Array of steps to display
   */
  steps: ProcessTimelineStep[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProcessTimelineScroll - Scrollytelling component cho /process page
 * 
 * Khi user scroll qua từng step, highlight step hiện tại (border, background),
 * đồng thời text mô tả bên cạnh thay đổi tương ứng.
 * 
 * @example
 * ```tsx
 * <ProcessTimelineScroll steps={steps} />
 * ```
 */
export function ProcessTimelineScroll({
  steps,
  className,
}: ProcessTimelineScrollProps) {
  const [activeStep, setActiveStep] = React.useState<string | null>(null);
  const stepRefs = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    steps.forEach((step) => {
      const element = stepRefs.current[step.id];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(step.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [steps]);

  return (
    <div className={cn("space-y-8", className)}>
      {steps.map((step) => {
        const isActive = activeStep === step.id;
        return (
          <div
            key={step.id}
            ref={(el) => {
              stepRefs.current[step.id] = el;
            }}
            className={cn(
              "rounded-lg border-2 p-6 transition-all duration-300",
              isActive
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card"
            )}
          >
            <div className="mb-2 flex items-center gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.order}
              </span>
              <h3
                className={cn(
                  "text-xl font-semibold transition-colors",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {step.title}
              </h3>
            </div>
            <p
              className={cn(
                "leading-relaxed transition-opacity",
                isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-70"
              )}
            >
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

