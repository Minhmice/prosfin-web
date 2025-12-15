import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared/section/prosfin-section-heading";

export interface ServicesHeaderProps {
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
 * ServicesHeader - Header component cho Services Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title, subtitle.
 * Component riêng của Services Section.
 */
export function ServicesHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: ServicesHeaderProps) {
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

