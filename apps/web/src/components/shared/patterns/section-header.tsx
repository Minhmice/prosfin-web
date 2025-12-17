/**
 * SectionHeader - Pattern component cho section headers
 * 
 * Reusable pattern cho eyebrow + title + subtitle + optional CTA.
 * Sử dụng ProsfinSectionHeading bên trong.
 */

import * as React from "react";
import { ProsfinSectionHeading } from "../section/section-heading-block";
import { AppButton, type AppButtonProps } from "../wrappers/app-button";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  /**
   * Eyebrow text (small label above title)
   */
  eyebrow?: string;
  /**
   * Main title
   */
  title: string;
  /**
   * Subtitle/description
   */
  subtitle?: string;
  /**
   * Text alignment
   * @default "left"
   */
  align?: "left" | "center";
  /**
   * Title size
   * @default "md"
   */
  titleSize?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional CTA button
   */
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: AppButtonProps["brandVariant"];
    size?: AppButtonProps["size"];
  };
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SectionHeader - Reusable section header pattern
 * 
 * @example
 * ```tsx
 * <SectionHeader
 *   eyebrow="Dịch vụ"
 *   title="Giải pháp tài chính"
 *   subtitle="Đồng hành cùng doanh nghiệp"
 *   cta={{ label: "Xem thêm", href: "/services" }}
 * />
 * ```
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  titleSize = "md",
  cta,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ProsfinSectionHeading
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        align={align}
        titleSize={titleSize}
      />
      {cta && (
        <div
          className={cn(
            "flex",
            align === "center" && "justify-center",
            align === "left" && "justify-start"
          )}
        >
          <AppButton
            href={cta.href}
            onClick={cta.onClick}
            brandVariant={cta.variant}
            size={cta.size}
          >
            {cta.label}
          </AppButton>
        </div>
      )}
    </div>
  );
}

