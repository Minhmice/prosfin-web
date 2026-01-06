"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import type { Service } from "@/types/content";
import type { SectionConfig, ServicePageConfig, SectionType } from "@/content/services/types";
import { HeroCockpit } from "../oneledger/sections/hero-cockpit";
import { IcpGate } from "../oneledger/sections/icp-gate";
import { ModulesBento } from "../oneledger/sections/modules-bento";

// Phase 5: Lazy load heavy sections with DOM effects
const SymptomsStickyReveal = dynamic(
  () => import("../oneledger/sections/symptoms-sticky-reveal").then((mod) => ({ default: mod.SymptomsStickyReveal })),
  { ssr: false }
);

const AcceptanceTimeline = dynamic(
  () => import("../oneledger/sections/acceptance-timeline").then((mod) => ({ default: mod.AcceptanceTimeline })),
  { ssr: false }
);
import { DeliverablesTabs } from "../oneledger/sections/deliverables-tabs";
import { Commitments } from "../oneledger/sections/commitments";
import { EngagementRules } from "../oneledger/sections/engagement-rules";
import { FaqAccordion } from "../oneledger/sections/faq-accordion";
import { PeopleGrid } from "../oneledger/sections/people-grid";
import { ThinkingPosts } from "../oneledger/sections/thinking-posts";
import { BigCta } from "../oneledger/sections/big-cta";
import { LeadCtaDialog } from "../oneledger/components/cta-dialog";
import { ModuleDetailDialog } from "../oneledger/components/module-detail-dialog";
import { scrollToAnchor, scrollToModuleCard } from "../oneledger/components/scroll-jump";
import { ToolsDrawer } from "../oneledger/components/tools-drawer";
import type { ModuleConfig } from "@/content/services/types";

interface LedgerCockpitLayoutProps {
  config: ServicePageConfig;
  service: Service;
}

type SectionRenderFn = (args: {
  section: SectionConfig;
  onOpenCta: (payload?: Record<string, unknown>) => void;
  onScrollToSection: (id: string) => void;
  onJumpToModule: (id: string) => void;
  onOpenModuleDialog: (moduleId: string) => void;
}) => React.ReactElement | null;

export function LedgerCockpitLayout({ config, service }: LedgerCockpitLayoutProps) {
  const [ctaOpen, setCtaOpen] = useState(false);
  const [ctaPayload, setCtaPayload] = useState<Record<string, unknown> | undefined>();
  const [activeModule, setActiveModule] = useState<ModuleConfig | undefined>();

  const handleOpenCta = useCallback((payload?: Record<string, unknown>) => {
    setCtaPayload(payload);
    setCtaOpen(true);
  }, []);

  const handleScrollToSection = useCallback((id: string) => {
    scrollToAnchor(id, { highlight: true });
  }, []);

  const handleJumpToModule = useCallback((id: string) => {
    scrollToModuleCard(id, { highlight: true });
  }, []);

  const handleOpenModuleDialog = useCallback((moduleId: string) => {
    const module = config.modules.find((m) => m.id === moduleId);
    setActiveModule(module);
  }, [config.modules]);

  const sectionMap: Partial<Record<SectionType, SectionRenderFn>> = {
    heroCockpit: ({ onOpenCta, onScrollToSection, onJumpToModule, onOpenModuleDialog }) => (
      <HeroCockpit
        config={config}
        service={service}
        onOpenCta={onOpenCta}
        onScrollToSection={onScrollToSection}
        onJumpToModule={onJumpToModule}
        onOpenModuleDialog={onOpenModuleDialog}
      />
    ),
    icpGate: () => <IcpGate config={config} />,
    symptomsSticky: ({ onJumpToModule }) => (
      <SymptomsStickyReveal config={config} onJumpToModule={onJumpToModule} />
    ),
    modulesBento: ({ onOpenCta }) => <ModulesBento config={config} onOpenCta={onOpenCta} />,
    timeline: ({ onOpenModuleDialog }) => (
      <AcceptanceTimeline config={config} onOpenModuleDialog={onOpenModuleDialog} />
    ),
    acceptanceTimeline: ({ onOpenModuleDialog }) => (
      <AcceptanceTimeline config={config} onOpenModuleDialog={onOpenModuleDialog} />
    ),
    deliverablesTabs: () => <DeliverablesTabs config={config} />,
    commitments: () => <Commitments config={config} />,
    engagementRules: () => <EngagementRules config={config} />,
    faq: () => <FaqAccordion config={config} />,
    people: () => <PeopleGrid config={config} />,
    thinking: () => <ThinkingPosts config={config} />,
    bigCta: () => <BigCta config={config} />,
    tools: () => <ToolsDrawer />,
    toolsDrawer: () => <ToolsDrawer />,
  };

  return (
    <div className="space-y-16">
      {config.sections.map((section) => {
        const renderer = sectionMap[section.type];
        if (!renderer) return null;
        return (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 space-y-6 rounded-xl border border-border/60 bg-background/50 p-4 shadow-sm md:p-6"
          >
            {renderer({
              section,
              onOpenCta: handleOpenCta,
              onScrollToSection: handleScrollToSection,
              onJumpToModule: handleJumpToModule,
              onOpenModuleDialog: handleOpenModuleDialog,
            })}
          </section>
        );
      })}

      {config.bigCta && (
        <LeadCtaDialog
          open={ctaOpen}
          onOpenChange={setCtaOpen}
          fields={config.bigCta.step1Fields}
          step2Fields={config.bigCta.step2Fields}
          submitCopy={config.bigCta.submitCopy}
          successMessage={config.bigCta.successMessage}
          payload={ctaPayload}
        />
      )}

      <ModuleDetailDialog
        open={Boolean(activeModule)}
        onOpenChange={(open) => !open && setActiveModule(undefined)}
        module={activeModule}
        onOpenCta={handleOpenCta}
      />
    </div>
  );
}

