"use client"

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Table as TanStackTable } from "@tanstack/react-table"
import type { TablePaginationProps } from "./types"

export function TablePagination<TData>({
  table,
  manualPagination = false,
  pageCount,
  rowCount,
}: TablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = manualPagination && pageCount ? pageCount : table.getPageCount()
  
  // Guard against null/undefined row models
  let filteredRowModel
  let totalRows = 0
  try {
    filteredRowModel = table.getFilteredRowModel()
    totalRows = manualPagination && rowCount ? rowCount : (filteredRowModel?.rows?.length ?? 0)
  } catch (error) {
    totalRows = manualPagination && rowCount ? rowCount : 0
  }

  // Guard against null/undefined selected row model
  let selectedCount = 0
  try {
    const selectedModel = table.getFilteredSelectedRowModel()
    selectedCount = selectedModel?.rows?.length ?? 0
  } catch (error) {
    selectedCount = 0
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:block">
        {selectedCount} of{" "}
        {totalRows} row(s) selected.
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 lg:gap-4">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="hidden text-sm font-medium xl:block">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="h-8 w-16 lg:w-20" id="rows-per-page">
              <SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex shrink-0 items-center justify-center text-sm font-medium">
          <span className="hidden sm:inline">Page </span>
          {currentPage} <span className="hidden sm:inline">of {totalPages}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 shrink-0"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 shrink-0"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 shrink-0 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
