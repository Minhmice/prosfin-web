import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProsfinButtonProps
  extends React.ComponentProps<typeof Button> {
  /**
   * Brand variant for Prosfin buttons
   * @default "primary"
   */
  brandVariant?: "primary" | "secondary" | "outline" | "ghost";
}

/**
 * ProsfinButton - Branded button component wrapping shadcn Button
 * 
 * This component ensures consistent brand styling across the application.
 * Do not modify components/ui/button.tsx directly - use this wrapper instead.
 */
export function ProsfinButton({
  className,
  brandVariant = "primary",
  variant,
  children,
  ...props
}: ProsfinButtonProps) {
  // Map brand variants to shadcn variants
  const variantMap: Record<string, ButtonProps["variant"]> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
  };

  return (
    <Button
      variant={variant || variantMap[brandVariant]}
      className={cn(
        // Brand-specific enhancements
        "font-medium tracking-normal",
        // Ensure consistent focus states
        "focus-visible:ring-2 focus-visible:ring-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

