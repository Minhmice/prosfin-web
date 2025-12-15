import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";

export interface ProblemsHeaderProps {
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
 * ProblemsHeader - Header component cho Problem Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title, subtitle.
 * Component riêng của Problem Section.
 */
export function ProblemsHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: ProblemsHeaderProps) {
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

