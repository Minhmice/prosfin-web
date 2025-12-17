"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AdminSkeleton,
  AdminEmptyState,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  cn,
} from "@prosfin/ui";
import { Columns } from "lucide-react";
import { TableToolbar } from "./table-toolbar";
import { TablePagination } from "./table-pagination";
import type { DataTableProps } from "./types";

export function AppDataTable<T>({
  columns,
  data,
  isLoading = false,
  onRowClick,
  enableRowSelection = false,
  onSelectionChange,
  enablePagination = true,
  pageSize = 10,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  emptyStateTitle,
  emptyStateDescription,
  // Controlled props for URL state sync
  searchValue: controlledSearchValue,
  onSearchChange: controlledOnSearchChange,
  pageIndex: controlledPageIndex,
  onPageChange: controlledOnPageChange,
  // Toolbar actions
  toolbarRightActions,
}: DataTableProps<T>) {
  // Use controlled or internal state
  const [internalSearchValue, setInternalSearchValue] = React.useState("");
  const searchValue = controlledSearchValue ?? internalSearchValue;
  const setSearchValue = controlledOnSearchChange ?? setInternalSearchValue;
  
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Debounce search (only if not controlled)
  React.useEffect(() => {
    if (controlledSearchValue !== undefined) {
      // If controlled, update globalFilter immediately
      setGlobalFilter(controlledSearchValue);
      return;
    }
    // Otherwise, debounce
    const timer = setTimeout(() => {
      setGlobalFilter(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, controlledSearchValue]);

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<T>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageSize,
        pageIndex: controlledPageIndex ?? 0,
      },
    },
    state: {
      globalFilter,
      columnVisibility,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      pagination: controlledPageIndex !== undefined
        ? { pageIndex: controlledPageIndex, pageSize }
        : undefined,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onPaginationChange: controlledOnPageChange
      ? (updater) => {
          const newPageIndex =
            typeof updater === "function"
              ? updater({ pageIndex: controlledPageIndex ?? 0, pageSize }).pageIndex ?? 0
              : updater.pageIndex ?? 0;
          controlledOnPageChange(newPageIndex);
        }
      : undefined,
    enableRowSelection: enableRowSelection,
  });

  // Notify parent of selection changes
  React.useEffect(() => {
    if (enableRowSelection && onSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, enableRowSelection, onSelectionChange, table]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <AdminSkeleton variant="rectangular" className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <AdminSkeleton key={i} variant="rectangular" className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder={searchPlaceholder}
          rightActions={toolbarRightActions}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns className="mr-2 size-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columns.find((c) => c.id === column.id)?.header || column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableRowSelection && (
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="size-4 rounded border-input"
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const isSelected = enableRowSelection ? row.getIsSelected() : false;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? "selected" : undefined}
                    className={cn(
                      onRowClick && "cursor-pointer",
                      isSelected && "bg-muted/50"
                    )}
                    onClick={(e) => {
                      // Don't trigger row click if clicking checkbox
                      if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
                        return;
                      }
                      onRowClick?.(row.original);
                    }}
                  >
                    {enableRowSelection && row.getToggleSelectedHandler && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={row.getToggleSelectedHandler()}
                          onClick={(e) => e.stopPropagation()}
                          className="size-4 rounded border-input"
                        />
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <AdminEmptyState 
                    title={emptyStateTitle || emptyMessage}
                    description={emptyStateDescription}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}

