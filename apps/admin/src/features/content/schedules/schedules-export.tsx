/**
 * Schedule Export Utilities
 * Export schedules to CSV format
 */

import { contentProvider } from "@/features/content/data/provider"

export async function exportSchedulesToCSV(
  dateFrom?: Date,
  dateTo?: Date,
  selection?: string[]
): Promise<void> {
  const schedulesResult = await contentProvider.listSchedules({
    from: dateFrom,
    to: dateTo,
  })
  
  let data = schedulesResult.data
  if (selection && selection.length > 0) {
    data = data.filter((s) => selection.includes(s.id))
  }

  // CSV header
  const headers = ["Scheduled At", "Channel", "Post ID", "Status"]
  const rows = data.map((schedule) => {
    return [
      schedule.scheduledAt ? schedule.scheduledAt.toISOString() : "",
      schedule.channel || "",
      schedule.postId,
      schedule.status,
    ]
  })

  // Simple CSV generation
  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")

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
