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
  pageCount,
  rowCount,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableSorting = true,
  enableFiltering = true,
  onRowAction,
  onBulkAction,
  rowActions,
  bulkActions: customBulkActions,
}: DataTableProps<TData>) {
  const pathname = usePathname()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
    if (typeof window === "undefined") return {}
    const stored = localStorage.getItem(`table-columns-${pathname}`)
    return stored ? JSON.parse(stored) : {}
  })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

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
            cell: ({ row }: { row: any }) => (
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={row.getIsSelected()}
                  onCheckedChange={(value) => row.toggleSelected(!!value)}
                  aria-label="Select row"
                />
              </div>
            ),
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

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      pagination,
    },
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility ? setColumnVisibility : undefined,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering ? getFacetedUniqueValues() : undefined,
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
  })

  return (
    <div className="space-y-4">
      {enableFiltering && <TableToolbar table={table} {...toolbarProps} />}
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
