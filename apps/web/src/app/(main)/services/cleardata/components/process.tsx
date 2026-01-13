"use client";

import * as React from "react";
import Image from "next/image";
import { Shield, ArrowRight } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinBadge,
  ProsfinProcessCardWrapper,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { processImage } from "./stock-images";
import type { ProcessContent } from "@/data/services/cleardata";

export interface ProcessSectionProps {
  content: ProcessContent;
}

/**
 * ProcessSection - 3-step process section
 */
export function ProcessSection({ content }: ProcessSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="default" padding="default">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`transition-opacity flex flex-col gap-8 duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <ProsfinSectionHeading
          title={content.title}
          subtitle={content.subheadline}
          titleSize="xl"
        />

        {/* Process Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={processImage}
            alt="Quy trình triển khai ClearData"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>

        {/* Stepper - 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.steps.map((step, index) => (
            <ProsfinProcessCardWrapper
              key={index}
              stepNumber={step.number}
              title={step.title}
              bullets={step.bullets}
              outputTag={step.outputTag}
              stepNumberPosition="right"
              variant="bordered-muted"
            />
          ))}
        </div>

        {/* Assurance Bar */}
        <div className="bg-foreground text-background rounded-xl px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-10 h-10" />
            <h3 className="text-lg font-semibold">{content.assuranceTitle}</h3>
          </div>
          <p className="text-base mb-4">{content.assuranceText}</p>
          <div className="flex flex-wrap items-center gap-3">
            {content.assuranceBadges.map((badge, index) => (
              <ProsfinBadge key={index} variant="secondary">
                {badge}
              </ProsfinBadge>
            ))}
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

