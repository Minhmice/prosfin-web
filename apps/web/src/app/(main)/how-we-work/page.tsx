"use client";

import * as React from "react";
import { processPageContent } from "@/data/process-page";
import {
  ProsfinSectionWrapper,
  ProsfinSectionHeading,
  ProsfinPrimaryButton,
} from "@/components/shared";
import { StepDetailsSection } from "./components/step-details-section";
import { TimelineSection } from "./components/timeline-section";
import { PersonasSection } from "./components/personas-section";
import { ScopeNoteCard } from "./components/scope-note";
import { ProcessFinalCta } from "./components/final-cta";
import { GovernanceSection } from "./components/governance-section";
import { WhatYouNeedSection } from "./components/what-you-need-section";

/**
 * How We Work Page
 * 
 * Trang quy trình làm việc chi tiết với delivery model, governance, và what you need to prepare.
 */
export default function HowWeWorkPage() {
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

      {/* What You Need to Prepare */}
      <ProsfinSectionWrapper>
        <WhatYouNeedSection />
      </ProsfinSectionWrapper>

      {/* Step Details - Scrollytelling */}
      <ProsfinSectionWrapper background="muted">
        <StepDetailsSection stepDetails={stepDetails} />
      </ProsfinSectionWrapper>

      {/* Timeline */}
      <ProsfinSectionWrapper>
        <TimelineSection timelineBlocks={timelineBlocks} />
      </ProsfinSectionWrapper>

      {/* Governance */}
      <ProsfinSectionWrapper background="muted">
        <GovernanceSection />
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

