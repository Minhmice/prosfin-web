"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { mockClients } from "@/data/clients"
import type { Client } from "@/types"
import { ClientDetailPanel } from "@/components/clients/client-detail-panel"
import { archiveClient, bulkArchiveClients } from "@/lib/actions/clients"
import { notifyInfo } from "@/lib/notify"

const columns: ColumnDef<Client>[] = [
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
    accessorKey: "owner",
    header: "Owner",
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

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  const handleRowAction = async (action: string, row: Client) => {
    switch (action) {
      case "view":
        setSelectedClient(row)
        setIsDetailOpen(true)
        break
      case "edit":
        notifyInfo("Edit Client", `Editing ${row.name}`)
        break
      case "archive":
        await archiveClient(row.id)
        break
      default:
        break
    }
  }

  const handleBulkAction = async (action: string, rows: Client[]) => {
    switch (action) {
      case "archive":
        await bulkArchiveClients(rows.map((r) => r.id))
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your clients</p>
        </div>
        <DataTable
          data={mockClients}
          columns={columns}
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
        />
      </div>
      <ClientDetailPanel
        client={selectedClient}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  )
}
