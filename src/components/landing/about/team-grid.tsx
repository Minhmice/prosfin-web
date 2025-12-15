import * as React from "react";
import { TeamMember } from "@/data/about-content";
import { TeamMemberCard } from "./team-member-card";
import { cn } from "@/lib/utils";

export interface TeamGridProps {
  /**
   * Array of team members to display
   */
  team: TeamMember[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * TeamGrid - Grid layout cho các Team Member Cards
 * 
 * Responsive grid:
 * - Mobile: 1 cột
 * - Tablet: 2 cột
 * - Desktop: 2-4 cột (tùy số lượng members)
 */
export function TeamGrid({ team, className }: TeamGridProps) {
  // Determine grid columns based on number of members
  const gridColsClass =
    team.length <= 2
      ? "md:grid-cols-2"
      : team.length === 3
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1",
        gridColsClass,
        className
      )}
    >
      {team.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

