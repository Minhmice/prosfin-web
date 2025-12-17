"use client";

import * as React from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ProsfinToastProvider } from "@/components/shared";
import { ScrollTopButton } from "@/components/shared/scroll/scroll-top-button";
import { ProsfinCookieBanner } from "@/components/shared";
import { MobileStickyCtaBar } from "@/components/navigation/mobile-sticky-cta-bar";
import { HeroModalProvider, useHeroModal } from "@/components/landing/hero/hero-modal-context";

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
function MarketingLayoutContent({ children }: MarketingLayoutProps) {
  const { openModal } = useHeroModal();

  return (
    <ProsfinToastProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <SiteFooter />
        <ScrollTopButton />
        <ProsfinCookieBanner />
        <MobileStickyCtaBar onCtaClick={openModal} />
      </div>
    </ProsfinToastProvider>
  );
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <HeroModalProvider>
      <MarketingLayoutContent>{children}</MarketingLayoutContent>
    </HeroModalProvider>
  );
}

