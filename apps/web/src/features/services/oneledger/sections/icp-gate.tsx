"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IcpGateProps {
  config: ServicePageConfig;
}

export function IcpGate({ config }: IcpGateProps) {
  const cards = config.icp?.cards || [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">ICP Gate</p>
        <h2 className="text-2xl font-semibold">This is for you if…</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {card.items.map((item) => (
                <p key={item} className="text-sm text-muted-foreground">
                  • {item}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

