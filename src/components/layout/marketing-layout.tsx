import * as React from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ProsfinToastProvider } from "@/components/shared/toast/prosfin-toast-provider";
import { ScrollTopButton } from "@/components/shared/scroll/scroll-top-button";
import { ProsfinCookieBanner } from "@/components/shared/banner/prosfin-cookie-banner";

export interface MarketingLayoutProps {
  /**
   * Children content
   */
  children: React.ReactNode;
}

/**
 * MarketingLayout - Layout wrapper cho các trang marketing
 * 
 * Render SiteHeader, main content, và SiteFooter.
 * Set background và typography default cho toàn bộ marketing site.
 * Bao gồm ToastProvider, ScrollTopButton, và CookieBanner.
 */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <ProsfinToastProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollTopButton />
        <ProsfinCookieBanner />
      </div>
    </ProsfinToastProvider>
  );
}

