"use client";

import * as React from "react";
import { ServicesResults } from "./discovery/services-results";
import { ServiceFinderDialog } from "./discovery/service-finder-dialog";

interface ServicesResultsWrapperProps {
  services: Service[];
  mode?: "recommended" | "all";
  searchParams: URLSearchParams;
}

/**
 * ServicesResultsWrapper - Client wrapper for ServicesResults
 * 
 * Handles wizard dialog state for empty state
 */
export function ServicesResultsWrapper({
  services,
  mode,
  searchParams,
}: ServicesResultsWrapperProps) {
  const [wizardOpen, setWizardOpen] = React.useState(false);

  return (
    <>
      <ServicesResults
        services={services}
        mode={mode}
        searchParams={searchParams}
        onOpenWizard={() => setWizardOpen(true)}
      />
      <ServiceFinderDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
      />
    </>
  );
}

