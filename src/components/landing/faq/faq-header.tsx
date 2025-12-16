import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared";

export interface FaqHeaderProps {
  /**
   * Eyebrow text
   */
  eyebrow?: string;
  /**
   * Main title
   */
  title: string;
  /**
   * Subtitle
   */
  subtitle?: string;
  /**
   * Text alignment
   * @default "left"
   */
  align?: "left" | "center";
}

/**
 * FaqHeader - Header component cho FAQ Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title, subtitle.
 * Component riêng của FAQ Section.
 */
export function FaqHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: FaqHeaderProps) {
  return (
    <ProsfinSectionHeading
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      align={align}
      titleSize="lg"
    />
  );
}

