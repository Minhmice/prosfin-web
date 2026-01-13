"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, BarChart3, TrendingUp, Shield } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinBadge,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { parseMarkers } from "@/lib/content/parse-markers";
import { outcomesImage } from "./stock-images";
import type { OutcomesContent } from "@/data/services/cleardata";

export interface OutcomesSectionProps {
  content: OutcomesContent;
}

const outcomeIcons = [
  <BarChart3 className="w-6 h-6" />,
  <TrendingUp className="w-6 h-6" />,
  <Shield className="w-6 h-6" />,
];

/**
 * OutcomesSection - What you get section
 */
export function OutcomesSection({ content }: OutcomesSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="muted" padding="default">
      <div className="grid grid-cols-12 gap-10">
        {/* Left Column - Outcomes List (7 cols) */}
        <div className="col-span-12 lg:col-span-7">
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`transition-opacity duration-700 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <ProsfinSectionHeading
              title={parseMarkers(content.title)}
              titleSize="xl"
            />

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 mt-6">
              {parseMarkers(content.paragraph)}
            </p>

            <ul className="space-y-4">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-lg">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Outcome Image + Summary Card (5 cols) */}
        <div className="col-span-12 lg:col-span-5">

          <div className="bg-card border-2 border-border rounded-2xl p-7 shadow-md">
            <h3 className="text-xl mb-6 font-semibold text-center">
              {content.snapshotTitle}
            </h3>

            <div className="space-y-5 mb-6">
              {content.blocks.map((block, index) => (
                <div
                  key={index}
                  className={
                    index < content.blocks.length - 1
                      ? "pb-5 border-b border-border"
                      : ""
                  }
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-muted-foreground">
                      {outcomeIcons[index]}
                    </div>
                    <h4 className="text-base font-semibold">{block.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
              {content.kpiTags.map((tag, index) => (
                <ProsfinBadge key={index} variant="default">
                  {tag}
                </ProsfinBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}
