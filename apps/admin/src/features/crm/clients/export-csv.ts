/**
 * Export Clients to CSV
 * Utility function to export filtered/selected clients to CSV format
 */

import type { Client } from "../types"

/**
 * Convert clients array to CSV string
 */
export function clientsToCSV(clients: Client[]): string {
  if (clients.length === 0) {
    return "No data available"
  }

  // CSV Headers
  const headers = [
    "Name",
    "Company",
    "Title",
    "Email",
    "Phone",
    "Status",
    "Owner",
    "Tags",
    "Last Contacted",
    "Created At",
    "Updated At",
  ]

  // CSV Rows
  const rows = clients.map((client) => {
    const tags = client.tags && client.tags.length > 0 ? client.tags.join("; ") : ""
    const lastContacted = client.lastContactedAt
      ? new Date(client.lastContactedAt).toISOString().split("T")[0]
      : ""
    const createdAt = client.createdAt
      ? new Date(client.createdAt).toISOString().split("T")[0]
      : ""
    const updatedAt = client.updatedAt
      ? new Date(client.updatedAt).toISOString().split("T")[0]
      : ""

    return [
      escapeCSV(client.name),
      escapeCSV(client.company),
      escapeCSV(client.title || ""),
      escapeCSV(client.email),
      escapeCSV(client.phone || ""),
      escapeCSV(client.status),
      escapeCSV(client.ownerName || ""),
      escapeCSV(tags),
      escapeCSV(lastContacted),
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
export function downloadCSV(csvContent: string, filename: string = "clients.csv"): void {
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
 * Export clients to CSV and download
 */
export function exportClientsToCSV(
  clients: Client[],
  filename?: string
): void {
  const csvContent = clientsToCSV(clients)
  downloadCSV(csvContent, filename)
}

