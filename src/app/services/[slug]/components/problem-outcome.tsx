import * as React from "react";
import { H2, Text } from "@/components/shared";

export function ProblemOutcomeSection({
  problems,
  outcomes,
}: {
  problems: string[];
  outcomes: string[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="max-w-2xl">
        <H2 className="mb-4">Vấn đề bạn đang gặp</H2>
        <ul className="space-y-3">
          {problems.map((problem, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 text-destructive" aria-hidden="true">
                •
              </span>
              <Text as="span" variant="body">
                {problem}
              </Text>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-2xl">
        <H2 className="mb-4">Sau khi hoàn thành gói, bạn sẽ...</H2>
        <ul className="space-y-3">
          {outcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 text-primary" aria-hidden="true">
                ✓
              </span>
              <Text as="span" variant="body">
                {outcome}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


