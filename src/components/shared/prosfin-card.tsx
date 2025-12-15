import * as React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  type CardProps,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinCardProps extends CardProps {
  /**
   * Card variant for different use cases
   * @default "default"
   */
  variant?: "default" | "elevated" | "outlined" | "flat";
}

/**
 * ProsfinCard - Branded card component wrapping shadcn Card
 * 
 * This component ensures consistent brand styling across the application.
 * Do not modify components/ui/card.tsx directly - use this wrapper instead.
 */
export function ProsfinCard({
  className,
  variant = "default",
  ...props
}: ProsfinCardProps) {
  const variantStyles = {
    default: "shadow-sm",
    elevated: "shadow-md",
    outlined: "shadow-none border-2",
    flat: "shadow-none border-0 bg-secondary/50",
  };

  return (
    <Card
      className={cn(
        // Brand-specific enhancements
        "transition-shadow duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

// Re-export all Card sub-components for convenience
export {
  CardHeader as ProsfinCardHeader,
  CardFooter as ProsfinCardFooter,
  CardTitle as ProsfinCardTitle,
  CardAction as ProsfinCardAction,
  CardDescription as ProsfinCardDescription,
  CardContent as ProsfinCardContent,
};

