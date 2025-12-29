"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, FileText, BarChart3, TrendingUp } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinBadge,
  ProsfinFeatureCardWrapper,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { parseMarkers } from "@/lib/content/parse-markers";
import { solutionImage } from "./stock-images";
import type { SolutionContent } from "@/data/services/cleardata";

export interface SolutionSectionProps {
  content: SolutionContent;
}

const pillarIcons = [
  <FileText className="h-8 w-8" />,
  <BarChart3 className="h-8 w-8" />,
  <TrendingUp className="h-8 w-8" />,
];

/**
 * SolutionSection - Section giải thích ClearData là gì
 */
export function SolutionSection({ content }: SolutionSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="muted" padding="default">
      <div className="grid grid-cols-12 gap-12">
        {/* Left Column - Definition (7 cols) */}
        <div className="col-span-12 lg:col-span-7">
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`transition-opacity duration-700 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <ProsfinSectionHeading
              eyebrow={content.eyebrow}
              title={parseMarkers(content.title)}
              titleSize="xl"
            />

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {parseMarkers(content.definition)}
            </p>

            {/* Key Outcomes Chips */}
            <div className="flex flex-wrap items-center gap-3">
              {content.keyOutcomes.map((outcome, index) => (
                <ProsfinBadge key={index} variant="default">
                  {outcome}
                </ProsfinBadge>
              ))}
            </div>
            {/* Solution Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl my-8">
              <Image
                src={solutionImage}
                alt="Giải pháp ClearData - Chuẩn hoá và tổ chức dữ liệu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Image + 3 Pillars (5 cols) */}
        <div className="col-span-12 lg:col-span-5">
          <h3 className="text-lg mb-5 font-semibold">{content.pillarsTitle}</h3>

          {/* Pillars Stack */}
          <div className="space-y-5">
            {content.pillars.map((pillar, index) => (
              <ProsfinFeatureCardWrapper
                key={index}
                title={pillar.title}
                description={pillar.description}
                icon={pillarIcons[index]}
                centerAlign={false}
                variant="default"
              />
            ))}
          </div>

          {/* Mini Diagram */}
          <div className="mt-6 flex items-center justify-between px-4">
            {content.diagramSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <div className="text-muted-foreground">
                      {pillarIcons[index]}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{step}</span>
                </div>
                {index < content.diagramSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}
