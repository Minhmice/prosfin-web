"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PeopleGridProps {
  config: ServicePageConfig;
}

export function PeopleGrid({ config }: PeopleGridProps) {
  const slots = config.peopleSlots || [];
  if (!slots.length) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Our People</p>
        <h2 className="text-2xl font-semibold">Đội ngũ triển khai</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {slots.map((slot) => (
          <Card key={slot.role}>
            <CardHeader>
              <CardTitle className="text-lg">{slot.role}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex flex-wrap gap-2">
                {slot.focusTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {slot.proof && <p>Mini proof: {slot.proof}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

