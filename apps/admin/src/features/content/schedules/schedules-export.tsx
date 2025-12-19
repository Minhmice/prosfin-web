/**
 * Schedule Export Utilities
 * Export schedules to CSV format
 */

import { contentProvider } from "../../data/provider"
import type { ScheduleItem } from "../../types"
import type { ListSchedulesParams } from "../../data/provider"

export async function exportSchedulesToCSV(
  params: ListSchedulesParams,
  selection?: string[]
): Promise<void> {
  const csv = await contentProvider.exportSchedules(params, selection)
  
  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  
  link.setAttribute("href", url)
  link.setAttribute("download", `schedules-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}
