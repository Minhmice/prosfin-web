/**
 * Recommended Path Ribbon
 * 
 * Shows 2 next steps: recommended Gate + Module bundle.
 * Based on personalization engine output.
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { AcceptanceGate, Bundle } from "@/content/services/types";
import { scrollToAnchor } from "./scroll-jump";

interface RecommendedPathRibbonProps {
  recommendedGateId?: string;
  recommendedBundleId?: string;
  gates: AcceptanceGate[];
  bundles: Bundle[];
  onJumpToGate?: (gateId: string) => void;
  onSelectBundle?: (bundleId: string) => void;
  onOpenCta?: (payload?: Record<string, unknown>) => void;
}

export function RecommendedPathRibbon({
  recommendedGateId,
  recommendedBundleId,
  gates,
  bundles,
  onJumpToGate,
  onSelectBundle,
  onOpenCta,
}: RecommendedPathRibbonProps) {
  const gate = recommendedGateId ? gates.find((g) => g.id === recommendedGateId) : undefined;
  const bundle = recommendedBundleId ? bundles.find((b) => b.id === recommendedBundleId) : undefined;

  if (!gate && !bundle) {
    return null;
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="default">Đề xuất cho bạn</Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {gate && (
              <div className="space-y-2 rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{gate.id}</Badge>
                  <h3 className="text-sm font-semibold">{gate.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {gate.successDefinition?.[0] || "Bước tiếp theo phù hợp với tình trạng của bạn"}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    scrollToAnchor(`gate-${gate.id}`, { highlight: true });
                    onJumpToGate?.(gate.id);
                  }}
                  className="w-full"
                >
                  Xem gate này <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}

            {bundle && (
              <div className="space-y-2 rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{bundle.name}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {bundle.outcomes[0] || "Bundle phù hợp với nhu cầu của bạn"}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onSelectBundle?.(bundle.id);
                    onOpenCta?.({
                      sourceDetail: `recommended_bundle:${bundle.id}`,
                      bundleId: bundle.id,
                    });
                  }}
                  className="w-full"
                >
                  Đặt lịch cho bundle này <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

