/**
 * ServicesFilterPanel - Sticky left filter panel
 * 
 * Primary facets: Audience, Goal, Format (single select)
 * Secondary: Tags (multi-select chips)
 */

"use client";

import * as React from "react";
import { FilterChip } from "@/components/shared/chips/filter-chip";
import type { ExplorerFilters } from "@/lib/services-explorer/params";
import type { ExplorerFacets } from "@/lib/services-explorer/facets";
import { cn } from "@/lib/utils";

interface ServicesFilterPanelProps {
  facets: ExplorerFacets;
  filters: ExplorerFilters;
  onFilterChange: (key: keyof ExplorerFilters, value?: string | string[]) => void;
  className?: string;
}

/**
 * ServicesFilterPanel - Filter panel component
 */
export function ServicesFilterPanel({
  facets,
  filters,
  onFilterChange,
  className,
}: ServicesFilterPanelProps) {
  const handleAudienceClick = (value: string) => {
    onFilterChange("audience", filters.audience === value ? undefined : value);
  };

  const handleGoalClick = (value: string) => {
    onFilterChange("goal", filters.goal === value ? undefined : value);
  };

  const handleFormatClick = (value: string) => {
    onFilterChange("format", filters.format === value ? undefined : value);
  };

  const handleTagClick = (value: string) => {
    const currentTags = filters.tag || [];
    const newTags = currentTags.includes(value)
      ? currentTags.filter((t) => t !== value)
      : [...currentTags, value];
    onFilterChange("tag", newTags.length > 0 ? newTags : undefined);
  };

  return (
    <aside
      className={cn(
        "sticky top-24 hidden h-fit w-80 space-y-6 lg:block",
        className
      )}
    >
      {/* Audience */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Đối tượng</h3>
        <div className="flex flex-wrap gap-2">
          {facets.audiences.map((audience) => (
            <FilterChip
              key={audience.value}
              label={audience.label}
              active={filters.audience === audience.value}
              count={audience.count}
              onClick={() => handleAudienceClick(audience.value)}
            />
          ))}
        </div>
      </div>

      {/* Goal */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Mục tiêu</h3>
        <div className="flex flex-wrap gap-2">
          {facets.goals.map((goal) => (
            <FilterChip
              key={goal.value}
              label={goal.label}
              active={filters.goal === goal.value}
              count={goal.count}
              onClick={() => handleGoalClick(goal.value)}
            />
          ))}
        </div>
      </div>

      {/* Format */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Hình thức</h3>
        <div className="flex flex-wrap gap-2">
          {facets.formats.map((format) => (
            <FilterChip
              key={format.value}
              label={format.label}
              active={filters.format === format.value}
              count={format.count}
              onClick={() => handleFormatClick(format.value)}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {facets.tags.map((tag) => (
            <FilterChip
              key={tag.value}
              label={tag.label}
              active={filters.tag?.includes(tag.value) ?? false}
              count={tag.count}
              onClick={() => handleTagClick(tag.value)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

