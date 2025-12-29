/**
 * Leads Table Columns
 */

import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import type { Lead } from "@prosfin/shared"

function getSourceBadgeVariant(source: Lead["source"]) {
  switch (source) {
    case "website":
      return "default"
    case "referral":
      return "secondary"
    case "social":
      return "outline"
    default:
      return "outline"
  }
}

function getStatusBadgeVariant(status: Lead["status"]) {
  switch (status) {
    case "new":
      return "default"
    case "contacted":
      return "secondary"
    case "qualified":
      return "outline"
    case "converted":
      return "default"
    case "archived":
      return "destructive"
    default:
      return "outline"
  }
}

export const leadsTableColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Lead",
    cell: ({ row }) => {
      const lead = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">{lead.name}</span>
          <span className="text-muted-foreground text-xs">{lead.email}</span>
          {lead.phone && (
            <span className="text-muted-foreground text-xs">{lead.phone}</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.getValue("source") as Lead["source"]
      return <Badge variant={getSourceBadgeVariant(source)}>{source}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Lead["status"]
      return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
    },
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
    cell: ({ row }) => {
      const owner = row.getValue("ownerName") as string | undefined
      return owner || <span className="text-muted-foreground">Unassigned</span>
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date
      return format(date, "MMM d, yyyy")
    },
  },
]

