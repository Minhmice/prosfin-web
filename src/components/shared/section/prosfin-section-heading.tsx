import * as React from "react";
import { SectionHeading } from "../section-heading";
import { cn } from "@/lib/utils";

export interface ProsfinSectionHeadingProps {
  /**
   * Eyebrow / Label nhỏ phía trên title
   */
  eyebrow?: string;
  /**
   * Main title / headline
   */
  title: string;
  /**
   * Subtitle / description
   */
  subtitle?: string;
  /**
   * Text alignment
   * @default "left"
   */
  align?: "left" | "center";
  /**
   * Title size variant
   * @default "lg"
   */
  titleSize?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * ProsfinSectionHeading - Wrapper component cho section headings
 * 
 * Render Eyebrow + Title + Subtitle theo style chuẩn của ProsFIN.
 * Sử dụng cho tất cả sections (Problems, Services, etc.).
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinSectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  titleSize = "lg",
  className,
}: ProsfinSectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <div className="text-sm font-medium text-primary/80 uppercase tracking-wide">
          {eyebrow}
        </div>
      )}

      {/* Title */}
      <SectionHeading size={titleSize} as="h2">
        {title}
      </SectionHeading>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed text-muted-foreground sm:text-xl",
            align === "center" && "max-w-3xl",
            align === "left" && "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

