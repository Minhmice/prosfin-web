import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Text, ProsfinBadge } from "@/components/shared";

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
   * Optional bullets list
   */
  bullets?: string[];
  /**
   * Optional output tag (displayed as badge)
   */
  outputTag?: string;
  /**
   * Step number position
   * @default "left"
   */
  stepNumberPosition?: "left" | "right";
  /**
   * Additional className
   */
  className?: string;
  /**
   * Card variant
   * @default "default"
   */
  variant?: "default" | "bordered" | "bordered-muted" | "elevated";
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
  bullets,
  outputTag,
  stepNumberPosition = "left",
  className,
  variant = "default",
  children,
}: ProsfinProcessCardWrapperProps) {
  const variantClasses = {
    default: "border-border shadow-sm bg-card",
    bordered: "border-2 border-border shadow-none bg-card",
    "bordered-muted": "border-2 border-border shadow-none bg-muted",
    elevated: "border-border shadow-md bg-card",
  };

  const formatStepNumber = (num: number | string | undefined) => {
    if (num === undefined) return null;
    const numValue = typeof num === "string" ? parseInt(num, 10) : num;
    return numValue.toString().padStart(2, "0");
  };

  const isStepNumberRight = stepNumberPosition === "right" && stepNumber !== undefined;

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:border-primary/50",
        variantClasses[variant],
        isStepNumberRight && "relative",
        className
      )}
    >
      {/* Step Number - Right Position */}
      {isStepNumberRight && (
        <div className="absolute top-6 right-6 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center">
          <span className="text-xl font-bold">{stepNumber}</span>
        </div>
      )}

      <CardHeader className={isStepNumberRight ? "pr-14" : ""}>
        {/* Step Number - Left Position */}
        {stepNumber !== undefined && !isStepNumberRight && (
          <Text as="div" variant="stepNumber" className="mb-3">
            {formatStepNumber(stepNumber)}
          </Text>
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

        {/* Bullets */}
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-muted-foreground/50 mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Output Tag */}
        {outputTag && (
          <ProsfinBadge variant="default">{outputTag}</ProsfinBadge>
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

