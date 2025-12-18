"use client"

import * as React from "react"
import { DataTable } from "@/components/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import type { Client } from "@/features/crm/types"
import { ClientSheet } from "@/features/crm/clients/client-sheet"
import { crmProvider } from "@/features/crm/data/provider"
import { useClientListQuery } from "@/hooks/use-client-list-query"
import { clientsTableColumns } from "@/features/crm/clients/clients-table-columns"
import { ClientsTableToolbar } from "@/features/crm/clients/clients-table-toolbar"
import { getClientsRowActions } from "@/features/crm/clients/clients-table-row-actions"
import { clientsBulkActions } from "@/features/crm/clients/clients-bulk-actions"
import { toast } from "sonner"

export default function ClientsPage() {
  const { query, updateQuery, updateSearch, resetFilters } = useClientListQuery()
  const [clients, setClients] = React.useState<Client[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [pageCount, setPageCount] = React.useState(0)
  const [rowCount, setRowCount] = React.useState(0)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [sheetMode, setSheetMode] = React.useState<"create" | "view" | "edit">("create")
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)

  // Fetch clients based on query
  const fetchClients = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await crmProvider.listClients({
        q: query.q,
        status: query.status,
        ownerId: query.owner,
        tags: query.tags,
        page: query.page,
        pageSize: query.pageSize,
        sort: query.sort,
      })
      setClients(result.data)
      setPageCount(result.meta.totalPages)
      setRowCount(result.meta.total)
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch clients")
    } finally {
      setIsLoading(false)
    }
  }, [query])

  React.useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handlePaginationChange = React.useCallback(
    (page: number, pageSize: number) => {
      updateQuery({ page, pageSize })
    },
    [updateQuery]
  )

  const handleSortingChange = React.useCallback(
    (sort: { field: string; direction: "asc" | "desc" } | null) => {
      const sortString = sort ? `${sort.direction === "desc" ? "-" : ""}${sort.field}` : undefined
      updateQuery({ sort: sortString, page: 1 })
    },
    [updateQuery]
  )

  const handleFilterChange = React.useCallback(
    (filters: Record<string, any>) => {
      // Filters are handled individually via toolbar
      updateQuery({ page: 1 })
    },
    [updateQuery]
  )

  const handleRowAction = React.useCallback(
    async (action: string, row: Client) => {
      switch (action) {
        case "view":
          setSelectedClient(row)
          setSheetMode("view")
          setIsSheetOpen(true)
          break
        case "edit":
          setSelectedClient(row)
          setSheetMode("edit")
          setIsSheetOpen(true)
          break
        case "delete":
          if (confirm(`Are you sure you want to delete ${row.name}?`)) {
            try {
              await crmProvider.deleteClient(row.id)
              toast.success("Client deleted")
              fetchClients()
            } catch (error: any) {
              toast.error(error.message || "Failed to delete client")
            }
          }
          break
        default:
          break
      }
    },
    [fetchClients]
  )

  const handleBulkAction = React.useCallback(
    async (action: string, rows: Client[]) => {
      switch (action) {
        case "archive":
          // TODO: Implement bulk archive
          toast.info(`Archive ${rows.length} clients`)
          break
        default:
          break
      }
    },
    []
  )

  const handleNewClient = () => {
    setSelectedClient(null)
    setSheetMode("create")
    setIsSheetOpen(true)
  }

  const handleSheetSuccess = () => {
    setIsSheetOpen(false)
    setSelectedClient(null)
    fetchClients()
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
        <div className="space-y-4">
          <ClientsTableToolbar
            query={query}
            onSearchChange={updateSearch}
            onStatusChange={(status) => updateQuery({ status, page: 1 })}
            onOwnerChange={(owner) => updateQuery({ owner, page: 1 })}
            onTagsChange={(tags) => updateQuery({ tags, page: 1 })}
            onReset={resetFilters}
          />
          <DataTable
            data={clients}
            columns={clientsTableColumns}
            manualPagination
            manualSorting
            manualFiltering
            pageCount={pageCount}
            rowCount={rowCount}
            enableRowSelection
            enableColumnVisibility
            enableSorting
            enableFiltering
            onPaginationChange={handlePaginationChange}
            onSortingChange={handleSortingChange}
            onFilterChange={handleFilterChange}
            onRowAction={handleRowAction}
            onBulkAction={handleBulkAction}
            rowActions={getClientsRowActions}
            bulkActions={clientsBulkActions}
          />
        </div>
      </PageBody>
      <ClientSheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open)
          if (!open) {
            setSelectedClient(null)
            setSheetMode("create")
          }
        }}
        mode={sheetMode}
        client={selectedClient}
        onSuccess={handleSheetSuccess}
      />
    </>
  )
}
