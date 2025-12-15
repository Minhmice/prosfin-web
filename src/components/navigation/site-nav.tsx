"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/data/navigation-content";

export interface SiteNavProps {
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Navigation click handler
   */
  onNavClick?: (href: string) => void;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Orientation
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * SiteNav - Navigation component
 * 
 * Render list link tới các section.
 * Component riêng của Navigation.
 */
export function SiteNav({
  items,
  onNavClick,
  className,
  orientation = "horizontal",
}: SiteNavProps) {
  const handleClick = (
    href: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (href.startsWith("#")) {
      // Anchor link - prevent default and scroll
      e.preventDefault();
      if (onNavClick) {
        onNavClick(href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (href.startsWith("/")) {
      // Page link - let Next.js handle, but call onNavClick if provided
      if (onNavClick) {
        onNavClick(href);
      }
      // Don't prevent default - let Next.js Link handle navigation
    }
  };

  const navClasses =
    orientation === "horizontal"
      ? "flex items-center gap-6"
      : "flex flex-col gap-4";

  return (
    <nav className={cn(navClasses, className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(item.href, e)}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

