"use client";

import type { TalentPoolCandidate } from "@/content/recruitment.catalog";
import { CandidateCard } from "./candidate-card";
import { cn } from "@/lib/utils";

export interface TalentPoolGridProps {
  candidates: TalentPoolCandidate[];
  className?: string;
}

/**
 * TalentPoolGrid - Grid layout cho candidate cards
 */
export function TalentPoolGrid({ candidates, className }: TalentPoolGridProps) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">
          Không có kết quả phù hợp. Hãy thử bỏ bớt bộ lọc hoặc gửi yêu cầu để
          ProsFIN đề xuất ứng viên.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.candidateCode} candidate={candidate} />
      ))}
    </div>
  );
}

