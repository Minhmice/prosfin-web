"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { runLedgerScan } from "./ledger-scan-engine";
import { scrollToModuleCard, highlightId } from "./scroll-jump";
import type { ScanConfig, ModuleConfig } from "@/content/services/types";
import { track } from "@/lib/analytics/events";
import { getVariant } from "@/experiments/client-flags";
import { getScanVariantOverrides } from "../experiments/variants";

export interface LedgerScanCardProps {
  scanConfig: ScanConfig;
  modules: ModuleConfig[];
  onJumpToModule?: (id: string) => void;
  onOpenModuleDialog?: (moduleId: string) => void;
  onOpenCta?: (payload: Record<string, unknown>) => void;
}

export function LedgerScanCard({
  scanConfig,
  modules,
  onJumpToModule,
  onOpenModuleDialog,
  onOpenCta,
}: LedgerScanCardProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Phase 6: Get scan variant and apply overrides
  const scanVariant = getVariant("oneledger_scan_design");
  const scanConfigWithVariant: ScanConfig = scanVariant
    ? { ...scanConfig, ...getScanVariantOverrides(scanVariant, scanConfig) }
    : scanConfig;

  // Phase 3: Use runLedgerScan (v2)
  const result = useMemo(
    () =>
      runLedgerScan({
        scan: scanConfigWithVariant,
        selectedQuestionIds: Array.from(selectedIds),
        selectedEvents: [], // TODO: Add event selection if needed
      }),
    [scanConfigWithVariant, selectedIds]
  );

  // Phase 5: Track scan completed when result changes
  useEffect(() => {
    if (selectedIds.size > 0) {
      track("oneledger_scan_completed", {
        score: result.score,
        riskLevel: result.riskLevel,
        topRisks: result.topRisks,
        recommendedModuleIds: result.recommendedModuleIds,
        selectedQuestionIds: Array.from(selectedIds),
      });
    }
  }, [result.score, result.riskLevel, result.topRisks, result.recommendedModuleIds, selectedIds]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const riskLabel = {
    low: "Thấp",
    medium: "Trung bình",
    high: "Cao",
    critical: "Nghiêm trọng",
  }[result.riskLevel];

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{scanConfig.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{scanConfig.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          {scanConfigWithVariant.questions.map((q) => {
            const active = selectedIds.has(q.id);
            return (
              <Button
                key={q.id}
                variant={active ? "default" : "outline"}
                className="justify-start text-left"
                onClick={() => toggle(q.id)}
              >
                <span className="mr-2 text-xs font-medium text-muted-foreground">{active ? "✓" : "•"}</span>
                {q.label}
              </Button>
            );
          })}
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Ledger Risk Score</span>
            <span>{result.score}/100</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="secondary">Mức độ rủi ro: {riskLabel}</Badge>
            {result.topRisks.map((risk) => (
              <Badge key={risk} variant="outline">
                {risk}
              </Badge>
            ))}
          </div>
          {result.insights.length > 0 && (
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              {result.insights.map((insight, idx) => (
                <p key={idx}>• {insight}</p>
              ))}
            </div>
          )}
          {result.recommendedGateId && (
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">Gate đề xuất: </span>
              <Badge variant="outline" className="text-xs">
                {result.recommendedGateId}
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2 rounded-lg border p-3">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Module đề xuất</span>
            <span className="text-primary">
              {result.recommendedModuleIds.length > 0 ? `${result.recommendedModuleIds.length} modules` : "Chưa có"}
            </span>
          </div>
          {result.recommendedModuleIds.length > 0 ? (
            <div className="space-y-2">
              {result.recommendedModuleIds.slice(0, 4).map((mid) => {
                const module = modules.find((m) => m.id === mid);
                return (
                  <div key={mid} className="flex items-center justify-between gap-2 rounded border p-2">
                    <div className="flex-1">
                      <Badge variant="outline" className="mr-2">
                        {mid}
                      </Badge>
                      <span className="text-sm">{module?.name || mid}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          scrollToModuleCard(mid, { highlight: true });
                          onJumpToModule?.(mid);
                          track("oneledger_jump_to_module", {
                            moduleId: mid,
                            fromSection: "hero_scan",
                          });
                        }}
                      >
                        Jump
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          onOpenModuleDialog?.(mid);
                          track("oneledger_module_opened", {
                            moduleId: mid,
                            source: "hero_recommend",
                          });
                        }}
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Chọn tình trạng để nhận gợi ý module.</p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1"
            onClick={() =>
              onOpenCta?.({
                source: "hero_scan_submit",
                scan: {
                  selectedQuestionIds: Array.from(selectedIds),
                  score: result.score,
                  riskLevel: result.riskLevel,
                  topRisks: result.topRisks,
                  recommendedModuleIds: result.recommendedModuleIds,
                  recommendedGateId: result.recommendedGateId,
                },
              })
            }
          >
            Gửi kết quả & đặt lịch khảo sát
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => onOpenCta?.({ source: "hero-checklist" })}>
            Nhận checklist dữ liệu cần chuẩn bị
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

