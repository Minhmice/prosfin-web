/**
 * FocusRing - Helper for consistent focus rings
 * 
 * Wrapper utility to ensure consistent focus ring styling on interactive elements.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface FocusRingProps {
  children: React.ReactElement;
  className?: string;
  ringColor?: "default" | "primary" | "destructive";
}

const ringColorClasses = {
  default: "focus-visible:ring-ring",
  primary: "focus-visible:ring-primary",
  destructive: "focus-visible:ring-destructive",
};

/**
 * FocusRing - Wrapper to add consistent focus ring
 * 
 * @example
 * ```tsx
 * <FocusRing>
 *   <button>Click me</button>
 * </FocusRing>
 * ```
 */
export function FocusRing({
  children,
  className,
  ringColor = "default",
}: FocusRingProps) {
  return React.cloneElement(children, {
    className: cn(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      ringColorClasses[ringColor],
      className,
      children.props.className
    ),
  });
}

