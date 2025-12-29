"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { usePathname } from "next/navigation"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DataTableProps } from "./types"
import { TableEmpty } from "./empty"
import { BulkBar } from "./bulk-bar"
import { TablePagination } from "./pagination"
import { TableToolbar } from "./toolbar"
import { RowActions } from "./row-actions"

export function DataTable<TData>({
  data,
  columns,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  pageCount,
  rowCount,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableSorting = true,
  enableFiltering = true,
  showDefaultToolbar = true,
  onPaginationChange,
  onSortingChange,
  onFilterChange,
  onRowAction,
  onBulkAction,
  rowActions,
  bulkActions: customBulkActions,
  getRowId,
  highlightedRowId,
  initialPage = 1,
  initialPageSize = 20,
  onTableReady,
}: DataTableProps<TData>) {
  const pathname = usePathname()
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
    if (typeof window === "undefined") return {}
    const stored = localStorage.getItem(`table-columns-${pathname}`)
    return stored ? JSON.parse(stored) : {}
  })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: initialPage - 1,
    pageSize: initialPageSize,
  })
  
  // Sync pagination state with props when they change (for URL state sync)
  // Use ref to track previous values to avoid unnecessary updates
  const prevInitialPageRef = React.useRef(initialPage)
  const prevInitialPageSizeRef = React.useRef(initialPageSize)
  
  React.useEffect(() => {
    if (manualPagination) {
      // Only update if values actually changed
      if (prevInitialPageRef.current !== initialPage || prevInitialPageSizeRef.current !== initialPageSize) {
        prevInitialPageRef.current = initialPage
        prevInitialPageSizeRef.current = initialPageSize
        // Mark that this is a sync from props, not a user action
        isSyncingFromPropsRef.current = true
        setPagination({
          pageIndex: initialPage - 1,
          pageSize: initialPageSize,
        })
      }
    }
  }, [initialPage, initialPageSize, manualPagination, pagination.pageIndex, pagination.pageSize])

  React.useEffect(() => {
    if (enableColumnVisibility && typeof window !== "undefined") {
      localStorage.setItem(`table-columns-${pathname}`, JSON.stringify(columnVisibility))
    }
  }, [columnVisibility, pathname, enableColumnVisibility])

  const finalColumns = React.useMemo(() => {
    const baseColumns = enableRowSelection
      ? [
          {
            id: "select",
            header: ({ table }: { table: any }) => (
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                  }
                  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                  aria-label="Select all"
                />
              </div>
            ),
            cell: ({ row }: { row: any }) => {
              // Guard against undefined rowSelection when calling getIsSelected
              let isSelected = false
              try {
                isSelected = row.getIsSelected() || false
              } catch (error) {
                // If getIsSelected fails, default to false
                isSelected = false
              }
              return (
              <div className="flex items-center justify-center">
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={(value) => {
                      try {
                        row.toggleSelected(!!value)
                      } catch (error) {
                        // If toggleSelected fails, ignore
                      }
                    }}
                  aria-label="Select row"
                />
              </div>
              )
            },
            enableSorting: false,
            enableHiding: false,
          },
          ...columns,
        ]
      : columns

    if (onRowAction) {
      return [
        ...baseColumns,
        {
          id: "actions",
          header: () => <div className="text-right">Actions</div>,
          cell: ({ row }: { row: any }) => {
            const actions = rowActions
              ? rowActions(row.original)
              : [
                  { label: "View details", action: "view" },
                  { label: "Edit", action: "edit" },
                  { label: "Archive", action: "archive", variant: "destructive" as const },
                ]
            return (
              <div className="flex justify-end">
                <RowActions
                  row={row.original}
                  actions={actions}
                  onAction={onRowAction}
                />
              </div>
            )
          },
          enableSorting: false,
          enableHiding: false,
        },
      ]
    }

    return baseColumns
  }, [columns, enableRowSelection, onRowAction])

  const toolbarProps = {
    searchPlaceholder: "Search...",
    searchKey: undefined,
    filters: [],
  }

  const bulkActions = onBulkAction
    ? customBulkActions || [
        { label: "Archive", action: "archive", variant: "destructive" as const },
      ]
    : []

  // Track previous pagination to detect changes
  const prevPaginationRef = React.useRef<{ pageIndex: number; pageSize: number } | null>(null)
  const isInitialMountRef = React.useRef(true)
  const isSyncingFromPropsRef = React.useRef(false)
  const pendingPaginationChangeRef = React.useRef<{ pageIndex: number; pageSize: number } | null>(null)
  
  // Wrap setPagination - don't call onPaginationChange during render
  const handlePaginationChange = React.useCallback((updater: any) => {
    setPagination((prev) => {
      const newPagination = typeof updater === "function" ? updater(prev) : updater
      // Store the change for useEffect to process (use prev state, not new state)
      pendingPaginationChangeRef.current = { pageIndex: prev.pageIndex, pageSize: prev.pageSize }
      // Mark that this is a user action (not sync from props)
      isSyncingFromPropsRef.current = false
      return newPagination
    })
  }, [])
  
  // Call onPaginationChange after render (in useEffect) to avoid setState during render error
  React.useEffect(() => {
    if (isSyncingFromPropsRef.current) {
      // Reset flag after sync from props is processed
      isSyncingFromPropsRef.current = false
      prevPaginationRef.current = { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }
      pendingPaginationChangeRef.current = null
      return
    }
    
    if (onPaginationChange && manualPagination && !isInitialMountRef.current) {
      const pending = pendingPaginationChangeRef.current
      // Check if pagination changed from the pending change
      if (pending && (pending.pageIndex !== pagination.pageIndex || pending.pageSize !== pagination.pageSize)) {
        onPaginationChange(pagination.pageIndex + 1, pagination.pageSize)
        prevPaginationRef.current = { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }
        pendingPaginationChangeRef.current = null
      }
    } else if (isInitialMountRef.current) {
      // Mark as mounted after first render
      isInitialMountRef.current = false
      prevPaginationRef.current = { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }
    }
  }, [pagination, manualPagination, onPaginationChange])

  // Handle sorting change
  React.useEffect(() => {
    if (onSortingChange && manualSorting) {
      const sort = sorting[0]
      if (sort) {
        onSortingChange({
          field: sort.id,
          direction: sort.desc ? "desc" : "asc",
        })
      } else {
        onSortingChange(null)
      }
    }
  }, [sorting, manualSorting, onSortingChange])

  // Handle filter change
  React.useEffect(() => {
    if (onFilterChange && manualFiltering) {
      const filters: Record<string, any> = {}
      columnFilters.forEach((filter) => {
        filters[filter.id] = filter.value
      })
      onFilterChange(filters)
    }
  }, [columnFilters, manualFiltering, onFilterChange])

  const table = useReactTable({
    data,
    columns: finalColumns,
    getRowId: getRowId || ((row: TData) => {
      // Guard against undefined row
      if (!row) return String(Math.random())
      return (row as any)?.id || String(Math.random())
    }),
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? (rowSelection || {}) : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      pagination,
    },
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: enableRowSelection ? (updater: any) => {
      try {
        if (typeof updater === 'function') {
          setRowSelection((prev) => {
            const newSelection = updater(prev || {})
            return newSelection || {}
          })
        } else {
          setRowSelection(updater || {})
        }
      } catch (error) {
        // If rowSelection update fails, reset to empty object
        setRowSelection({})
      }
    } : undefined,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility ? setColumnVisibility : undefined,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering && !manualFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: enableSorting && !manualSorting ? getSortedRowModel() : undefined,
    getFacetedRowModel: enableFiltering && !manualFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering && !manualFiltering ? getFacetedUniqueValues() : undefined,
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount: manualPagination ? pageCount : undefined,
  })

  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table)
    }
  }, [table, onTableReady])

  return (
    <div className="space-y-4">
      {enableFiltering && showDefaultToolbar && <TableToolbar table={table} {...toolbarProps} />}
      {enableRowSelection && (
        <BulkBar table={table} actions={bulkActions} onAction={onBulkAction} />
      )}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                // Guard against undefined row
                if (!row) return null
                const rowId = row.id
                const isHighlighted = highlightedRowId === rowId
                // Guard against undefined rowSelection when calling getIsSelected
                let isSelected = false
                try {
                  isSelected = row.getIsSelected() || false
                } catch (error) {
                  // If getIsSelected fails, default to false
                  isSelected = false
                }
                return (
                  <TableRow
                    key={rowId}
                    data-state={isSelected && "selected"}
                    data-row-id={rowId}
                    className={isHighlighted ? "bg-primary/10 border-primary border-2" : ""}
                  >
                    {row.getVisibleCells().map((cell) => {
                      // Guard against undefined cell
                      if (!cell) return null
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            ) : (
              <TableEmpty colSpan={finalColumns.length} />
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        table={table}
        manualPagination={manualPagination}
        pageCount={pageCount}
        rowCount={rowCount}
      />
    </div>
  )
}
