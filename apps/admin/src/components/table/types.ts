import type { ColumnDef, Table as TanStackTable } from "@tanstack/react-table"

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  manualPagination?: boolean
  pageCount?: number
  rowCount?: number
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableSorting?: boolean
  enableFiltering?: boolean
  onRowAction?: (action: string, row: TData) => void
  onBulkAction?: (action: string, rows: TData[]) => void
  rowActions?: (row: TData) => Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }>
  bulkActions?: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }>
}

export interface TableToolbarProps<TData> {
  table: TanStackTable<TData>
  searchPlaceholder?: string
  searchKey?: string
  filters?: Array<{
    key: string
    label: string
    options: Array<{ label: string; value: string }>
  }>
}

export interface TablePaginationProps<TData> {
  table: TanStackTable<TData>
  manualPagination?: boolean
  pageCount?: number
  rowCount?: number
}

export interface BulkBarProps<TData> {
  table: TanStackTable<TData>
  actions?: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }>
  onAction?: (action: string, rows: TData[]) => void
}

export interface RowActionsProps<TData> {
  row: TData
  actions?: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }>
  onAction?: (action: string, row: TData) => void
}
