import * as React from "react";
import { H2, Text } from "@/components/shared";

export type ServiceStep = {
  title: string;
  description: string;
  deliverables: string[];
};

export function StepsSection({ steps }: { steps: ServiceStep[] }) {
  return (
    <div>
      <H2 className="mb-8">Chi tiết nội dung gói</H2>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-label={`Bước ${idx + 1}`}
              >
                {idx + 1}
              </span>
              <Text as="p" variant="large">
                {step.title}
              </Text>
            </div>
            <Text as="p" variant="lead" className="mb-4 text-muted-foreground">
              {step.description}
            </Text>
            <div>
              <Text as="p" variant="muted" className="mb-2 font-medium">
                Deliverables:
              </Text>
              <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                {step.deliverables.map((deliverable, i) => (
                  <li key={i}>{deliverable}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


