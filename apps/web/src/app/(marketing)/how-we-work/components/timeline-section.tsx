import * as React from "react";
import { H2, Text } from "@/components/shared";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";

type TimelineBlock = {
  period: string;
  activities: string[];
  deliverables: string[];
};

export function TimelineSection({ timelineBlocks }: { timelineBlocks: TimelineBlock[] }) {
  return (
    <RevealOnScroll direction="up" delay={0}>
      <div>
        <H2 className="mb-8">Timeline dự kiến & cường độ làm việc</H2>
        <div className="space-y-8">
          {timelineBlocks.map((block, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <Text as="p" variant="large" className="mb-4">
                {block.period}
              </Text>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Text as="p" variant="muted" className="mb-2 font-medium">
                    Hoạt động:
                  </Text>
                  <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                    {block.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Text as="p" variant="muted" className="mb-2 font-medium">
                    Deliverables:
                  </Text>
                  <ul className="list-disc space-y-1 pl-6 text-sm leading-relaxed">
                    {block.deliverables.map((deliverable, i) => (
                      <li key={i}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
}


