"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import type { ServiceFacets } from "@/lib/services-discovery/facets";
import {
  getPersonaLabel,
  getOutcomeLabel,
  getStageLabel,
  getFormatLabel,
} from "@/lib/services-discovery/facets";
import type { ServiceFilters } from "@/lib/services-discovery/params";
import { parseSearchParams, buildSearchParams } from "@/lib/services-discovery/params";

interface ServicesFilterBarProps {
  facets: ServiceFacets;
  initialFilters: ServiceFilters;
}

/**
 * ServicesFilterBar - Filter bar with chips and search
 * 
 * Features:
 * - Chips for Persona / Outcome / Stage / Format
 * - Search input (q)
 * - Clear filters button
 * - Sticky on desktop
 * - Syncs with URL
 */
export function ServicesFilterBar({
  facets,
  initialFilters,
}: ServicesFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(initialFilters.q || "");

  const currentFilters = React.useMemo(() => {
    return parseSearchParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const updateFilter = (key: keyof ServiceFilters, value?: string) => {
    const newFilters: ServiceFilters = { ...currentFilters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    const params = buildSearchParams(newFilters);
    router.replace(`/services${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.replace("/services");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      updateFilter("q", value.trim());
    } else {
      updateFilter("q", undefined);
    }
  };

  const hasActiveFilters =
    currentFilters.persona ||
    currentFilters.outcome ||
    currentFilters.stage ||
    currentFilters.format ||
    currentFilters.q;

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>

          {/* Filter chips */}
          <div className="space-y-3">
            {/* Persona chips */}
            {facets.personas.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Đối tượng:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.personas.map((persona) => {
                    const isActive = currentFilters.persona === persona;
                    return (
                      <button
                        key={persona}
                        type="button"
                        onClick={() =>
                          updateFilter("persona", isActive ? undefined : persona)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getPersonaLabel(persona)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Outcome chips */}
            {facets.outcomes.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Mục tiêu:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.outcomes.map((outcome) => {
                    const isActive = currentFilters.outcome === outcome;
                    return (
                      <button
                        key={outcome}
                        type="button"
                        onClick={() =>
                          updateFilter("outcome", isActive ? undefined : outcome)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getOutcomeLabel(outcome)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stage chips */}
            {facets.stages.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Giai đoạn:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.stages.map((stage) => {
                    const isActive = currentFilters.stage === stage;
                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() =>
                          updateFilter("stage", isActive ? undefined : stage)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getStageLabel(stage)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Format chips */}
            {facets.formats.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Hình thức:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.formats.map((format) => {
                    const isActive = currentFilters.format === format;
                    return (
                      <button
                        key={format}
                        type="button"
                        onClick={() =>
                          updateFilter("format", isActive ? undefined : format)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getFormatLabel(format)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <ProsfinSecondaryButton onClick={clearFilters} size="sm">
                <X className="mr-2 h-4 w-4" />
                Xóa bộ lọc
              </ProsfinSecondaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

