"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinScopeCardWrapper,
} from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { parseMarkers } from "@/lib/content/parse-markers";
import type { ScopeContent } from "@/data/services/cleardata";

export interface ScopeSectionProps {
  content: ScopeContent;
}

/**
 * ScopeSection - What's included section
 */
export function ScopeSection({ content }: ScopeSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="muted" padding="default">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <ProsfinSectionHeading
          title={parseMarkers(content.title)}
          subtitle={content.subheadline}
          titleSize="xl"
        />

        <div className="grid grid-cols-12 gap-8 mt-12">
          {/* Left Column - 4 Scope Cards (7 cols) */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.cards.map((card, index) => (
                <ProsfinScopeCardWrapper
                  key={index}
                  title={card.title}
                  items={card.items}
                  icon={<FileText className="w-8 h-8" />}
                  variant="default"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Deliverables Panel (5 cols) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card border-2 border-border rounded-2xl p-6 h-full">
              <h3 className="text-xl mb-6 font-semibold">{content.deliverablesTitle}</h3>

              <ul className="space-y-4 mb-6">
                {content.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  {content.deliverablesNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

