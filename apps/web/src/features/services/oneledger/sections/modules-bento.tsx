"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServicePageConfig, ModuleConfig } from "@/content/services/types";
import { ModuleDetailDialog } from "../components/module-detail-dialog";

interface ModulesBentoProps {
  config: ServicePageConfig;
  onOpenCta?: (payload?: Record<string, unknown>) => void;
}

export function ModulesBento({ config, onOpenCta }: ModulesBentoProps) {
  const [active, setActive] = useState<ModuleConfig | undefined>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Finance OS Modules</p>
        <h2 className="text-2xl font-semibold">8 modules • Bento grid</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {config.modules.map((module) => (
          <Card
            key={module.id}
            id={`module-${module.id}`}
            data-module-id={module.id}
            className="flex h-full flex-col justify-between"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{module.tag}</Badge>
                <span className="text-xs text-muted-foreground">{module.id}</span>
              </div>
              <CardTitle className="text-xl">{module.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{module.promise}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <Section label="Outcomes" items={module.outcomes} />
              <Section label="Deliverables" items={module.deliverables} />
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setActive(module)}>
                  Xem chi tiết
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    onOpenCta?.({
                      source: "module-cta",
                      sourceDetail: `module_dialog:${module.id}`,
                      moduleId: module.id,
                    })
                  }
                >
                  Đặt lịch khảo sát
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleDetailDialog
        open={Boolean(active)}
        onOpenChange={(o) => !o && setActive(undefined)}
        module={active}
        onOpenCta={onOpenCta}
      />
    </div>
  );
}

function Section({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

