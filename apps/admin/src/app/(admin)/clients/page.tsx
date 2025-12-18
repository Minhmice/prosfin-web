"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { mockClients } from "@/data/clients"
import type { Client } from "@/types"
import { ClientDetailPanel } from "@/components/clients/client-detail-panel"
import { ClientFormSheet } from "@/features/crm/clients/client-form-sheet"
import { archiveClient, bulkArchiveClients } from "@/lib/actions/clients"
import { notifyInfo } from "@/lib/notify"
import { crmProvider } from "@/features/crm/data/provider"

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
    accessorKey: "ownerName",
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
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingClient, setEditingClient] = React.useState<Client | null>(null)
  const [clients, setClients] = React.useState<Client[]>(mockClients as Client[])

  const refreshClients = React.useCallback(async () => {
    const result = await crmProvider.listClients({ page: 1, pageSize: 100 })
    setClients(result.data)
  }, [])

  React.useEffect(() => {
    refreshClients()
  }, [refreshClients])

  const handleRowAction = async (action: string, row: Client) => {
    switch (action) {
      case "view":
        setSelectedClient(row)
        setIsDetailOpen(true)
        break
      case "edit":
        setEditingClient(row)
        setIsFormOpen(true)
        break
      case "archive":
        await archiveClient(row.id)
        await refreshClients()
        break
      default:
        break
    }
  }

  const handleBulkAction = async (action: string, rows: Client[]) => {
    switch (action) {
      case "archive":
        await bulkArchiveClients(rows.map((r) => r.id))
        await refreshClients()
        break
      default:
        break
    }
  }

  const handleNewClient = () => {
    setEditingClient(null)
    setIsFormOpen(true)
  }

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Manage your clients"
        actions={
          <Button onClick={handleNewClient}>
            <Plus className="mr-2 size-4" />
            New Client
          </Button>
        }
      />
      <PageBody>
        <DataTable
          data={clients}
          columns={columns}
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
        />
      </PageBody>
      <ClientDetailPanel
        client={selectedClient}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
      <ClientFormSheet
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingClient(null)
        }}
        client={editingClient}
        onSuccess={refreshClients}
      />
    </>
  )
}
