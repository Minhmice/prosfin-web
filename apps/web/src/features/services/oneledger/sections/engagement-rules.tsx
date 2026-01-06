"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EngagementRulesProps {
  config: ServicePageConfig;
}

export function EngagementRules({ config }: EngagementRulesProps) {
  const engagement = config.engagement;
  if (!engagement) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Engagement rules</p>
        <h2 className="text-2xl font-semibold">Fit / Anti-fit + First call agenda</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>We only engage if</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {engagement.fit.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>First call agenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {engagement.agenda.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

