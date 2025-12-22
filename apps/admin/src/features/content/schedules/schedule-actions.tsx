"use client"

import type { ScheduleItem } from "@/features/content/types"

export function getScheduleRowActions(schedule: ScheduleItem): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  const actions: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }> = [
    { label: "Open Post", action: "openPost" },
  ]

  if (schedule.status === "queued") {
    actions.push({ label: "Cancel", action: "cancel", variant: "destructive" })
  }

  return actions
}

export function getScheduleBulkActions(): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  return [
    { label: "Cancel Selected", action: "bulkCancel", variant: "destructive" },
  ]
}
