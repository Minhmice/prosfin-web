/**
 * ServicesExplorer - Main controller component
 * 
 * Manages filter state, URL sync, and renders all explorer sub-components.
 */

"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Service } from "@/types/content";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ServicesPresets } from "./services-presets";
import { ServicesFilterPanel } from "./services-filter-panel";
import { ServicesResultsHeader } from "./services-results-header";
import { ServicesResultsGrid } from "./services-results-grid";
import { ServicesCompareTray } from "./services-compare-tray";
import { ServicesCompareDrawer } from "./services-compare-drawer";
import { ServicesRecommended } from "./services-recommended";
import {
  parseExplorerParams,
  buildExplorerParams,
  type ExplorerFilters,
} from "@/lib/services-explorer/params";
import { filterServices } from "@/lib/services-explorer/filter";
import { getExplorerFacets } from "@/lib/services-explorer/facets";
import { trackEvent } from "@/lib/analytics";
import type { ServicePreset } from "@/data/service-presets";

interface ServicesExplorerProps {
  initialServices: Service[];
  initialFilters?: ExplorerFilters;
}

/**
 * ServicesExplorer - Main explorer component
 */
export function ServicesExplorer({
  initialServices,
  initialFilters,
}: ServicesExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [compareOpen, setCompareOpen] = React.useState(false);

  // Parse current filters from URL
  const currentFilters = React.useMemo(() => {
    return parseExplorerParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  // Get facets from services
  const facets = React.useMemo(() => {
    return getExplorerFacets(initialServices);
  }, [initialServices]);

  // Filter services
  const filteredServices = React.useMemo(() => {
    return filterServices(initialServices, currentFilters);
  }, [initialServices, currentFilters]);

  // Update URL with new filters
  const updateFilters = React.useCallback(
    (newFilters: ExplorerFilters) => {
      const params = buildExplorerParams(newFilters);
      const newUrl = `/services?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
      trackEvent("services_filter_changed", {
        filters: newFilters,
      });
    },
    [router]
  );

  // Handle filter change
  const handleFilterChange = (
    key: keyof ExplorerFilters,
    value?: string | string[]
  ) => {
    const newFilters: ExplorerFilters = {
      ...currentFilters,
      [key]: value,
    };
    updateFilters(newFilters);
  };

  // Handle preset click
  const handlePresetClick = (preset: ServicePreset) => {
    updateFilters(preset.filters);
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    handleFilterChange("query", query || undefined);
  };

  // Handle sort change
  const handleSortChange = (sort?: ExplorerFilters["sort"]) => {
    handleFilterChange("sort", sort);
  };

  // Handle remove filter
  const handleRemoveFilter = (key: keyof ExplorerFilters) => {
    handleFilterChange(key, undefined);
  };

  // Handle reset all
  const handleResetAll = () => {
    updateFilters({});
  };

  // Handle compare change
  const handleCompareChange = () => {
    // Force re-render to update compare tray
    setCompareOpen(false);
  };

  return (
    <>
      <ProsfinSectionWrapper>
        <ServicesPresets onPresetClick={handlePresetClick} />
      </ProsfinSectionWrapper>

      <ProsfinSectionWrapper background="muted">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filter Panel */}
          <ServicesFilterPanel
            facets={facets}
            filters={currentFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            <ServicesResultsHeader
              filters={currentFilters}
              resultCount={filteredServices.length}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
              onRemoveFilter={handleRemoveFilter}
              onResetAll={handleResetAll}
              onOpenCompare={() => setCompareOpen(true)}
            />

            {/* Recommended (if filters active) */}
            {Object.keys(currentFilters).length > 0 && (
              <ServicesRecommended
                services={filteredServices}
                preset={
                  Object.keys(currentFilters).length > 0
                    ? ({ filters: currentFilters } as ServicePreset)
                    : undefined
                }
                limit={3}
              />
            )}

            {/* Results Grid */}
            <ServicesResultsGrid services={filteredServices} />
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Compare Tray */}
      <ServicesCompareTray onOpenCompare={() => setCompareOpen(true)} />

      {/* Compare Drawer */}
      <ServicesCompareDrawer
        open={compareOpen}
        onOpenChange={setCompareOpen}
      />
    </>
  );
}

