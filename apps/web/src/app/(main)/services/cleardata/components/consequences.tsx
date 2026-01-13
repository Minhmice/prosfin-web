"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinProblemCardWrapper,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import type { ConsequencesContent } from "@/data/services/cleardata";

export interface ConsequencesSectionProps {
  content: ConsequencesContent;
}

/**
 * ConsequencesSection - Section về các objections/concerns
 */
export function ConsequencesSection({ content }: ConsequencesSectionProps) {
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {content.cards.map((card, index) => (
            <ProsfinProblemCardWrapper
              key={index}
              title={card.title}
              description={card.description}
              solution={card.solution}
              icon={<AlertTriangle className="w-8 h-8" />}
              variant="default"
            />
          ))}
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

