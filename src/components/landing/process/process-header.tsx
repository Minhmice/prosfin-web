import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";

export interface ProcessHeaderProps {
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
   * @default "center"
   */
  align?: "left" | "center";
}

/**
 * ProcessHeader - Header component cho Process Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title, subtitle.
 * Component riêng của Process Section.
 * Default align center để nhìn đẹp hơn cho Process Section.
 */
export function ProcessHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: ProcessHeaderProps) {
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

