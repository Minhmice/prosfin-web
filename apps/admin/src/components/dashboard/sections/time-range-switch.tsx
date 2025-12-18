"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export type TimeRange = "7d" | "30d" | "90d"

interface TimeRangeSwitchProps {
  value: TimeRange
  onValueChange: (value: TimeRange) => void
}

export function TimeRangeSwitch({ value, onValueChange }: TimeRangeSwitchProps) {
  return (
    <>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onValueChange(v as TimeRange)}
        variant="outline"
        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
      >
        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
      </ToggleGroup>
      <Select value={value} onValueChange={(v) => onValueChange(v as TimeRange)}>
        <SelectTrigger
          className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
          size="sm"
          aria-label="Select time range"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
