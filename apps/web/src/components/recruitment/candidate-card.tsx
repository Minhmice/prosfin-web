"use client";

import Link from "next/link";
import type { TalentPoolCandidate } from "@/content/recruitment.catalog";
import { recruitmentCatalog } from "@/content/recruitment.catalog";
import { cn } from "@/lib/utils";
import { ProsfinPrimaryButton } from "@/components/shared";

export interface CandidateCardProps {
  candidate: TalentPoolCandidate;
  className?: string;
}

const LEVEL_LABELS: Record<TalentPoolCandidate["level"], string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
};

const AVAILABILITY_LABELS: Record<
  TalentPoolCandidate["availability"],
  string
> = {
  available: "Có sẵn",
  interviewing: "Đang phỏng vấn",
  "not-available": "Không có sẵn",
};

const AVAILABILITY_COLORS: Record<
  TalentPoolCandidate["availability"],
  string
> = {
  available: "bg-green-100 text-green-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  "not-available": "bg-gray-100 text-gray-800",
};

/**
 * CandidateCard - Card component cho candidate trong talent pool
 * 
 * Privacy: Không hiển thị email/phone/địa chỉ cụ thể (chỉ candidateCode)
 */
export function CandidateCard({ candidate, className }: CandidateCardProps) {
  const ctaHref = `${recruitmentCatalog.ctaDefaults.talentPool}&candidate=${candidate.candidateCode}`;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 space-y-4 transition-all",
        "hover:border-primary hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{candidate.roleTitle}</h3>
            <p className="text-sm font-mono text-muted-foreground">
              {candidate.candidateCode}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              AVAILABILITY_COLORS[candidate.availability]
            )}
          >
            {AVAILABILITY_LABELS[candidate.availability]}
          </span>
        </div>

        {/* Level Badge */}
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {LEVEL_LABELS[candidate.level]}
        </span>
      </div>

      {/* Summary */}
      {candidate.summary && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {candidate.summary}
        </p>
      )}

      {/* Skills & Industry Tags */}
      <div className="space-y-2">
        {candidate.skillTags.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Kỹ năng:
            </p>
            <div className="flex flex-wrap gap-1">
              {candidate.skillTags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {candidate.skillTags.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{candidate.skillTags.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {candidate.industryTags.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Ngành:
            </p>
            <div className="flex flex-wrap gap-1">
              {candidate.industryTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{candidate.location}</span>
        {candidate.experienceYearsRange && (
          <>
            <span>•</span>
            <span>{candidate.experienceYearsRange} năm</span>
          </>
        )}
        {candidate.languages && candidate.languages.length > 0 && (
          <>
            <span>•</span>
            <span>{candidate.languages.join(", ")}</span>
          </>
        )}
      </div>

      {/* Badges */}
      {candidate.badges && candidate.badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {candidate.badges.map((badge, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <ProsfinPrimaryButton asChild size="sm" className="w-full">
        <Link href={ctaHref}>Yêu cầu hồ sơ chi tiết</Link>
      </ProsfinPrimaryButton>
    </div>
  );
}

