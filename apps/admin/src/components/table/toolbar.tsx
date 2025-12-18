"use client"

import { IconX } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Table as TanStackTable } from "@tanstack/react-table"
import type { TableToolbarProps } from "./types"
import { ColumnsMenu } from "./columns-menu"

export function TableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
  searchKey,
  filters = [],
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleResetFilters = () => {
    table.resetColumnFilters()
    table.setGlobalFilter("")
  }

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-4 lg:px-6">
      <div className="flex flex-1 items-center gap-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filters.map((filter) => {
          const column = table.getColumn(filter.key)
          if (!column) return null

          return (
            <Select
              key={filter.key}
              value={(column.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => {
                if (value === "all") {
                  column.setFilterValue(undefined)
                } else {
                  column.setFilterValue(value)
                }
              }}
            >
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <IconX className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <ColumnsMenu table={table} />
    </div>
  )
}
