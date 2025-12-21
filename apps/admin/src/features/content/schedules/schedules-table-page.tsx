"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/table"
import { contentProvider } from "../data/provider"
import type { ScheduleItem } from "../types"
import { createScheduleColumns } from "./schedule-columns"
import { getScheduleRowActions, getScheduleBulkActions } from "./schedule-actions"
import { ScheduleFilters } from "./schedule-filters"
import { exportSchedulesToCSV } from "./schedules-export"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"
import { toast } from "sonner"

export function SchedulesTablePage() {
  const router = useRouter()
  const { query, updateQuery, updateSearch, resetFilters } = useScheduleListQuery()
  const [schedules, setSchedules] = React.useState<ScheduleItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  const columns = React.useMemo<ColumnDef<ScheduleItem>[]>(
    () => createScheduleColumns(),
    []
  )

  const loadSchedules = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const from = query.from ? new Date(query.from) : undefined
      const to = query.to ? new Date(query.to) : undefined
      
      const result = await contentProvider.listSchedules({
        view: "list",
        range: query.range,
        from,
        to,
        channel: query.channel,
        status: query.status,
        postId: query.postId,
        q: query.q,
        sort: query.sort,
        page: query.page,
        pageSize: query.pageSize,
      })
      setSchedules(result.data)
    } catch (error) {
      toast.error("Failed to load schedules")
    } finally {
      setIsLoading(false)
    }
  }, [query])

  React.useEffect(() => {
    loadSchedules()
  }, [loadSchedules])

  const handleRowAction = async (action: string, row: ScheduleItem) => {
    try {
      switch (action) {
        case "edit":
          router.push(`/content/schedules?scheduleId=${row.id}`)
          break
        case "openPost":
          router.push(`/content/posts/${row.postId}/edit`)
          break
        case "cancel":
          await contentProvider.cancelSchedule(row.id)
          toast.success("Schedule canceled")
          loadSchedules()
          break
        case "retry":
          await contentProvider.updateSchedule(row.id, {
            status: "pending",
            attempts: 0,
          })
          toast.success("Schedule retried")
          loadSchedules()
          break
      }
    } catch (error) {
      toast.error("Action failed")
    }
  }

  const handleBulkAction = async (action: string, rows: ScheduleItem[]) => {
    try {
      switch (action) {
        case "bulkCancel":
          await Promise.all(rows.map((r) => contentProvider.cancelSchedule(r.id)))
          toast.success(`${rows.length} schedules canceled`)
          loadSchedules()
          break
        case "bulkExport":
          const from = query.from ? new Date(query.from) : undefined
          const to = query.to ? new Date(query.to) : undefined
          await exportSchedulesToCSV(
            {
              view: "list",
              range: query.range,
              from,
              to,
              channel: query.channel,
              status: query.status,
              postId: query.postId,
              q: query.q,
            },
            rows.map((r) => r.id)
          )
          toast.success("Export started")
          break
      }
    } catch (error) {
      toast.error("Bulk action failed")
    }
  }

  return (
    <div className="space-y-4">
      <ScheduleFilters
        searchQuery={query.q || ""}
        onSearchChange={updateSearch}
        status={query.status}
        onStatusChange={(status) => updateQuery({ status, page: 1 })}
        channel={query.channel}
        onChannelChange={(channel) => updateQuery({ channel, page: 1 })}
        postId={query.postId}
        onReset={resetFilters}
      />
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading schedules...</p>
        </div>
      ) : (
        <DataTable
          data={schedules}
          columns={columns}
          manualPagination
          pageCount={Math.ceil((schedules.length || 0) / query.pageSize)}
          rowCount={schedules.length}
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          showDefaultToolbar={false}
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
          rowActions={getScheduleRowActions}
          bulkActions={getScheduleBulkActions()}
          onPaginationChange={(page, pageSize) =>
            updateQuery({ page, pageSize })
          }
          onSortingChange={(sort) => {
            const sortString = sort
              ? `${sort.direction === "desc" ? "-" : ""}${sort.field}`
              : undefined
            updateQuery({ sort: sortString, page: 1 })
          }}
        />
      )}
    </div>
  )
}
