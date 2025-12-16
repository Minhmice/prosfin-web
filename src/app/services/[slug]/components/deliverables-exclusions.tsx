import * as React from "react";
import { H2 } from "@/components/shared";

export function DeliverablesExclusionsSection({
  deliverables,
  exclusions,
}: {
  deliverables: string[];
  exclusions?: string[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="max-w-2xl">
        <H2 className="mb-4">Deliverables</H2>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          {deliverables.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {exclusions && exclusions.length > 0 && (
        <div className="max-w-2xl">
          <H2 className="mb-4">Không bao gồm</H2>
          <ul className="list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground">
            {exclusions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


