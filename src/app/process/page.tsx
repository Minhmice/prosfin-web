"use client";

import * as React from "react";
import { processPageContent } from "@/data/process-page";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
} from "@/components/shared";
import { ProcessTimelineScroll } from "@/components/shared/animation/process-timeline-scroll";
import { StepDetailsSection } from "./components/step-details-section";
import { TimelineSection } from "./components/timeline-section";
import { PersonasSection } from "./components/personas-section";
import { ScopeNoteCard } from "./components/scope-note";
import { ProcessFinalCta } from "./components/final-cta";

/**
 * Process Page
 * 
 * Trang quy trình làm việc chi tiết.
 */
export default function ProcessPage() {
  const { hero, stepDetails, personas, timelineBlocks, scopeNote } =
    processPageContent;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinSectionHeading
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          align="center"
          titleSize="xl"
        />
        <div className="mt-8 text-center">
          <ProsfinPrimaryButton href={hero.cta.href} size="lg">
            {hero.cta.label}
          </ProsfinPrimaryButton>
        </div>
      </ProsfinSectionWrapper>

      {/* Step Details - Scrollytelling */}
      <ProsfinSectionWrapper>
        <StepDetailsSection stepDetails={stepDetails} />
      </ProsfinSectionWrapper>

      {/* Timeline */}
      <ProsfinSectionWrapper background="muted">
        <TimelineSection timelineBlocks={timelineBlocks} />
      </ProsfinSectionWrapper>

      {/* Personas */}
      <ProsfinSectionWrapper>
        <PersonasSection personas={personas} />
      </ProsfinSectionWrapper>

      {/* Scope Note */}
      <ProsfinSectionWrapper background="muted">
        <div>
          <ScopeNoteCard title={scopeNote.title} content={scopeNote.content} />
        </div>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper>
        <ProcessFinalCta />
      </ProsfinSectionWrapper>
    </>
  );
}

