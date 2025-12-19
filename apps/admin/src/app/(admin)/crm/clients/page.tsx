"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
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
import { ClientsEmptyState } from "@/features/crm/clients/clients-empty-state"
import { ShareLinkButton } from "@/features/crm/shared/share-link-button"
import { toast } from "sonner"
import { TableLoading } from "@/components/table/loading"
import type { Table as TanStackTable } from "@tanstack/react-table"

export default function ClientsPage() {
  const { query, updateQuery, updateSearch, resetFilters } = useClientListQuery()
  const searchParams = useSearchParams()
  const [clients, setClients] = React.useState<Client[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [pageCount, setPageCount] = React.useState(0)
  const [rowCount, setRowCount] = React.useState(0)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [sheetMode, setSheetMode] = React.useState<"create" | "view" | "edit">("create")
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)
  const [highlightedClientId, setHighlightedClientId] = React.useState<string | null>(null)
  const [tableInstance, setTableInstance] = React.useState<TanStackTable<Client> | null>(null)
  const tableRef = React.useRef<HTMLDivElement>(null)

  // Create stable query string directly from searchParams to avoid dependency on query object
  const queryString = React.useMemo(() => {
    return searchParams.toString()
  }, [searchParams])

  // Read highlight from URL
  const highlightId = React.useMemo(() => {
    return searchParams.get("highlight") || null
  }, [searchParams])

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

      // Check if highlight ID is in current page
      if (highlightId) {
        const isInCurrentPage = result.data.some((c) => c.id === highlightId)
        if (isInCurrentPage) {
          // Highlight row after a short delay to ensure DOM is ready
          setTimeout(() => {
            setHighlightedClientId(highlightId)
            scrollToHighlightedRow(highlightId)
            // Auto-remove highlight after 5 seconds
            setTimeout(() => {
              setHighlightedClientId(null)
            }, 5000)
          }, 100)
        } else {
          // Client not in current page - need to find which page it's on
          // For now, we'll just show a message or try to fetch the client
          // In a real app, you'd need to search through all pages or have an API endpoint
          // to find which page a client is on
          handleHighlightNotInPage(highlightId)
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch clients")
    } finally {
      setIsLoading(false)
    }
  }, [query, highlightId])

  const scrollToHighlightedRow = React.useCallback((clientId: string) => {
    if (!tableRef.current) return
    const row = tableRef.current.querySelector(`[data-row-id="${clientId}"]`)
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const handleHighlightNotInPage = React.useCallback(async (clientId: string) => {
    try {
      // Fetch client to get its data
      const client = await crmProvider.getClient(clientId)
      // For simplicity, we'll just navigate to page 1 and let user search
      // In a real app, you'd need to determine which page the client is on
      // based on sorting/filtering
      updateQuery({ page: 1, q: client.name })
      toast.info(`Client found. Searching for "${client.name}"...`)
    } catch (error: any) {
      toast.error("Client not found")
    }
  }, [updateQuery])

  const prevQueryStringRef = React.useRef<string>("")
  const isMountedRef = React.useRef(false)
  
  React.useEffect(() => {
    // Skip first render
    if (!isMountedRef.current) {
      isMountedRef.current = true
      prevQueryStringRef.current = queryString
      fetchClients()
      return
    }
    
    // Only fetch if query string actually changed
    if (prevQueryStringRef.current !== queryString) {
      prevQueryStringRef.current = queryString
      fetchClients()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString])

  const handlePaginationChange = React.useCallback(
    (page: number, pageSize: number) => {
      // Only update if values actually changed
      if (page !== query.page || pageSize !== query.pageSize) {
        updateQuery({ page, pageSize })
      }
    },
    [updateQuery, query.page, query.pageSize]
  )

  const handleSortingChange = React.useCallback(
    (sort: { field: string; direction: "asc" | "desc" } | null) => {
      const sortString = sort ? `${sort.direction === "desc" ? "-" : ""}${sort.field}` : undefined
      // Only update if sort or page actually changed
      if (sortString !== query.sort || query.page !== 1) {
        updateQuery({ sort: sortString, page: 1 })
      }
    },
    [updateQuery, query.sort, query.page]
  )

  const handleFilterChange = React.useCallback(
    (filters: Record<string, any>) => {
      // Filters are handled individually via toolbar
      // Only update if page is not already 1
      if (query.page !== 1) {
        updateQuery({ page: 1 })
      }
    },
    [updateQuery, query.page]
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

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Clients"
          subtitle="Manage your clients"
          actions={
            <div className="flex items-center gap-2">
              <ShareLinkButton />
              <Button onClick={handleNewClient}>
                <Plus className="mr-2 size-4" />
                New Client
              </Button>
            </div>
          }
        />
        <PageBody>
          <div className="space-y-4">
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <th key={i} className="h-12 border-b px-4">
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <TableLoading colCount={8} rowCount={10} />
              </table>
            </div>
          </div>
        </PageBody>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Manage your clients"
        actions={
          <div className="flex items-center gap-2">
            <ShareLinkButton />
            <Button onClick={handleNewClient}>
              <Plus className="mr-2 size-4" />
              New Client
            </Button>
          </div>
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
            table={tableInstance || undefined}
          />
          {!isLoading && clients.length === 0 && !query.q && !query.status && !query.owner && (!query.tags || query.tags.length === 0) ? (
            <ClientsEmptyState onNewClient={handleNewClient} />
          ) : (
            <div ref={tableRef}>
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
                showDefaultToolbar={false}
                onPaginationChange={handlePaginationChange}
                onSortingChange={handleSortingChange}
                onFilterChange={handleFilterChange}
                onRowAction={handleRowAction}
                onBulkAction={handleBulkAction}
                rowActions={getClientsRowActions}
                bulkActions={clientsBulkActions}
                getRowId={(row) => row.id}
                highlightedRowId={highlightedClientId}
                initialPage={query.page}
                initialPageSize={query.pageSize}
                onTableReady={setTableInstance}
              />
            </div>
          )}
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

