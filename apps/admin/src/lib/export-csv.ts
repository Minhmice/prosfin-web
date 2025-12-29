/**
 * CSV Export Utilities
 * Generic utilities for exporting data to CSV
 */

import type { Table } from "@tanstack/react-table"

/**
 * Convert data to CSV format
 */
function convertToCSV(data: any[], columns: string[]): string {
  const headers = columns.join(",")
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        const value = row[col]
        if (value === null || value === undefined) return ""
        // Escape commas and quotes
        const stringValue = String(value).replace(/"/g, '""')
        return `"${stringValue}"`
      })
      .join(",")
  })
  
  return [headers, ...rows].join("\n")
}

/**
 * Download CSV file
 */
function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  URL.revokeObjectURL(url)
}

/**
 * Export table data to CSV
 */
export function exportTableData<TData>(
  table: Table<TData>,
  filename: string = "export.csv"
): void {
  const visibleColumns = table
    .getVisibleLeafColumns()
    .filter((col) => col.id !== "select" && col.id !== "actions")
    .map((col) => col.id)
  
  const data = table.getRowModel().rows.map((row) => {
    const rowData: Record<string, any> = {}
    visibleColumns.forEach((colId) => {
      const cell = row.getVisibleCells().find((c) => c.column.id === colId)
      if (cell) {
        // Get the raw value from the cell
        rowData[colId] = cell.getValue()
      } else {
        rowData[colId] = (row.original as any)[colId]
      }
    })
    return rowData
  })
  
  const csv = convertToCSV(data, visibleColumns)
  downloadCSV(csv, filename)
}

/**
 * Export filtered data based on current filters
 */
export function exportFiltered<TData>(
  table: Table<TData>,
  filters: Record<string, any>,
  filename: string = "export-filtered.csv"
): void {
  // Export all filtered rows (not just current page)
  exportTableData(table, filename)
}

/**
 * Export selected rows to CSV
 */
export function exportSelected<TData>(
  table: Table<TData>,
  filename: string = "export-selected.csv"
): void {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  
  if (selectedRows.length === 0) {
    throw new Error("No rows selected")
  }
  
  const visibleColumns = table
    .getVisibleLeafColumns()
    .filter((col) => col.id !== "select" && col.id !== "actions")
    .map((col) => col.id)
  
  const data = selectedRows.map((row) => {
    const rowData: Record<string, any> = {}
    visibleColumns.forEach((colId) => {
      const cell = row.getVisibleCells().find((c) => c.column.id === colId)
      if (cell) {
        // Get the raw value from the cell
        rowData[colId] = cell.getValue()
      } else {
        rowData[colId] = (row.original as any)[colId]
      }
    })
    return rowData
  })
  
  const csv = convertToCSV(data, visibleColumns)
  downloadCSV(csv, filename)
}

/**
 * Export data array directly to CSV
 */
export function exportToCSV<TData extends Record<string, any>>(
  data: TData[],
  columns: (keyof TData)[],
  filename: string = "export.csv"
): void {
  const csv = convertToCSV(data, columns as string[])
  downloadCSV(csv, filename)
}

