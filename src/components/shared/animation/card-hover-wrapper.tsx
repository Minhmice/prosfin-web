"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardHoverWrapperProps {
  /**
   * Children to wrap
   */
  children: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Enable hover effect
   * @default true
   */
  enableHover?: boolean;
}

/**
 * CardHoverWrapper - Wrapper để thêm hover states cho cards
 * 
 * Thêm các hiệu ứng hover:
 * - Nâng nhẹ (translate-y-1)
 * - Shadow nhấn
 * - Border-primary subtle
 * 
 * Transition mượt 150-200ms.
 * 
 * @example
 * ```tsx
 * <CardHoverWrapper>
 *   <YourCard />
 * </CardHoverWrapper>
 * ```
 */
export function CardHoverWrapper({
  children,
  className,
  enableHover = true,
}: CardHoverWrapperProps) {
  if (!enableHover) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1",
        "hover:shadow-lg",
        "hover:border-primary/50",
        className
      )}
    >
      {children}
    </div>
  );
}

