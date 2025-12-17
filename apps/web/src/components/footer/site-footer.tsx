import * as React from "react";
import { SiteLogo } from "@/components/navigation/site-logo";
import { ProsfinContainer } from "@/components/layout/container";
import { FooterLinks } from "./footer-links";
import { FooterContact } from "./footer-contact";
import { FooterLegal } from "./footer-legal";
import { cn } from "@/lib/utils";

export interface SiteFooterProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SiteFooter - Footer component cho marketing site
 * 
 * Gồm 3 khu: Brand & sứ mệnh, Quick links, Contact & Legal.
 * Component riêng của Footer.
 */
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "border-t bg-muted/30",
        className
      )}
    >
      <ProsfinContainer>
        <div className="py-12">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Brand & Mission */}
            <div className="space-y-4 lg:col-span-1">
              <SiteLogo variant="footer" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                ProsFIN đồng hành cùng chủ doanh nghiệp đọc – hiểu – hành động
                với số liệu tài chính.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <FooterLinks />
            </div>

            {/* Contact & Legal */}
            <div className="space-y-6 lg:col-span-1">
              <FooterContact />
              <FooterLegal />
            </div>
          </div>
        </div>
      </ProsfinContainer>
    </footer>
  );
}

