/**
 * Leads Table Toolbar
 * Filters and search
 */

"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LeadListQuery } from "@/hooks/use-lead-list-query"
import { ColumnsMenu } from "@/components/table/columns-menu"
import type { Table as TanStackTable } from "@tanstack/react-table"
import type { Lead } from "@prosfin/shared"

interface LeadsTableToolbarProps {
  query: LeadListQuery
  onSearchChange: (q: string) => void
  onStatusChange: (status: LeadListQuery["status"]) => void
  onSourceChange: (source: LeadListQuery["source"]) => void
  onOwnerChange: (owner: string | undefined) => void
  onReset: () => void
  table?: TanStackTable<Lead>
}

export function LeadsTableToolbar({
  query,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onOwnerChange,
  onReset,
  table,
}: LeadsTableToolbarProps) {
  const [searchValue, setSearchValue] = React.useState(query.q || "")

  React.useEffect(() => {
    setSearchValue(query.q || "")
  }, [query.q])

  const hasFilters =
    query.q ||
    query.status ||
    query.source ||
    query.owner

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="Search leads..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            onSearchChange(e.target.value)
          }}
          className="max-w-sm"
        />
        <Select
          value={query.status || "all"}
          onValueChange={(value) => onStatusChange(value === "all" ? undefined : value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={query.source || "all"}
          onValueChange={(value) => onSourceChange(value === "all" ? undefined : value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" onClick={onReset} size="sm">
            <X className="mr-2 size-4" />
            Reset
          </Button>
        )}
        {table && <ColumnsMenu table={table} />}
      </div>
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {query.q && (
            <Badge variant="secondary" className="gap-1">
              Search: {query.q}
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 rounded-full hover:bg-secondary"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {query.status}
              <button
                onClick={() => onStatusChange(undefined)}
                className="ml-1 rounded-full hover:bg-secondary"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.source && (
            <Badge variant="secondary" className="gap-1">
              Source: {query.source}
              <button
                onClick={() => onSourceChange(undefined)}
                className="ml-1 rounded-full hover:bg-secondary"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.owner && (
            <Badge variant="secondary" className="gap-1">
              Owner: {query.owner}
              <button
                onClick={() => onOwnerChange(undefined)}
                className="ml-1 rounded-full hover:bg-secondary"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

