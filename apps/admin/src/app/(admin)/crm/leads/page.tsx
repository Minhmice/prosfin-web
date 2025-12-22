"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { DataTable } from "@/components/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import type { Lead } from "@/features/crm/types"
import { crmProvider } from "@/features/crm/data/provider"
import { useLeadListQuery } from "@/hooks/use-lead-list-query"
import { leadsTableColumns } from "@/features/crm/leads/leads-table-columns"
import { LeadsTableToolbar } from "@/features/crm/leads/leads-table-toolbar"
import { getLeadsRowActions } from "@/features/crm/leads/leads-table-row-actions"
import { leadsBulkActions } from "@/features/crm/leads/leads-bulk-actions"
import { LeadQuickViewDialog } from "@/features/crm/leads/lead-quick-view-dialog"
import { LeadSheet } from "@/features/crm/leads/lead-sheet"
import { LeadConvertDialog } from "@/features/crm/leads/lead-convert-dialog"
import { useConvertLead } from "@/features/crm/leads/use-convert-lead"
import { LeadSourceChartCard } from "@/features/crm/leads/lead-source-chart-card"
import { LeadsEmptyState } from "@/features/crm/leads/leads-empty-state"
import { BulkAssignOwnerDialog } from "@/features/crm/leads/bulk-assign-owner-dialog"
import { BulkSetStageDialog } from "@/features/crm/leads/bulk-set-stage-dialog"
import { exportLeadsToCSV } from "@/features/crm/leads/export-csv"
import { ShareLinkButton } from "@/features/crm/shared/share-link-button"
import { toast } from "sonner"
import { TableLoading } from "@/components/table/loading"
import type { Table as TanStackTable } from "@tanstack/react-table"

export default function LeadsPage() {
  const { query, updateQuery, updateSearch, resetFilters } = useLeadListQuery()
  const searchParams = useSearchParams()
  const [leads, setLeads] = React.useState<Lead[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [pageCount, setPageCount] = React.useState(0)
  const [rowCount, setRowCount] = React.useState(0)
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isConvertDialogOpen, setIsConvertDialogOpen] = React.useState(false)
  const [isBulkAssignOwnerOpen, setIsBulkAssignOwnerOpen] = React.useState(false)
  const [isBulkSetStageOpen, setIsBulkSetStageOpen] = React.useState(false)
  const [selectedLeads, setSelectedLeads] = React.useState<Lead[]>([])
  const [sheetMode, setSheetMode] = React.useState<"create" | "edit">("create")
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [tableInstance, setTableInstance] = React.useState<TanStackTable<Lead> | null>(null)
  const { convertLead } = useConvertLead()

  // Create stable query string directly from searchParams to avoid dependency on query object
  const queryString = React.useMemo(() => {
    return searchParams.toString()
  }, [searchParams])

  const fetchLeads = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await crmProvider.listLeads({
        q: query.q,
        status: query.stage as any, // Map stage to status for backward compatibility
        source: query.source,
        ownerId: query.owner,
        scoreMin: query.scoreMin,
        scoreMax: query.scoreMax,
        dateFrom: query.dateFrom,
        dateTo: query.dateTo,
        page: query.page,
        pageSize: query.pageSize,
        sort: query.sort,
      })
      setLeads(result.data)
      setPageCount(result.meta.totalPages)
      setRowCount(result.meta.total)
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch leads")
    } finally {
      setIsLoading(false)
    }
  }, [query])

  const prevQueryStringRef = React.useRef<string>("")
  const isMountedRef = React.useRef(false)
  
  React.useEffect(() => {
    // Skip first render
    if (!isMountedRef.current) {
      isMountedRef.current = true
      prevQueryStringRef.current = queryString
      fetchLeads()
      return
    }
    
    // Only fetch if query string actually changed
    if (prevQueryStringRef.current !== queryString) {
      prevQueryStringRef.current = queryString
      fetchLeads()
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
    async (action: string, row: Lead) => {
      switch (action) {
        case "view":
          setSelectedLead(row)
          setIsQuickViewOpen(true)
          break
        case "edit":
          setSelectedLead(row)
          setSheetMode("edit")
          setIsSheetOpen(true)
          break
        case "convert":
          setSelectedLead(row)
          setIsConvertDialogOpen(true)
          break
        case "delete":
          if (confirm(`Are you sure you want to delete ${row.name}?`)) {
            try {
              await crmProvider.deleteLead(row.id)
              toast.success("Lead deleted")
              fetchLeads()
            } catch (error: any) {
              toast.error(error.message || "Failed to delete lead")
            }
          }
          break
        default:
          break
      }
    },
    [fetchLeads]
  )

  const handleConvertConfirm = React.useCallback(async () => {
    if (!selectedLead) return
    try {
      await convertLead(selectedLead.id)
      setIsConvertDialogOpen(false)
      setSelectedLead(null)
      fetchLeads()
    } catch (error) {
      // Error already handled in hook
    }
  }, [selectedLead, convertLead, fetchLeads])

  const handleSheetSuccess = React.useCallback(() => {
    setIsSheetOpen(false)
    setSelectedLead(null)
    fetchLeads()
  }, [fetchLeads])

  const handleBulkAction = React.useCallback(
    async (action: string, rows: Lead[]) => {
      setSelectedLeads(rows)
      switch (action) {
        case "assign-owner":
          setIsBulkAssignOwnerOpen(true)
          break
        case "set-stage":
          setIsBulkSetStageOpen(true)
          break
        case "export-csv":
          // Export selected rows or all filtered leads
          const leadsToExport = rows.length > 0 ? rows : leads
          exportLeadsToCSV(leadsToExport, `leads-${new Date().toISOString().split("T")[0]}.csv`)
          toast.success(`Exported ${leadsToExport.length} lead${leadsToExport.length !== 1 ? "s" : ""} to CSV`)
          break
        case "delete":
          if (confirm(`Are you sure you want to delete ${rows.length} lead${rows.length !== 1 ? "s" : ""}?`)) {
            try {
              await Promise.all(rows.map((lead) => crmProvider.deleteLead(lead.id)))
              toast.success(`Deleted ${rows.length} lead${rows.length !== 1 ? "s" : ""}`)
              fetchLeads()
            } catch (error: any) {
              toast.error(error.message || "Failed to delete leads")
            }
          }
          break
        default:
          break
      }
    },
    [fetchLeads, leads]
  )

  const handleBulkAssignOwner = React.useCallback(
    async (ownerId: string | undefined) => {
      try {
        await Promise.all(
          selectedLeads.map((lead) =>
            crmProvider.updateLead(lead.id, {
              ownerId,
              ownerName: ownerId
                ? users.find((u) => u.id === ownerId)?.name
                : undefined,
            })
          )
        )
        toast.success(`Assigned owner to ${selectedLeads.length} lead${selectedLeads.length !== 1 ? "s" : ""}`)
        fetchLeads()
      } catch (error: any) {
        toast.error(error.message || "Failed to assign owner")
      }
    },
    [selectedLeads, fetchLeads]
  )

  const handleBulkSetStage = React.useCallback(
    async (stage: Lead["stage"]) => {
      try {
        await Promise.all(
          selectedLeads.map((lead) => crmProvider.updateLead(lead.id, { stage }))
        )
        toast.success(`Set stage for ${selectedLeads.length} lead${selectedLeads.length !== 1 ? "s" : ""}`)
        fetchLeads()
      } catch (error: any) {
        toast.error(error.message || "Failed to set stage")
      }
    },
    [selectedLeads, fetchLeads]
  )

  // Mock users for owner assignment (should come from API in real app)
  const users = [
    { id: "user-1", name: "John Manager" },
    { id: "user-2", name: "Jane Director" },
    { id: "user-3", name: "Mike Lead" },
    { id: "user-4", name: "Sarah Admin" },
  ]

  const handleNewLead = () => {
    setSelectedLead(null)
    setSheetMode("create")
    setIsSheetOpen(true)
  }

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Leads"
          subtitle="Manage your leads"
          actions={
            <div className="flex items-center gap-2">
              <ShareLinkButton />
              <Button onClick={handleNewLead}>
                <Plus className="mr-2 size-4" />
                New Lead
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
                    {Array.from({ length: 9 }).map((_, i) => (
                      <th key={i} className="h-12 border-b px-4">
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <TableLoading colCount={9} rowCount={10} />
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
        title="Leads"
        subtitle="Manage your leads"
        actions={
          <div className="flex items-center gap-2">
            <ShareLinkButton />
            <Button onClick={handleNewLead}>
              <Plus className="mr-2 size-4" />
              New Lead
            </Button>
          </div>
        }
      />
      <PageBody>
        <div className="space-y-4">
          <LeadSourceChartCard />
          <LeadsTableToolbar
            query={query}
            onSearchChange={updateSearch}
            onStageChange={(stage) => updateQuery({ stage, page: 1 })}
            onSourceChange={(source) => updateQuery({ source, page: 1 })}
            onOwnerChange={(owner) => updateQuery({ owner, page: 1 })}
            onScoreRangeChange={(min, max) => updateQuery({ scoreMin: min, scoreMax: max, page: 1 })}
            onDateRangeChange={(from, to) => updateQuery({ dateFrom: from, dateTo: to, page: 1 })}
            onReset={resetFilters}
            table={tableInstance || undefined}
          />
          {leads.length === 0 && !isLoading ? (
            <LeadsEmptyState onNewLead={handleNewLead} />
          ) : (
            <DataTable
              data={leads}
              columns={leadsTableColumns}
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
              rowActions={getLeadsRowActions}
              bulkActions={leadsBulkActions}
              initialPage={query.page}
              initialPageSize={query.pageSize}
              onTableReady={setTableInstance}
              showDefaultToolbar={false}
            />
          )}
        </div>
      </PageBody>
      <LeadQuickViewDialog
        open={isQuickViewOpen}
        onOpenChange={(open) => {
          setIsQuickViewOpen(open)
          if (!open) setSelectedLead(null)
        }}
        lead={selectedLead}
        onEdit={() => {
          setIsQuickViewOpen(false)
          setSheetMode("edit")
          setIsSheetOpen(true)
        }}
        onConvert={() => {
          setIsQuickViewOpen(false)
          setIsConvertDialogOpen(true)
        }}
      />
      <LeadSheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open)
          if (!open) {
            setSelectedLead(null)
            setSheetMode("create")
          }
        }}
        mode={sheetMode}
        lead={selectedLead}
        onSuccess={handleSheetSuccess}
      />
      <LeadConvertDialog
        open={isConvertDialogOpen}
        onOpenChange={(open) => {
          setIsConvertDialogOpen(open)
          if (!open) setSelectedLead(null)
        }}
        lead={selectedLead}
        onConfirm={handleConvertConfirm}
      />
      <BulkAssignOwnerDialog
        open={isBulkAssignOwnerOpen}
        onOpenChange={setIsBulkAssignOwnerOpen}
        leads={selectedLeads}
        onConfirm={handleBulkAssignOwner}
      />
      <BulkSetStageDialog
        open={isBulkSetStageOpen}
        onOpenChange={setIsBulkSetStageOpen}
        leads={selectedLeads}
        onConfirm={handleBulkSetStage}
      />
    </>
  )
}

