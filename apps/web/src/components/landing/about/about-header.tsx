import * as React from "react";
import { ProsfinSectionHeading } from "@/components/shared";
import { cn } from "@/lib/utils";

export interface AboutHeaderProps {
  /**
   * Eyebrow text
   */
  eyebrow?: string;
  /**
   * Main title
   */
  title: string;
  /**
   * Intro paragraph
   */
  introParagraph?: string;
  /**
   * Text alignment
   * @default "left"
   */
  align?: "left" | "center";
}

/**
 * AboutHeader - Header component cho About Section
 * 
 * Sử dụng ProsfinSectionHeading để render eyebrow, title.
 * Intro paragraph render phía dưới với max-width.
 * Component riêng của About Section.
 */
export function AboutHeader({
  eyebrow,
  title,
  introParagraph,
  align = "left",
}: AboutHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <ProsfinSectionHeading
        eyebrow={eyebrow}
        title={title}
        align={align}
        titleSize="lg"
      />
      {introParagraph && (
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg",
            align === "center" && "mx-auto max-w-md md:max-w-3xl text-center",
            align === "left" && "max-w-md md:max-w-2xl"
          )}
        >
          {introParagraph}
        </p>
      )}
    </div>
  );
}

