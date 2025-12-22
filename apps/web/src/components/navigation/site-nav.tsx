"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/data/navigation-content";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/shared/tooltip/animated-tooltip";

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
      : "flex flex-col gap-0";

  return (
    <TooltipProvider>
      <nav className={cn(navClasses, className)}>
        {items.map((item) => (
          <Tooltip key={item.href} side="bottom">
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                onClick={(e) => handleClick(item.href, e)}
                className={cn(
                  "font-medium text-muted-foreground transition-colors hover:text-foreground",
                  orientation === "horizontal"
                    ? "text-sm"
                    : "w-full py-3 text-base"
                )}
              >
                {item.label}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
