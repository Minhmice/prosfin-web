"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { SiteLogo } from "./site-logo";
import { SiteNav } from "./site-nav";
import { MobileMenu } from "./mobile-menu";
import { ProsfinPrimaryButton } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { navigationItems, headerCtaLabel } from "@/data/navigation-content";
import { cn } from "@/lib/utils";
import { useHeroModal } from "@/components/landing/hero/hero-modal-context";

export interface SiteHeaderProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SiteHeader - Header component cho marketing site
 * 
 * Thành phần header cố định trên mọi page marketing.
 * Logo, nav links, CTA button.
 * Component riêng của Navigation.
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { openModal } = useHeroModal();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Anchor link - scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      // Page link - navigate to page
      // If on landing page and link has anchor, scroll to section
      if (window.location.pathname === "/" && href.includes("#")) {
        const [path, anchor] = href.split("#");
        if (path === "/" && anchor) {
          const element = document.querySelector(`#${anchor}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      // Otherwise, let Next.js Link handle navigation
    }
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    // Step 1: mở mini form modal (UI-only onboarding)
    openModal();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background md:bg-background/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-background/60",
          className
        )}
      >
        <ProsfinContainer>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <SiteLogo />

            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center md:gap-6">
              <SiteNav items={navigationItems} onNavClick={handleNavClick} />
              <ProsfinPrimaryButton onClick={handleCtaClick} size="sm">
                {headerCtaLabel}
              </ProsfinPrimaryButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </ProsfinContainer>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        items={navigationItems}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        onItemClick={handleNavClick}
        onCtaClick={handleCtaClick}
      />
    </>
  );
}

