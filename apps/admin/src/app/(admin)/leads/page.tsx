"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { mockLeads } from "@/data/leads"
import type { Lead } from "@/types"
import { LeadDetailPanel } from "@/components/leads/lead-detail-panel"
import {
  markContacted,
  setLeadStatus,
  convertToClient,
  archiveLead,
  bulkArchiveLeads,
} from "@/lib/actions/leads"
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
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "interest",
    header: "Interest",
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
  {
    accessorKey: "utmCampaign",
    header: "UTM Campaign",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return date.toLocaleDateString()
    },
  },
]

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  const handleRowAction = async (action: string, row: Lead) => {
    switch (action) {
      case "view":
        setSelectedLead(row)
        setIsDetailOpen(true)
        break
      case "edit":
        notifyInfo("Edit Lead", `Editing ${row.name}`)
        break
      case "archive":
        await archiveLead(row.id)
        break
      default:
        break
    }
  }

  const handleBulkAction = async (action: string, rows: Lead[]) => {
    switch (action) {
      case "archive":
        await bulkArchiveLeads(rows.map((r) => r.id))
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your leads</p>
        </div>
        <DataTable
          data={mockLeads}
          columns={columns}
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
        />
      </div>
      <LeadDetailPanel
        lead={selectedLead}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  )
}
