import * as React from "react";
import Link from "next/link";
import { legalContent } from "@/data/legal-content";
import { cn } from "@/lib/utils";

export interface FooterLinksProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FooterLinks - Links component cho footer
 * 
 * Component riêng của Footer.
 * Render nhóm link, chia "Điều hướng" & "Pháp lý".
 */
export function FooterLinks({ className }: FooterLinksProps) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2", className)}>
      {legalContent.footerLinks.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            {group.title}
          </h3>
          <ul className="space-y-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

