/**
 * ServicesResultsHeader - Results header bar
 * 
 * Search input, sort dropdown, active filters, result count, compare button.
 */

"use client";

import * as React from "react";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/inputs/search-input";
import { ServicesActiveFilters } from "./services-active-filters";
import type { ExplorerFilters } from "@/lib/services-explorer/params";
import { cn } from "@/lib/utils";

interface ServicesResultsHeaderProps {
  filters: ExplorerFilters;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onSortChange: (sort?: ExplorerFilters["sort"]) => void;
  onRemoveFilter: (key: keyof ExplorerFilters) => void;
  onResetAll: () => void;
  onOpenCompare: () => void;
  className?: string;
}

/**
 * ServicesResultsHeader - Results header component
 */
export function ServicesResultsHeader({
  filters,
  resultCount,
  onSearchChange,
  onSortChange,
  onRemoveFilter,
  onResetAll,
  onOpenCompare,
  className,
}: ServicesResultsHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Top row: Search + Sort + Compare */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <SearchInput
            placeholder="Tìm kiếm dịch vụ..."
            defaultValue={filters.query}
            onSearchChange={onSearchChange}
            debounceMs={300}
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filters.sort || "recommended"}
            onChange={(e) =>
              onSortChange(
                e.target.value === "recommended"
                  ? undefined
                  : (e.target.value as ExplorerFilters["sort"])
              )
            }
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="recommended">Đề xuất</option>
            <option value="latest">Mới nhất</option>
            <option value="a-z">A-Z</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCompare}
            className="gap-2"
          >
            <Scale className="h-4 w-4" />
            So sánh
          </Button>
        </div>
      </div>

      {/* Active filters + Result count */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <ServicesActiveFilters
          filters={filters}
          onRemoveFilter={onRemoveFilter}
          onResetAll={onResetAll}
        />
        <div className="text-sm text-muted-foreground">
          Tìm thấy <span className="font-semibold text-foreground">{resultCount}</span> dịch vụ
        </div>
      </div>
    </div>
  );
}

