/**
 * Leads Table Columns
 */

import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Lead } from "@/features/crm/types"

function getSourceBadgeVariant(source: Lead["source"]) {
  switch (source) {
    case "web":
      return "default"
    case "referral":
      return "secondary"
    case "event":
      return "outline"
    default:
      return "outline"
  }
}

function getStageBadgeVariant(stage: Lead["stage"]) {
  switch (stage) {
    case "new":
      return "default"
    case "qualified":
      return "secondary"
    case "proposal":
      return "outline"
    case "won":
      return "default"
    case "lost":
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
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as Lead["stage"]
      return <Badge variant={getStageBadgeVariant(stage)}>{stage}</Badge>
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("score") as number
      return (
        <div className="flex items-center gap-2 w-24">
          <Progress value={score} className="h-2" />
          <span className="text-muted-foreground text-xs w-8">{score}</span>
        </div>
      )
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
    accessorKey: "nextActionAt",
    header: "Next Action",
    cell: ({ row }) => {
      const date = row.getValue("nextActionAt") as Date | undefined
      return date ? format(date, "MMM d, yyyy") : <span className="text-muted-foreground">—</span>
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

