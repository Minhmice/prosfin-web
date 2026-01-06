"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AcceptanceTimelineProps {
  config: ServicePageConfig;
  onJumpToModule?: (moduleId: string) => void;
  onOpenModuleDialog?: (moduleId: string) => void;
}

export function AcceptanceTimeline({ config, onOpenModuleDialog }: AcceptanceTimelineProps) {
  const gates = config.gates;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Acceptance Gates</p>
        <h2 className="text-2xl font-semibold">Timeline (G0→G4)</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {gates.map((gate) => (
          <Card key={gate.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{gate.id}</Badge>
                <CardTitle className="text-lg">{gate.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <TimelineBlock title="Inputs" items={gate.inputs} />
              <TimelineBlock
                title="ProsFIN actions"
                items={gate.prosfinActions || gate.actions}
              />
              <TimelineBlock title="Deliverables" items={gate.deliverables} />
              <TimelineBlock title="Success" items={gate.successDefinition} />
              {gate.relatedModuleIds && gate.relatedModuleIds.length > 0 && (
                <div>
                  <p className="mb-2 font-semibold text-foreground">Related modules</p>
                  <div className="flex flex-wrap gap-2">
                    {gate.relatedModuleIds.map((moduleId) => (
                      <Badge
                        key={moduleId}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => onOpenModuleDialog?.(moduleId)}
                      >
                        {moduleId}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TimelineBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

