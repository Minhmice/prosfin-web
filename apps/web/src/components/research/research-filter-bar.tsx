"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
// Using native select for now - can be replaced with shadcn Select wrapper later
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import type { ResearchFacets } from "@/lib/research/facets";
import {
  getTypeLabel,
  getTopicLabel,
  getPersonaLabel,
  getOutcomeLabel,
} from "@/lib/research/facets";
import type { ResearchFilters } from "@/lib/research/params";
import { parseSearchParams, buildSearchParams } from "@/lib/research/params";

interface ResearchFilterBarProps {
  facets: ResearchFacets;
  initialFilters: ResearchFilters;
}

/**
 * ResearchFilterBar - Filter bar with chips, search, and sort
 * 
 * Features:
 * - Chips for Type / Topic / Persona / Outcome
 * - Search input (q)
 * - Sort dropdown
 * - Clear filters button
 * - Sticky on scroll
 * - URL sync
 */
export function ResearchFilterBar({
  facets,
  initialFilters,
}: ResearchFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(initialFilters.q || "");

  const currentFilters = React.useMemo(() => {
    return parseSearchParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const updateFilter = (key: keyof ResearchFilters, value?: string) => {
    const newFilters: ResearchFilters = { ...currentFilters };
    if (value) {
      if (key === "sort" && (value === "latest" || value === "updated" || value === "popular")) {
        newFilters[key] = value;
      } else if (key !== "sort") {
        newFilters[key] = value;
      }
    } else {
      delete newFilters[key];
    }
    const params = buildSearchParams(newFilters);
    router.replace(`/insights${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.replace("/research");
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
    currentFilters.type ||
    currentFilters.topic ||
    currentFilters.persona ||
    currentFilters.outcome ||
    currentFilters.q;

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-4">
          {/* Search and Sort */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9"
              />
            </div>
            <select
              value={currentFilters.sort || "latest"}
              onChange={(e) =>
                updateFilter("sort", e.target.value === "latest" ? undefined : e.target.value)
              }
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:w-[180px]"
            >
              <option value="latest">Mới nhất</option>
              <option value="updated">Cập nhật gần đây</option>
              <option value="popular">Phổ biến</option>
            </select>
          </div>

          {/* Filter chips */}
          <div className="space-y-3">
            {/* Type chips */}
            {facets.types.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Loại:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.types.map((type) => {
                    const isActive = currentFilters.type === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          updateFilter("type", isActive ? undefined : type)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getTypeLabel(type)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Topic chips */}
            {facets.topics.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Chủ đề:
                </div>
                <div className="flex flex-wrap gap-2">
                  {facets.topics.map((topic) => {
                    const isActive = currentFilters.topic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() =>
                          updateFilter("topic", isActive ? undefined : topic)
                        }
                      >
                        <AppBadge
                          variant={isActive ? "default" : "outline"}
                          className="cursor-pointer"
                        >
                          {getTopicLabel(topic)}
                        </AppBadge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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

