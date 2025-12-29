"use client";

import * as React from "react";
import { ProsfinSectionWrapper, ProsfinSectionHeading, ProsfinPrimaryButton, ProsfinLinkButton } from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import type { DifferentiationContent } from "@/data/services/cleardata";

export interface DifferentiationSectionProps {
  content: DifferentiationContent;
}

/**
 * DifferentiationSection - Comparison table section
 */
export function DifferentiationSection({ content }: DifferentiationSectionProps) {
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

        {/* Comparison Table */}
        <div className="bg-muted border-2 border-border rounded-2xl overflow-hidden mb-8 mt-12">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-foreground text-background">
            <div className="px-8 py-5 border-r border-background/20">
              <h3 className="text-lg font-semibold">Kế toán dịch vụ thông thường</h3>
            </div>
            <div className="px-8 py-5">
              <h3 className="text-lg font-semibold">
                ProsFIN ClearData<sup className="text-xs">TM</sup>
              </h3>
            </div>
          </div>

          {/* Rows */}
          {content.comparisonRows.map((row, index) => (
            <div key={index} className={index < content.comparisonRows.length - 1 ? "border-b border-border" : ""}>
              <div className="px-6 py-4 bg-muted/50 border-b border-border">
                <h4 className="text-sm font-semibold">{row.category}</h4>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-8 py-5 border-r border-border bg-background">
                  <p className="text-sm text-muted-foreground">{row.traditional}</p>
                </div>
                <div className="px-8 py-5 bg-card">
                  <p className="text-sm font-medium">{row.cleardata}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inline CTA Strip */}
        <div className="bg-muted border border-border rounded-xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{content.inlineCtaTitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <ProsfinPrimaryButton>{content.inlineCtaPrimaryLabel}</ProsfinPrimaryButton>
            <ProsfinLinkButton>{content.inlineCtaSecondaryLabel}</ProsfinLinkButton>
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

