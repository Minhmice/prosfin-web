"use client"

import type { ScheduleItem } from "../../types"

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
    { label: "Edit", action: "edit" },
    { label: "Open Post", action: "openPost" },
  ]

  if (schedule.status === "pending") {
    actions.push({ label: "Cancel", action: "cancel", variant: "destructive" })
  }

  if (schedule.status === "failed") {
    actions.push({ label: "Retry", action: "retry" })
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
    { label: "Export", action: "bulkExport" },
  ]
}
