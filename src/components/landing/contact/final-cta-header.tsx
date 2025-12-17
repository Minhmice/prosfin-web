import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared";

export interface FinalCtaHeaderProps {
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
 * FinalCtaHeader - Header component cho Final CTA Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title.
 * Subtitle render ngay dưới.
 * Component riêng của Contact Section.
 */
export function FinalCtaHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: FinalCtaHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <ProsfinSectionHeading
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        align={align}
        titleSize="lg"
      />
    </div>
  );
}

