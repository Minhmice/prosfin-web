"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { themePresets } from "@/lib/themes"
import { useThemeAccent } from "./theme-provider"

export function ThemePicker() {
  const { accent, setAccentTheme } = useThemeAccent()

  return (
    <div className="grid grid-cols-5 gap-3">
      {themePresets.map((preset) => {
        const isSelected = accent === preset.id
        return (
          <Tooltip key={preset.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setAccentTheme(preset.id)}
                className={cn(
                  "relative flex h-16 w-full flex-col items-center justify-center gap-1.5 rounded-md border-2 transition-all",
                  isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50"
                )}
                style={{
                  background: preset.brandGradient,
                }}
                aria-label={`Select ${preset.name} theme`}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: `hsl(${preset.primaryHsl})`,
                  }}
                />
                <div
                  className="h-1 w-full rounded-full opacity-50"
                  style={{
                    background: preset.brandGradient,
                  }}
                />
                {isSelected && (
                  <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{preset.name}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}
