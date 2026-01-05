/**
 * ServicesActiveFilters - Display active filters as chips
 * 
 * Shows active filters and allows removing them individually or resetting all.
 */

"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterChip } from "@/components/shared/chips/filter-chip";
import type { ExplorerFilters } from "@/lib/services-explorer/params";
import { cn } from "@/lib/utils";

interface ServicesActiveFiltersProps {
  filters: ExplorerFilters;
  onRemoveFilter: (key: keyof ExplorerFilters) => void;
  onResetAll: () => void;
  className?: string;
}

/**
 * ServicesActiveFilters - Active filters display
 */
export function ServicesActiveFilters({
  filters,
  onRemoveFilter,
  onResetAll,
  className,
}: ServicesActiveFiltersProps) {
  const activeFilters: Array<{ key: keyof ExplorerFilters; label: string; value: string }> = [];

  if (filters.query) {
    activeFilters.push({ key: "query", label: "Tìm kiếm", value: filters.query });
  }
  if (filters.audience) {
    const labels: Record<string, string> = {
      owner: "Chủ DN",
      finance_team: "Đội ngũ tài chính",
      hiring: "Tuyển dụng",
    };
    activeFilters.push({
      key: "audience",
      label: "Đối tượng",
      value: labels[filters.audience] || filters.audience,
    });
  }
  if (filters.goal) {
    const labels: Record<string, string> = {
      profit: "Lợi nhuận",
      cashflow: "Dòng tiền",
      tax: "Thuế",
      risk: "Rủi ro",
      compliance: "Tuân thủ",
    };
    activeFilters.push({
      key: "goal",
      label: "Mục tiêu",
      value: labels[filters.goal] || filters.goal,
    });
  }
  if (filters.format) {
    const labels: Record<string, string> = {
      advisory: "Cố vấn",
      consulting: "Tư vấn",
      coaching: "Coaching",
      test: "Đánh giá",
      audit: "Kiểm toán",
    };
    activeFilters.push({
      key: "format",
      label: "Hình thức",
      value: labels[filters.format] || filters.format,
    });
  }
  if (filters.tag && filters.tag.length > 0) {
    filters.tag.forEach((tag) => {
      activeFilters.push({ key: "tag", label: "Tag", value: tag });
    });
  }
  if (filters.sort) {
    const labels: Record<string, string> = {
      recommended: "Đề xuất",
      latest: "Mới nhất",
      "a-z": "A-Z",
    };
    activeFilters.push({
      key: "sort",
      label: "Sắp xếp",
      value: labels[filters.sort] || filters.sort,
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">Bộ lọc:</span>
      {activeFilters.map((filter, index) => (
        <FilterChip
          key={`${filter.key}-${index}`}
          label={`${filter.label}: ${filter.value}`}
          active={true}
          onClick={() => onRemoveFilter(filter.key)}
        />
      ))}
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetAll}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-3 w-3" />
          Xóa tất cả
        </Button>
      )}
    </div>
  );
}

