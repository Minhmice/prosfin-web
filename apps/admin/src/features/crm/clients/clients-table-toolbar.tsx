/**
 * Clients Table Toolbar
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
import { OwnerCombobox } from "./owner-combobox"
import { TagsMultiSelect } from "./tags-multi-select"
import type { ClientListQuery } from "@/hooks/use-client-list-query"

interface ClientsTableToolbarProps {
  query: ClientListQuery
  onSearchChange: (q: string) => void
  onStatusChange: (status: ClientListQuery["status"]) => void
  onOwnerChange: (owner: string | undefined) => void
  onTagsChange: (tags: string[]) => void
  onReset: () => void
}

export function ClientsTableToolbar({
  query,
  onSearchChange,
  onStatusChange,
  onOwnerChange,
  onTagsChange,
  onReset,
}: ClientsTableToolbarProps) {
  const [searchValue, setSearchValue] = React.useState(query.q || "")

  React.useEffect(() => {
    setSearchValue(query.q || "")
  }, [query.q])

  const hasFilters = query.q || query.status || query.owner || (query.tags && query.tags.length > 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="Search clients..."
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
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <OwnerCombobox
          value={query.owner}
          onValueChange={onOwnerChange}
        />
        <TagsMultiSelect
          value={query.tags}
          onValueChange={onTagsChange}
        />
        {hasFilters && (
          <Button variant="ghost" onClick={onReset} size="sm">
            <X className="mr-2 size-4" />
            Reset
          </Button>
        )}
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
          {query.tags && query.tags.length > 0 && (
            <>
              {query.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  Tag: {tag}
                  <button
                    onClick={() => onTagsChange(query.tags?.filter((t) => t !== tag) || [])}
                    className="ml-1 rounded-full hover:bg-secondary"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

