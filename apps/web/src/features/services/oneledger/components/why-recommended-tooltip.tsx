/**
 * Why Recommended Tooltip
 * 
 * Shows topRisks mapping with min 2 bullets.
 * Used to explain why modules/gates are recommended.
 */

"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { getWhyRecommendedReasons } from "../personalize/personalize";
import type { ScanResult, ModuleConfig } from "../personalize/personalize";

interface WhyRecommendedTooltipProps {
  scan: ScanResult;
  modules: ModuleConfig[];
  trigger?: React.ReactNode;
}

export function WhyRecommendedTooltip({
  scan,
  modules,
  trigger,
}: WhyRecommendedTooltipProps) {
  const reasons = getWhyRecommendedReasons(scan, modules);

  if (reasons.length < 2) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || (
          <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <Info className="h-3 w-3" />
            Tại sao được đề xuất?
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <div className="space-y-1">
          <p className="text-xs font-semibold mb-2">Lý do đề xuất:</p>
          <ul className="space-y-1 text-xs">
            {reasons.map((reason, idx) => (
              <li key={idx}>• {reason}</li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

