/**
 * Client 360 Leads Tab
 */

import type { Lead } from "@/features/crm/types"
import { DataTable } from "@/components/table"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

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
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string
      return <Badge variant="outline">{stage}</Badge>
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return format(date, "MMM d, yyyy")
    },
  },
]

interface Client360LeadsProps {
  leads: Lead[]
}

export function Client360Leads({ leads }: Client360LeadsProps) {
  return (
    <div>
      <DataTable
        data={leads}
        columns={columns}
        enableRowSelection={false}
        enableColumnVisibility={false}
        enableSorting={false}
        enableFiltering={false}
      />
    </div>
  )
}

