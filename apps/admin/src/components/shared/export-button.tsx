"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconChevronDown, IconDownload } from "@tabler/icons-react"
import { exportFiltered, exportSelected } from "@/lib/export-csv"
import { toast } from "sonner"

interface ExportButtonProps<TData> {
  table: Table<TData>
  filename?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportButton<TData>({
  table,
  filename = "export.csv",
  variant = "outline",
  size = "default",
}: ExportButtonProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const hasSelection = selectedCount > 0

  const handleExportFiltered = () => {
    try {
      exportFiltered(table, {}, filename)
      toast.success("Exported filtered data")
    } catch (error) {
      toast.error("Failed to export")
    }
  }

  const handleExportSelected = () => {
    try {
      exportSelected(table, filename.replace(".csv", "-selected.csv"))
      toast.success(`Exported ${selectedCount} selected rows`)
    } catch (error) {
      toast.error("Failed to export selected rows")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <IconDownload className="mr-2 size-4" />
          Export
          <IconChevronDown className="ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportFiltered}>
          Export filtered
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleExportSelected}
          disabled={!hasSelection}
        >
          Export selected ({selectedCount})
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

