import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SiteLogoProps {
  /**
   * Logo variant
   * @default "default"
   */
  variant?: "default" | "footer";
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SiteLogo - Logo component cho ProsFIN
 * 
 * Render logo ProsFIN (text + accent).
 * Component riêng của Navigation.
 */
export function SiteLogo({ variant = "default", className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-bold text-xl tracking-tight",
        variant === "default" && "text-foreground",
        variant === "footer" && "text-foreground",
        className
      )}
    >
      <span className="text-primary">Pros</span>
      <span>FIN</span>
    </Link>
  );
}

