import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
      <Image
        src="/brand/logo_rectangle.svg"
        alt="ProsFIN"
        width={140}
        height={28}
        priority={variant === "default"}
        className="h-full"
      />
      <span className="sr-only">ProsFIN</span>
    </Link>
  );
}

