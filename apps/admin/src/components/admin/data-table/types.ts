import type { ColumnDef, Table as TanStackTable } from "@tanstack/react-table";

export type DataTableColumn<T> = ColumnDef<T> & {
  id: string;
  header: string;
  accessorKey?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  filterType?: "text" | "select" | "date";
  filterOptions?: Array<{ label: string; value: string }>;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  enableRowSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  enablePagination?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  // URL state sync (optional controlled mode)
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  pageIndex?: number;
  onPageChange?: (pageIndex: number) => void;
  // Toolbar actions
  filters?: React.ReactNode;
  toolbarRightActions?: React.ReactNode;
}

export interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  rightActions?: React.ReactNode;
}

