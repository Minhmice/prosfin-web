"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTalentPoolFilters, type TalentPoolFilters } from "@/lib/recruitment/getTalentPool";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TalentPoolFilterBarProps {
  filterOptions: ReturnType<typeof getTalentPoolFilters>;
}

/**
 * TalentPoolFilterBar - Filter bar component cho talent pool
 * 
 * Sync với query params: ?role=...&level=...&skill=...&industry=...&location=...&availability=...
 */
export function TalentPoolFilterBar({ filterOptions }: TalentPoolFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse current filters from query params
  const currentRole = searchParams.get("role") || undefined;
  const currentLevel = searchParams.get("level") as TalentPoolFilters["level"] | null;
  const currentSkills = searchParams.get("skill")?.split(",").filter(Boolean) || [];
  const currentIndustries = searchParams.get("industry")?.split(",").filter(Boolean) || [];
  const currentLocation = searchParams.get("location") || undefined;
  const currentAvailability = searchParams.get("availability") as TalentPoolFilters["availability"] | null;

  const buildUrl = (filters: Partial<TalentPoolFilters>) => {
    const params = new URLSearchParams();
    
    if (filters.roleTitle) params.set("role", filters.roleTitle);
    if (filters.level) params.set("level", filters.level);
    if (filters.skillTags && filters.skillTags.length > 0) {
      params.set("skill", filters.skillTags.join(","));
    }
    if (filters.industryTags && filters.industryTags.length > 0) {
      params.set("industry", filters.industryTags.join(","));
    }
    if (filters.location) params.set("location", filters.location);
    if (filters.availability) params.set("availability", filters.availability);
    
    const queryString = params.toString();
    return `/recruitment/talent-pool${queryString ? `?${queryString}` : ""}`;
  };

  const handleFilterChange = (key: keyof TalentPoolFilters, value: string | string[] | null) => {
    const newFilters: Partial<TalentPoolFilters> = {
      roleTitle: currentRole,
      level: currentLevel || undefined,
      skillTags: currentSkills.length > 0 ? currentSkills : undefined,
      industryTags: currentIndustries.length > 0 ? currentIndustries : undefined,
      location: currentLocation,
      availability: currentAvailability || undefined,
    };

    if (value === null || value === "") {
      delete newFilters[key];
    } else if (key === "skillTags" || key === "industryTags") {
      newFilters[key] = Array.isArray(value) ? value : [value];
    } else {
      newFilters[key] = value as any;
    }

    router.push(buildUrl(newFilters));
  };

  const clearFilters = () => {
    router.push("/recruitment/talent-pool");
  };

  const hasActiveFilters =
    currentRole ||
    currentLevel ||
    currentSkills.length > 0 ||
    currentIndustries.length > 0 ||
    currentLocation ||
    currentAvailability;

  return (
    <div className="sticky top-16 z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Row 1: Role, Level, Location */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 min-w-[200px]">
              <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Vị trí:
              </label>
              <Select
                value={currentRole || ""}
                onValueChange={(value) =>
                  handleFilterChange("roleTitle", value || null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả</SelectItem>
                  {filterOptions.roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label} ({role.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 min-w-[150px]">
              <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Cấp độ:
              </label>
              <Select
                value={currentLevel || ""}
                onValueChange={(value) =>
                  handleFilterChange("level", value || null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả</SelectItem>
                  {filterOptions.levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label} ({level.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 min-w-[150px]">
              <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Địa điểm:
              </label>
              <Select
                value={currentLocation || ""}
                onValueChange={(value) =>
                  handleFilterChange("location", value || null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả</SelectItem>
                  {filterOptions.locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label} ({location.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 min-w-[150px]">
              <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Trạng thái:
              </label>
              <Select
                value={currentAvailability || ""}
                onValueChange={(value) =>
                  handleFilterChange("availability", value || null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả</SelectItem>
                  {filterOptions.availability.map((avail) => (
                    <SelectItem key={avail.value} value={avail.value}>
                      {avail.label} ({avail.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {/* Row 2: Skill Tags & Industry Tags (simplified - can be enhanced with multi-select later) */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Kỹ năng:
            </span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.skillTags.slice(0, 8).map((skill) => {
                const isSelected = currentSkills.includes(skill.value);
                return (
                  <button
                    key={skill.value}
                    onClick={() => {
                      const newSkills = isSelected
                        ? currentSkills.filter((s) => s !== skill.value)
                        : [...currentSkills, skill.value];
                      handleFilterChange("skillTags", newSkills.length > 0 ? newSkills : null);
                    }}
                    className={cn(
                      "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {skill.label} ({skill.count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Ngành:
            </span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.industryTags.map((industry) => {
                const isSelected = currentIndustries.includes(industry.value);
                return (
                  <button
                    key={industry.value}
                    onClick={() => {
                      const newIndustries = isSelected
                        ? currentIndustries.filter((i) => i !== industry.value)
                        : [...currentIndustries, industry.value];
                      handleFilterChange("industryTags", newIndustries.length > 0 ? newIndustries : null);
                    }}
                    className={cn(
                      "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {industry.label} ({industry.count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

