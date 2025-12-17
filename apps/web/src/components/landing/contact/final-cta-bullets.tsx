import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FinalCtaBulletsProps {
  /**
   * Array of bullet points
   */
  bullets?: string[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FinalCtaBullets - Component hiển thị bullets lợi ích
 * 
 * Component riêng của Contact Section.
 * Hiển thị danh sách lợi ích với icon check.
 */
export function FinalCtaBullets({
  bullets,
  className,
}: FinalCtaBulletsProps) {
  if (!bullets || bullets.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {bullets.map((bullet, index) => (
        <li key={index} className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span className="text-base leading-relaxed text-muted-foreground">
            {bullet}
          </span>
        </li>
      ))}
    </ul>
  );
}

