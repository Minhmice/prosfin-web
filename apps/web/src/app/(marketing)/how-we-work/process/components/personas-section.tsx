import * as React from "react";
import { H2, Text } from "@/components/shared";

type Persona = {
  id: string;
  name: string;
  industry: string;
  size: string;
  journey: { week: string; activity: string; outcome: string }[];
};

export function PersonasSection({ personas }: { personas: Persona[] }) {
  return (
    <div>
      <H2 className="mb-8">Ví dụ hành trình theo persona</H2>
      <div className="space-y-8">
        {personas.map((persona) => (
          <div key={persona.id} className="rounded-lg border bg-card p-6 shadow-sm">
            <Text as="p" variant="large" className="mb-2">
              {persona.name}
            </Text>
            <Text as="p" variant="muted" className="mb-4">
              {persona.industry} • {persona.size}
            </Text>
            <div className="space-y-4">
              {persona.journey.map((step, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <Text as="p" variant="small" className="mb-1">
                    {step.week}
                  </Text>
                  <Text as="p" variant="muted" className="mb-2">
                    {step.activity}
                  </Text>
                  <Text as="p" variant="small" className="text-primary">
                    → {step.outcome}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


