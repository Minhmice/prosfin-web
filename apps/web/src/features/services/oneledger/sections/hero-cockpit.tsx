"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ServicePageConfig } from "@/content/services/types";
import type { Service } from "@/types/content";
import { LedgerScanCard } from "../components/ledger-scan-card";
import { getVariant } from "@/experiments/client-flags";
import { getHeroVariantOverrides } from "../experiments/variants";

interface HeroCockpitProps {
  config: ServicePageConfig;
  service: Service;
  onOpenCta: (payload?: Record<string, unknown>) => void;
  onScrollToSection?: (id: string) => void;
  onJumpToModule?: (id: string) => void;
  onOpenModuleDialog?: (moduleId: string) => void;
}

export function HeroCockpit({
  config,
  service,
  onOpenCta,
  onScrollToSection,
  onJumpToModule,
  onOpenModuleDialog,
}: HeroCockpitProps) {
  // Phase 6: Get hero variant from experiment
  const heroVariant = getVariant("oneledger_hero_value_prop");
  const heroOverrides = heroVariant ? getHeroVariantOverrides(heroVariant) : {};

  const hero = {
    ...config.hero,
    h1: heroOverrides.h1 || config.hero.h1 || config.hero.headline,
    subhead: heroOverrides.subhead || config.hero.subhead,
  };
  const scanConfig = config.scan;
  const proofSlots = hero.proofSlots || [];

  const deliverablesId = useMemo(
    () => config.sections.find((s) => s.type === "deliverablesTabs")?.id || "s6-deliverables",
    [config.sections]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">ProsFIN • {service.title}</p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            {hero.h1 || hero.headline}
          </h1>
          <p className="text-lg text-muted-foreground">{hero.subhead}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {hero.chips.map((chip, idx) => {
            const key = typeof chip === "string" ? chip : chip.key;
            const label = typeof chip === "string" ? chip : chip.label;
            return (
              <Badge key={key || idx} variant="secondary">
                {label}
              </Badge>
            );
          })}
        </div>

        {hero.ctas && hero.ctas.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {hero.ctas.map((cta, idx) => {
              const handleClick = () => {
                if (cta.action === "openCtaModal") {
                  // Phase 4: Use sourceDetail mapping
                  const sourceDetail = idx === 0 ? "hero_primary" : cta.source || `hero-cta-${idx}`;
                  onOpenCta({ sourceDetail, source: cta.source || `hero-cta-${idx}` });
                } else if (cta.action === "scrollTo" && cta.targetId) {
                  onScrollToSection?.(cta.targetId);
                } else if (cta.action === "openTools") {
                  onScrollToSection?.("ledger-scan-card");
                }
              };
              const variant = idx === 0 ? "default" : idx === 1 ? "secondary" : "ghost";
              return (
                <Button key={idx} variant={variant} onClick={handleClick}>
                  {cta.label}
                </Button>
              );
            })}
          </div>
        )}

        <p className="text-sm text-muted-foreground">{hero.trustLine}</p>
        <Separator />
        <div className="grid gap-2 sm:grid-cols-3">
          {proofSlots.map((item, idx) => {
            const key = typeof item === "string" ? item : item.value;
            const label = typeof item === "string" ? item : item.label;
            return (
              <div key={key || idx} className="rounded-lg border p-3 text-sm">
                {label}
              </div>
            );
          })}
        </div>
      </div>

      <div id="ledger-scan-card" className="space-y-4 min-h-[400px]">
        <LedgerScanCard
          scanConfig={scanConfig}
          modules={config.modules}
          onJumpToModule={onJumpToModule}
          onOpenModuleDialog={onOpenModuleDialog}
          onOpenCta={onOpenCta}
        />
      </div>
    </div>
  );
}

