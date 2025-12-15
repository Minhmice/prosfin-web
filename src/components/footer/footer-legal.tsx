import * as React from "react";
import { legalContent } from "@/data/legal-content";
import { cn } from "@/lib/utils";

export interface FooterLegalProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FooterLegal - Legal/disclosure component cho footer
 * 
 * Component riêng của Footer.
 * Hiển thị copyright, disclaimer, và links pháp lý.
 */
export function FooterLegal({ className }: FooterLegalProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-xs text-muted-foreground">
        {legalContent.copyright}
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {legalContent.disclaimer}
      </p>
      <div className="flex flex-wrap gap-4 text-xs">
        {legalContent.footerLinks
          .find((group) => group.title === "Pháp lý")
          ?.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
      </div>
    </div>
  );
}

