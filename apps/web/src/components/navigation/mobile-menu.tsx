"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion/accordion";
import { ProsfinPrimaryButton } from "@/components/shared";
import { getSiteNavigation } from "@/content/site.navigation";
import { cn } from "@/lib/utils";

export interface MobileMenuProps {
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
}

/**
 * MobileMenu - Mobile menu component với Accordion
 * 
 * Menu dạng sheet/drawer khi mobile.
 * Sử dụng Accordion cho nested navigation structure.
 * Data source: site.navigation.ts (single source of truth)
 */
export function MobileMenu({
  open,
  onOpenChange,
  onItemClick,
}: MobileMenuProps) {
  const navigation = getSiteNavigation();

  const handleItemClick = (href: string) => {
    if (onItemClick) {
      onItemClick(href);
    } else {
      // Default behavior: navigate and close
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full md:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <Accordion type="multiple" className="w-full">
            {navigation.mainNav.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b">
                {item.children && item.children.length > 0 ? (
                  <>
                    <AccordionTrigger className="text-base font-medium py-3">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* Nested accordion for Services */}
                      {item.id === "services" ? (
                        <Accordion type="multiple" className="w-full">
                          {item.children.map((category) => (
                            <AccordionItem
                              key={category.id}
                              value={category.id}
                              className="border-b border-muted"
                            >
                              <AccordionTrigger className="text-sm font-medium py-2">
                                {category.label}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-1 pl-4">
                                  {category.children?.map((service) => (
                                    <li key={service.id}>
                                      <Link
                                        href={service.href}
                                        onClick={() => handleItemClick(service.href)}
                                        className={cn(
                                          "block py-2 text-sm text-muted-foreground",
                                          "hover:text-foreground transition-colors"
                                        )}
                                      >
                                        {service.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <ul className="space-y-1 pl-4">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                onClick={() => handleItemClick(child.href)}
                                className={cn(
                                  "block py-2 text-sm text-muted-foreground",
                                  "hover:text-foreground transition-colors"
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => handleItemClick(item.href)}
                    className={cn(
                      "flex items-center justify-between py-3 text-base font-medium",
                      "hover:text-foreground transition-colors"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA Button */}
          <ProsfinPrimaryButton asChild className="w-full mt-4">
            <Link href={navigation.cta.href} onClick={() => onOpenChange(false)}>
              {navigation.cta.label}
            </Link>
          </ProsfinPrimaryButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
