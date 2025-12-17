"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SiteNav } from "./site-nav";
import { ProsfinPrimaryButton } from "@/components/shared";
import { NavigationItem } from "@/data/navigation-content";
import { headerCtaLabel } from "@/data/navigation-content";

export interface MobileMenuProps {
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Open state
   */
  open: boolean;
  /**
   * Open change handler
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Item click handler
   */
  onItemClick?: (href: string) => void;
  /**
   * CTA click handler
   */
  onCtaClick?: () => void;
}

/**
 * MobileMenu - Mobile menu component
 * 
 * Menu dạng sheet/drawer khi mobile.
 * Component riêng của Navigation.
 */
export function MobileMenu({
  items,
  open,
  onOpenChange,
  onItemClick,
  onCtaClick,
}: MobileMenuProps) {
  const handleItemClick = (href: string) => {
    if (onItemClick) {
      onItemClick(href);
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full md:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-6">
          <SiteNav
            items={items}
            onNavClick={handleItemClick}
            orientation="vertical"
          />
          <ProsfinPrimaryButton onClick={onCtaClick} className="w-full">
            {headerCtaLabel}
          </ProsfinPrimaryButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}

