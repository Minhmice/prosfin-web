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
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ScheduleStatus } from "../../types"

interface ScheduleFiltersProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  status?: ScheduleStatus
  onStatusChange: (status?: ScheduleStatus) => void
  channel?: string
  onChannelChange: (channel?: string) => void
  postId?: string
  onReset: () => void
}

export function ScheduleFilters({
  searchQuery,
  onSearchChange,
  status,
  onStatusChange,
  channel,
  onChannelChange,
  postId,
  onReset,
}: ScheduleFiltersProps) {
  const hasFilters = searchQuery || status || channel || postId

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Input
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Select
        value={status || "all"}
        onValueChange={(value) =>
          onStatusChange(value === "all" ? undefined : (value as ScheduleStatus))
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="running">Running</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={channel || "all"}
        onValueChange={(value) =>
          onChannelChange(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Channels</SelectItem>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="linkedin">LinkedIn</SelectItem>
          <SelectItem value="twitter">Twitter</SelectItem>
        </SelectContent>
      </Select>
      {postId && (
        <Badge variant="secondary" className="gap-1">
          Post: {postId}
          <button
            onClick={() => onChannelChange(undefined)}
            className="ml-1 hover:bg-destructive/20 rounded-full"
          >
            <X className="size-3" />
          </button>
        </Badge>
      )}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear filters
        </Button>
      )}
    </div>
  )
}
