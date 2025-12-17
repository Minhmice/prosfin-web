"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@prosfin/ui";
import type { Table } from "@tanstack/react-table";

export interface TablePaginationProps<T> {
  table: Table<T>;
}

export function TablePagination<T>({ table }: TablePaginationProps<T>) {
  // Safely get selected count - may not be available if row selection is disabled
  let selectedCount = 0;
  try {
    const selectedModel = table.getFilteredSelectedRowModel?.();
    if (selectedModel && (selectedModel.rows || selectedModel.flatRows)) {
      selectedCount = (selectedModel.rows || selectedModel.flatRows)?.length ?? 0;
    }
  } catch {
    // Row selection not enabled, default to 0
    selectedCount = 0;
  }

  // Safely get total count
  let totalCount = 0;
  try {
    const filteredModel = table.getFilteredRowModel();
    if (filteredModel && (filteredModel.rows || filteredModel.flatRows)) {
      totalCount = (filteredModel.rows || filteredModel.flatRows)?.length ?? 0;
    }
  } catch {
    totalCount = 0;
  }

  // Safely get pagination state
  let paginationState: any = null;
  try {
    const state = table.getState?.();
    paginationState = state?.pagination;
  } catch {
    // Pagination state not available
  }
  
  const pageIndex = paginationState?.pageIndex ?? 0;
  const pageSize = paginationState?.pageSize ?? 10;
  
  let pageCount = 1;
  try {
    pageCount = table.getPageCount?.() ?? 1;
  } catch {
    // Page count not available
  }
  
  let canPreviousPage = false;
  let canNextPage = false;
  try {
    canPreviousPage = table.getCanPreviousPage?.() ?? false;
    canNextPage = table.getCanNextPage?.() ?? false;
  } catch {
    // Navigation state not available
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {selectedCount} of {totalCount} row(s) selected.
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex?.(0)}
          disabled={!canPreviousPage}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage?.()}
          disabled={!canPreviousPage}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage?.()}
          disabled={!canNextPage}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex?.(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

