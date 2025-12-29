import * as React from "react";
import { SectionHeading } from "../section-heading";
import { cn } from "@/lib/utils";
import { Text } from "@/components/shared/typography/text";

export interface ProsfinSectionHeadingProps {
  /**
   * Eyebrow / Label nhỏ phía trên title
   */
  eyebrow?: string;
  /**
   * Main title / headline
   */
  title: string | React.ReactNode;
  /**
   * Subtitle / description
   */
  subtitle?: string | React.ReactNode;
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
        <Text
          as="div"
          variant="small"
          className="uppercase tracking-wide text-primary/80"
        >
          {eyebrow}
        </Text>
      )}

      {/* Title */}
      <SectionHeading size={titleSize} as="h2">
        {title}
      </SectionHeading>

      {/* Subtitle */}
      {subtitle && (
        <Text
          as="p"
          variant="lead"
          className={cn(
            align === "center" && "max-w-md md:max-w-3xl",
            align === "left" && "max-w-md md:max-w-2xl"
          )}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}

