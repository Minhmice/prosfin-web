"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommitmentsProps {
  config: ServicePageConfig;
}

export function Commitments({ config }: CommitmentsProps) {
  const items = config.commitments || [];
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Commitments</p>
        <h2 className="text-2xl font-semibold">6 cam kết</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              {item.bullets.map((b) => (
                <p key={b}>• {b}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

