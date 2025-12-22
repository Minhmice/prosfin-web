"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/table"
import { Button } from "@/components/ui/button"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"
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

  const columns = React.useMemo<ColumnDef<ScheduleItem>[]>(
    () => createScheduleColumns(),
    []
  )

  const loadSchedules = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const from = query.from ? new Date(query.from) : undefined
      const to = query.to ? new Date(query.to) : undefined
      
      const items = await contentProvider.listSchedules({
        dateFrom: from,
        dateTo: to,
        q: query.q,
      })
      setSchedules(items)
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
        case "openPost":
          router.push(`/content/posts/${row.postId}/edit`)
          break
        case "cancel":
          await contentProvider.cancelSchedule(row.postId)
          toast.success("Schedule canceled")
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
          await Promise.all(rows.map((r) => contentProvider.cancelSchedule(r.postId)))
          toast.success(`${rows.length} schedules canceled`)
          loadSchedules()
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
          enableRowSelection
          enableColumnVisibility
          enableSorting
          enableFiltering
          onRowAction={handleRowAction}
          onBulkAction={handleBulkAction}
          rowActions={getScheduleRowActions}
          bulkActions={getScheduleBulkActions()}
        />
      )}
    </div>
  )
}
