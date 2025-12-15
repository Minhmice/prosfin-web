import * as React from "react";
import { ProsfinBadge } from "./prosfin-badge";
import { cn } from "@/lib/utils";

export interface AwardItem {
  id: string;
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "info";
}

export interface ProsfinAwardsRowProps {
  /**
   * Array of awards/badges to display
   */
  awards: AwardItem[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinAwardsRow - Row component hiển thị awards/badges
 * 
 * Dùng để hiển thị chứng chỉ, awards, credentials.
 * Component riêng của Trust/About sections.
 */
export function ProsfinAwardsRow({
  awards,
  className,
}: ProsfinAwardsRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      {awards.map((award) => (
        <ProsfinBadge
          key={award.id}
          badgeVariant={award.variant || "default"}
        >
          {award.label}
        </ProsfinBadge>
      ))}
    </div>
  );
}

