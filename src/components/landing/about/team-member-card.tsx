import * as React from "react";
import { ProsfinTeamCardWrapper } from "@/components/shared/card/prosfin-team-card-wrapper";
import { TeamMember } from "@/data/about-content";

export interface TeamMemberCardProps {
  /**
   * Team member data
   */
  member: TeamMember;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * TeamMemberCard - Component hiển thị một team member
 * 
 * Sử dụng ProsfinTeamCardWrapper để render nội dung.
 * Component riêng của About Section.
 */
export function TeamMemberCard({
  member,
  className,
}: TeamMemberCardProps) {
  return (
    <ProsfinTeamCardWrapper
      name={member.name}
      role={member.role}
      bio={member.bio}
      credentials={member.credentials}
      avatarUrl={member.avatarUrl}
      linkedInUrl={member.linkedInUrl}
      className={className}
    />
  );
}

