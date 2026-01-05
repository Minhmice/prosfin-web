/**
 * ServicesPresets - Horizontal preset bar
 * 
 * Displays preset cards and applies filters on click with analytics tracking.
 */

"use client";

import * as React from "react";
import type { ServicePreset } from "@/data/service-presets";
import { SERVICE_PRESETS } from "@/data/service-presets";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ServicesPresetsProps {
  onPresetClick: (preset: ServicePreset) => void;
  className?: string;
}

/**
 * ServicesPresets - Preset bar component
 */
export function ServicesPresets({
  onPresetClick,
  className,
}: ServicesPresetsProps) {
  const handlePresetClick = (preset: ServicePreset) => {
    trackEvent("services_preset_applied", {
      preset_id: preset.id,
      preset_label: preset.label,
    });
    onPresetClick(preset);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Tìm nhanh theo nhu cầu:
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {SERVICE_PRESETS.map((preset) => (
          <Card
            key={preset.id}
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => handlePresetClick(preset)}
          >
            <CardContent className="p-4">
              <h4 className="mb-1 text-sm font-semibold">{preset.label}</h4>
              {preset.description && (
                <p className="text-xs text-muted-foreground">
                  {preset.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

