"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { mockLeads } from "@/data/leads"
import type { Lead } from "@/types"
import { notifyInfo } from "@/lib/notify"

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.getValue("source") as string
      return (
        <Badge variant="secondary">
          {source}
        </Badge>
      )
    },
  },
]

export default function TablesPlaygroundPage() {
  const handleRowAction = (action: string, row: Lead) => {
    notifyInfo(`Action: ${action}`, `Row ID: ${row.id}`)
  }

  const handleBulkAction = (action: string, rows: Lead[]) => {
    notifyInfo(`Bulk Action: ${action}`, `${rows.length} rows selected`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DataTable Playground</h1>
        <p className="text-muted-foreground">
          Demo đầy đủ features của DataTable kit
        </p>
      </div>
      <DataTable
        data={mockLeads as any}
        columns={columns}
        enableRowSelection
        enableColumnVisibility
        enableSorting
        enableFiltering
        onRowAction={handleRowAction}
        onBulkAction={handleBulkAction}
      />
    </div>
  )
}
