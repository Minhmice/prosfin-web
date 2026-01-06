"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServicePageConfig } from "@/content/services/types";

interface SymptomsStickyRevealProps {
  config: ServicePageConfig;
  onJumpToModule?: (moduleId: string) => void;
}

export function SymptomsStickyReveal({ config, onJumpToModule }: SymptomsStickyRevealProps) {
  const panels = config.symptoms || [];
  const [activeId, setActiveId] = useState(panels[0]?.id);

  const activePanel = useMemo(
    () => panels.find((p) => p.id === activeId) || panels[0],
    [panels, activeId]
  );

  if (panels.length === 0) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="sticky top-28 space-y-3 rounded-xl border bg-card/50 p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Symptoms → Root causes</p>
          <h3 className="text-xl font-semibold">{activePanel.symptom}</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-semibold">Impact</p>
              <p className="text-muted-foreground">{activePanel.impact}</p>
            </div>
            <div>
              <p className="font-semibold">Root cause</p>
              <p className="text-muted-foreground">{activePanel.rootCause}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {activePanel.modules.map((m) => (
                <Button key={m} size="sm" variant="secondary" onClick={() => onJumpToModule?.(m)}>
                  Xem module {m}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:col-span-8">
        {panels.map((panel) => (
          <Card
            key={panel.id}
            className={`cursor-pointer transition ${panel.id === activeId ? "border-primary shadow-md" : ""}`}
            onMouseEnter={() => setActiveId(panel.id)}
            onClick={() => setActiveId(panel.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{panel.symptom}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Impact: {panel.impact}</p>
              <p>Root: {panel.rootCause}</p>
              <div className="flex flex-wrap gap-2">
                {panel.modules.map((m) => (
                  <Button
                    key={m}
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToModule?.(m);
                    }}
                  >
                    Jump {m}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

