/**
 * AppLink - Wrapper cho Link component với variants
 * 
 * Wrapper này wrap next/link với style variants.
 * Đảm bảo link styling nhất quán.
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AppLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className"> {
  /**
   * Link variant
   * @default "default"
   */
  variant?: "default" | "primary" | "muted" | "underline";
  /**
   * Additional className
   */
  className?: string;
  /**
   * External link (opens in new tab)
   */
  external?: boolean;
}

/**
 * AppLink - Main link wrapper component
 * 
 * @example
 * ```tsx
 * <AppLink href="/services" variant="primary">Services</AppLink>
 * ```
 */
export function AppLink({
  variant = "default",
  className,
  external = false,
  href,
  ...props
}: AppLinkProps) {
  const variantClasses = {
    default: "text-foreground hover:text-primary transition-colors",
    primary: "text-primary hover:text-primary/80 font-medium transition-colors",
    muted: "text-muted-foreground hover:text-foreground transition-colors",
    underline:
      "text-primary underline-offset-4 hover:underline transition-colors",
  };

  if (external || (typeof href === "string" && href.startsWith("http"))) {
    return (
      <a
        href={href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(variantClasses[variant], className)}
        {...(props as React.ComponentProps<"a">)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {props.children}
    </Link>
  );
}

