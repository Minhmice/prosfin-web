/**
 * Export Leads to CSV
 * Utility function to export filtered/selected leads to CSV format
 */

import type { Lead } from "../types"

/**
 * Convert leads array to CSV string
 */
export function leadsToCSV(leads: Lead[]): string {
  if (leads.length === 0) {
    return "No data available"
  }

  // CSV Headers
  const headers = [
    "Name",
    "Company",
    "Email",
    "Phone",
    "Stage",
    "Source",
    "Score",
    "Owner",
    "Next Action",
    "Created At",
    "Updated At",
  ]

  // CSV Rows
  const rows = leads.map((lead) => {
    const nextAction = lead.nextActionAt
      ? new Date(lead.nextActionAt).toISOString().split("T")[0]
      : ""
    const createdAt = lead.createdAt
      ? new Date(lead.createdAt).toISOString().split("T")[0]
      : ""
    const updatedAt = lead.updatedAt
      ? new Date(lead.updatedAt).toISOString().split("T")[0]
      : ""

    return [
      escapeCSV(lead.name),
      escapeCSV(lead.company),
      escapeCSV(lead.email),
      escapeCSV(lead.phone || ""),
      escapeCSV(lead.stage),
      escapeCSV(lead.source),
      String(lead.score),
      escapeCSV(lead.ownerName || ""),
      escapeCSV(nextAction),
      escapeCSV(createdAt),
      escapeCSV(updatedAt),
    ]
  })

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n")

  return csvContent
}

/**
 * Escape CSV field (handle commas, quotes, newlines)
 */
function escapeCSV(field: string): string {
  if (!field) return ""
  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string = "leads.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export leads to CSV and download
 */
export function exportLeadsToCSV(
  leads: Lead[],
  filename?: string
): void {
  const csvContent = leadsToCSV(leads)
  downloadCSV(csvContent, filename)
}

