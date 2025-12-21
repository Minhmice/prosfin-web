"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CommentListQuery } from "@/hooks/use-comment-list-query"
import { toast } from "sonner"

interface CommentFiltersProps {
  query: CommentListQuery
  onQueryChange: (updates: Partial<CommentListQuery>) => void
  onSearchChange: (q: string) => void
  onResetFilters: () => void
}

export function CommentFilters({
  query,
  onQueryChange,
  onSearchChange,
  onResetFilters,
}: CommentFiltersProps) {
  const hasActiveFilters =
    query.q || query.status || query.source || query.postId

  const handleShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard")
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="Search comments..."
          value={query.q || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={query.status || "all"}
          onValueChange={(value) =>
            onQueryChange({ status: value === "all" ? undefined : value as any, page: 1 })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {query.channel === "public" ? (
              <>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="trash">Trash</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        {query.channel === "public" && (
          <Select
            value={query.source || "all"}
            onValueChange={(value) =>
              onQueryChange({ source: value === "all" ? undefined : value, page: 1 })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="web">Web</SelectItem>
            </SelectContent>
          </Select>
        )}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onResetFilters}>
            <X className="mr-2 size-4" />
            Reset
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={handleShareLink}>
          <Share2 className="mr-2 size-4" />
          Share Link
        </Button>
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
          {query.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {query.status}
              <button
                onClick={() => onQueryChange({ status: undefined, page: 1 })}
                className="ml-1 hover:bg-muted rounded"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.source && (
            <Badge variant="secondary" className="gap-1">
              Source: {query.source}
              <button
                onClick={() => onQueryChange({ source: undefined, page: 1 })}
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

