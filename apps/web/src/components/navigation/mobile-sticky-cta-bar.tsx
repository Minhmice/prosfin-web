"use client";

import * as React from "react";
import { ProsfinPrimaryButton } from "@/components/shared";
import { headerCtaLabel } from "@/data/navigation-content";

export interface MobileStickyCtaBarProps {
  /**
   * Click handler - mở modal hoặc navigate
   */
  onCtaClick?: () => void;
}

/**
 * MobileStickyCtaBar - Sticky CTA bar cho mobile
 * 
 * Hiển thị fixed bottom bar với CTA button primary.
 * Chỉ hiển thị trên mobile (md:hidden).
 * Component riêng của Navigation.
 */
export function MobileStickyCtaBar({ onCtaClick }: MobileStickyCtaBarProps) {
  // Tránh hydration mismatch: chỉ render bar sau khi component đã mount ở client.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default: navigate to contact page
      if (window.location.pathname === "/") {
        const element = document.querySelector("#contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.location.href = "/contact";
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background border-t">
      <div className="px-4 py-3">
        <ProsfinPrimaryButton
          onClick={handleClick}
          className="w-full"
          size="lg"
          aria-label="Đặt lịch tư vấn"
        >
          {headerCtaLabel}
        </ProsfinPrimaryButton>
      </div>
    </div>
  );
}

