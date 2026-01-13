"use client";

import * as React from "react";
import { Shield, CheckCircle2, Lock, FileText } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinFeatureCardWrapper,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import type { CommitmentsContent } from "@/data/services/cleardata";

export interface CommitmentsSectionProps {
  content: CommitmentsContent;
}

const commitmentIcons = [
  <CheckCircle2 className="w-8 h-8" />,
  <FileText className="w-8 h-8" />,
  <Lock className="w-8 h-8" />,
  <FileText className="w-8 h-8" />,
];

/**
 * CommitmentsSection - Commitments when implementing
 */
export function CommitmentsSection({ content }: CommitmentsSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="default" padding="default">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <ProsfinSectionHeading
          title={content.title}
          subtitle={content.subheadline}
          titleSize="xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {content.cards.map((card, index) => (
            <ProsfinFeatureCardWrapper
              key={index}
              title={card.title}
              description={card.description}
              icon={commitmentIcons[index]}
              centerAlign={true}
              variant="default"
            />
          ))}
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

