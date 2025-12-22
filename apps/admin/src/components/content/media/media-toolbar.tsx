"use client"

import * as React from "react"
import { Grid3x3, List, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { MediaListQuery } from "@/hooks/use-media-list-query"

interface MediaToolbarProps {
  query: MediaListQuery
  onQueryChange: (updates: Partial<MediaListQuery>) => void
  onSearchChange: (q: string) => void
  onResetFilters: () => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function MediaToolbar({
  query,
  onQueryChange,
  onSearchChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
}: MediaToolbarProps) {
  const hasActiveFilters =
    query.q || query.type || query.tag || query.used !== undefined

  const handleShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      // Toast will be handled by parent
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Search media..."
            value={query.q || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={query.type || "all"}
            onValueChange={(value) =>
              onQueryChange({ type: value === "all" ? undefined : value as any, page: 1 })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="file">Files</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={query.used === undefined ? "all" : query.used ? "used" : "unused"}
            onValueChange={(value) =>
              onQueryChange({
                used: value === "all" ? undefined : value === "used",
                page: 1,
              })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="unused">Unused</SelectItem>
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onResetFilters}>
              <X className="mr-2 size-4" />
              Reset
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="size-4" /> : <Grid3x3 className="size-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareLink}>
            <Share2 className="mr-2 size-4" />
            Share Link
          </Button>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {query.q && (
            <Badge variant="secondary" className="gap-1">
              Search: {query.q}
              <button
                onClick={() => onQueryChange({ q: undefined, page: 1 })}
                className="ml-1 hover:bg-muted rounded"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.type && (
            <Badge variant="secondary" className="gap-1">
              Type: {query.type}
              <button
                onClick={() => onQueryChange({ type: undefined, page: 1 })}
                className="ml-1 hover:bg-muted rounded"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.used !== undefined && (
            <Badge variant="secondary" className="gap-1">
              {query.used ? "Used" : "Unused"}
              <button
                onClick={() => onQueryChange({ used: undefined, page: 1 })}
                className="ml-1 hover:bg-muted rounded"
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

