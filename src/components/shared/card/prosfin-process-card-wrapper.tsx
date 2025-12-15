import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinProcessCardWrapperProps {
  /**
   * Step number (1, 2, 3, 4...)
   */
  stepNumber?: number | string;
  /**
   * Card title (step title)
   */
  title: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Optional outcome text
   */
  outcome?: string;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Card variant
   * @default "default"
   */
  variant?: "default" | "bordered" | "elevated";
  /**
   * Children for custom content
   */
  children?: React.ReactNode;
}

/**
 * ProsfinProcessCardWrapper - Wrapper component cho Process Step Cards
 * 
 * Wrap shadcn Card với style thống nhất cho mọi "step card" trong Process Section.
 * Layout: số bước + title + description + outcome.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinProcessCardWrapper({
  stepNumber,
  title,
  description,
  outcome,
  className,
  variant = "default",
  children,
}: ProsfinProcessCardWrapperProps) {
  const variantClasses = {
    default: "border-border shadow-sm bg-card",
    bordered: "border-2 border-border shadow-none bg-card",
    elevated: "border-border shadow-md bg-card",
  };

  const formatStepNumber = (num: number | string | undefined) => {
    if (num === undefined) return null;
    const numValue = typeof num === "string" ? parseInt(num, 10) : num;
    return numValue.toString().padStart(2, "0");
  };

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-shadow hover:shadow-md",
        variantClasses[variant],
        className
      )}
    >
      <CardHeader>
        {/* Step Number */}
        {stepNumber !== undefined && (
          <div className="mb-3 text-4xl font-bold text-primary/20 sm:text-5xl">
            {formatStepNumber(stepNumber)}
          </div>
        )}
        <CardTitle className="text-xl leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Description */}
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        {/* Outcome */}
        {outcome && (
          <div className="mt-auto rounded-md bg-primary/5 p-3 text-sm italic text-muted-foreground">
            <span className="font-medium not-italic text-foreground">
              Bạn nhận được:{" "}
            </span>
            {outcome}
          </div>
        )}

        {/* Custom children */}
        {children}
      </CardContent>
    </Card>
  );
}

