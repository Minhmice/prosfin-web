/**
 * CtaRow - Pattern component cho CTA buttons row
 * 
 * Reusable pattern cho primary + secondary CTA buttons.
 */

import * as React from "react";
import { AppButton, type AppButtonProps } from "../wrappers/app-button";
import { cn } from "@/lib/utils";

export interface CtaButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: AppButtonProps["brandVariant"];
  size?: AppButtonProps["size"];
}

export interface CtaRowProps {
  /**
   * Primary CTA
   */
  primary: CtaButton;
  /**
   * Secondary CTA (optional)
   */
  secondary?: CtaButton;
  /**
   * Alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Stack on mobile
   * @default true
   */
  stackMobile?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * CtaRow - Reusable CTA buttons row pattern
 * 
 * @example
 * ```tsx
 * <CtaRow
 *   primary={{ label: "Đặt lịch", href: "/contact" }}
 *   secondary={{ label: "Xem dịch vụ", href: "/services", variant: "outline" }}
 * />
 * ```
 */
export function CtaRow({
  primary,
  secondary,
  align = "left",
  stackMobile = true,
  className,
}: CtaRowProps) {
  return (
    <div
      className={cn(
        "flex gap-4",
        stackMobile && "flex-col sm:flex-row",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        align === "left" && "justify-start",
        className
      )}
    >
      <AppButton
        href={primary.href}
        onClick={primary.onClick}
        brandVariant={primary.variant || "primary"}
        size={primary.size || "lg"}
      >
        {primary.label}
      </AppButton>
      {secondary && (
        <AppButton
          href={secondary.href}
          onClick={secondary.onClick}
          brandVariant={secondary.variant || "outline"}
          size={secondary.size || "lg"}
        >
          {secondary.label}
        </AppButton>
      )}
    </div>
  );
}

