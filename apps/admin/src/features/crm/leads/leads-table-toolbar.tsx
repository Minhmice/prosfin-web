/**
 * Leads Table Toolbar
 * Filters and search
 */

"use client"

import * as React from "react"
import { X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { LeadListQuery } from "@/hooks/use-lead-list-query"

interface LeadsTableToolbarProps {
  query: LeadListQuery
  onSearchChange: (q: string) => void
  onStageChange: (stage: LeadListQuery["stage"]) => void
  onSourceChange: (source: LeadListQuery["source"]) => void
  onOwnerChange: (owner: string | undefined) => void
  onScoreRangeChange: (min: number | undefined, max: number | undefined) => void
  onDateRangeChange: (from: string | undefined, to: string | undefined) => void
  onReset: () => void
}

export function LeadsTableToolbar({
  query,
  onSearchChange,
  onStageChange,
  onSourceChange,
  onOwnerChange,
  onScoreRangeChange,
  onDateRangeChange,
  onReset,
}: LeadsTableToolbarProps) {
  const [searchValue, setSearchValue] = React.useState(query.q || "")
  const [scoreMin, setScoreMin] = React.useState(query.scoreMin?.toString() || "")
  const [scoreMax, setScoreMax] = React.useState(query.scoreMax?.toString() || "")

  React.useEffect(() => {
    setSearchValue(query.q || "")
    setScoreMin(query.scoreMin?.toString() || "")
    setScoreMax(query.scoreMax?.toString() || "")
  }, [query.q, query.scoreMin, query.scoreMax])

  const hasFilters =
    query.q ||
    query.stage ||
    query.source ||
    query.owner ||
    query.scoreMin !== undefined ||
    query.scoreMax !== undefined ||
    query.dateFrom ||
    query.dateTo

  const handleScoreMinChange = (value: string) => {
    setScoreMin(value)
    const num = value ? parseInt(value, 10) : undefined
    onScoreRangeChange(num, query.scoreMax)
  }

  const handleScoreMaxChange = (value: string) => {
    setScoreMax(value)
    const num = value ? parseInt(value, 10) : undefined
    onScoreRangeChange(query.scoreMin, num)
  }

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
          value={query.stage || "all"}
          onValueChange={(value) => onStageChange(value === "all" ? undefined : value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
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
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min score"
            value={scoreMin}
            onChange={(e) => handleScoreMinChange(e.target.value)}
            className="w-24"
            min={0}
            max={100}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max score"
            value={scoreMax}
            onChange={(e) => handleScoreMaxChange(e.target.value)}
            className="w-24"
            min={0}
            max={100}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !query.dateFrom && !query.dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {query.dateFrom && query.dateTo ? (
                `${format(new Date(query.dateFrom), "LLL dd, y")} - ${format(new Date(query.dateTo), "LLL dd, y")}`
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{
                from: query.dateFrom ? new Date(query.dateFrom) : undefined,
                to: query.dateTo ? new Date(query.dateTo) : undefined,
              }}
              onSelect={(range) => {
                onDateRangeChange(
                  range?.from?.toISOString(),
                  range?.to?.toISOString()
                )
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
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
          {query.stage && (
            <Badge variant="secondary" className="gap-1">
              Stage: {query.stage}
              <button
                onClick={() => onStageChange(undefined)}
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
          {(query.scoreMin !== undefined || query.scoreMax !== undefined) && (
            <Badge variant="secondary" className="gap-1">
              Score: {query.scoreMin ?? 0}-{query.scoreMax ?? 100}
              <button
                onClick={() => onScoreRangeChange(undefined, undefined)}
                className="ml-1 rounded-full hover:bg-secondary"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {query.dateFrom && query.dateTo && (
            <Badge variant="secondary" className="gap-1">
              Date: {format(new Date(query.dateFrom), "MMM dd")} - {format(new Date(query.dateTo), "MMM dd")}
              <button
                onClick={() => onDateRangeChange(undefined, undefined)}
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

