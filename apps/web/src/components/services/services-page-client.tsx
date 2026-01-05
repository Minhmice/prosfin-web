"use client";

import * as React from "react";
import { ServicesHero } from "./services-hero";
import { ServiceFinderDialog } from "./discovery/service-finder-dialog";

/**
 * ServicesPageClient - Client wrapper for services page
 * 
 * Handles client-side state for wizard dialog
 */
export function ServicesPageClient() {
  const [wizardOpen, setWizardOpen] = React.useState(false);

  return (
    <>
      <ServicesHero onOpenWizard={() => setWizardOpen(true)} />
      <ServiceFinderDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
      />
    </>
  );
}

/**
 * Hook to get wizard open handler
 * Used by ServicesResults to open wizard from empty state
 */
export function useWizardHandler() {
  const [wizardOpen, setWizardOpen] = React.useState(false);
  return {
    wizardOpen,
    openWizard: () => setWizardOpen(true),
    closeWizard: () => setWizardOpen(false),
  };
}

