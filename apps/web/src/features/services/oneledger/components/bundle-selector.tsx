/**
 * Bundle Selector
 * 
 * Tabs/Segmented control for selecting module bundles.
 * Displays Who/Outcomes/Deliverables/Timeframe for each bundle.
 */

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Bundle, ModuleConfig } from "@/content/services/types";
import { ModuleDetailDialog } from "./module-detail-dialog";

interface BundleSelectorProps {
  bundles: Bundle[];
  modules: ModuleConfig[];
  onSelectBundle?: (bundleId: string) => void;
  onOpenCta?: (payload?: Record<string, unknown>) => void;
  onOpenModuleDialog?: (module: ModuleConfig) => void;
}

export function BundleSelector({
  bundles,
  modules,
  onSelectBundle,
  onOpenCta,
  onOpenModuleDialog,
}: BundleSelectorProps) {
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleConfig | undefined>();

  if (!bundles || bundles.length === 0) return null;

  const handleSelectBundle = (bundleId: string) => {
    setSelectedBundleId(bundleId);
    onSelectBundle?.(bundleId);
  };

  const handleOpenModule = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      setActiveModule(module);
      setModuleDialogOpen(true);
      onOpenModuleDialog?.(module);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Chọn Bundle phù hợp</CardTitle>
          <p className="text-sm text-muted-foreground">
            Mỗi bundle gồm các module được thiết kế để giải quyết một nhóm vấn đề cụ thể.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={bundles[0]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {bundles.map((bundle) => (
                <TabsTrigger key={bundle.id} value={bundle.id} className="text-xs">
                  {bundle.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {bundles.map((bundle) => (
              <TabsContent key={bundle.id} value={bundle.id} className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Phù hợp cho</h3>
                    <div className="flex flex-wrap gap-2">
                      {bundle.bestFor.map((item, idx) => (
                        <Badge key={idx} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Kết quả đạt được</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {bundle.outcomes.map((outcome, idx) => (
                        <li key={idx}>• {outcome}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Deliverables</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {bundle.deliverables.slice(0, 3).map((deliverable, idx) => (
                        <li key={idx}>• {deliverable}</li>
                      ))}
                    </ul>
                  </div>

                  {bundle.timeframe && (
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Thời gian</h3>
                      <p className="text-sm text-muted-foreground">{bundle.timeframe}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Modules trong bundle</h3>
                    <div className="flex flex-wrap gap-2">
                      {bundle.moduleIds.map((moduleId) => {
                        const module = modules.find((m) => m.id === moduleId);
                        return (
                          <Button
                            key={moduleId}
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenModule(moduleId)}
                          >
                            {module?.name || moduleId}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleSelectBundle(bundle.id);
                        onOpenCta?.({
                          sourceDetail: `bundle_select:${bundle.id}`,
                          bundleId: bundle.id,
                        });
                      }}
                    >
                      Đặt lịch khảo sát cho bundle này
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <ModuleDetailDialog
        open={moduleDialogOpen}
        onOpenChange={setModuleDialogOpen}
        module={activeModule}
        onOpenCta={onOpenCta}
      />
    </>
  );
}

