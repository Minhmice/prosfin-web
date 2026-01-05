/**
 * SkipLink - Skip to content link
 * 
 * Accessibility: allows keyboard users to skip navigation and go directly to main content.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href?: string;
  label?: string;
  className?: string;
}

/**
 * SkipLink - Skip to content link component
 * 
 * Hidden until focused, jumps to main content.
 */
export function SkipLink({
  href = "#main-content",
  label = "Bỏ qua đến nội dung chính",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "absolute left-4 top-4 z-50 -translate-y-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      {label}
    </a>
  );
}

