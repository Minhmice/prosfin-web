"use client"

import * as React from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface RangeSelectorProps {
  range: "week" | "month" | "custom"
  from?: string
  to?: string
  onRangeChange: (range: "week" | "month" | "custom") => void
  onDateChange: (from?: string, to?: string) => void
}

export function RangeSelector({
  range,
  from,
  to,
  onRangeChange,
  onDateChange,
}: RangeSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [fromDate, setFromDate] = React.useState<Date | undefined>(
    from ? new Date(from) : undefined
  )
  const [toDate, setToDate] = React.useState<Date | undefined>(
    to ? new Date(to) : undefined
  )

  React.useEffect(() => {
    if (from) setFromDate(new Date(from))
    if (to) setToDate(new Date(to))
  }, [from, to])

  const handleRangeSelect = (value: "week" | "month" | "custom") => {
    onRangeChange(value)
    if (value === "week") {
      const now = new Date()
      const weekFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const weekTo = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      onDateChange(weekFrom.toISOString(), weekTo.toISOString())
    } else if (value === "month") {
      const now = new Date()
      const monthFrom = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthTo = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      onDateChange(monthFrom.toISOString(), monthTo.toISOString())
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!fromDate) {
      setFromDate(date)
    } else if (!toDate && date && date >= fromDate) {
      setToDate(date)
      onDateChange(fromDate.toISOString(), date.toISOString())
      setIsOpen(false)
    } else {
      setFromDate(date)
      setToDate(undefined)
    }
  }

  const displayText = React.useMemo(() => {
    if (range === "custom" && fromDate && toDate) {
      return `${format(fromDate, "MMM d")} - ${format(toDate, "MMM d")}`
    }
    return range === "week" ? "This Week" : range === "month" ? "This Month" : "Custom Range"
  }, [range, fromDate, toDate])

  return (
    <div className="flex items-center gap-2">
      <Select value={range} onValueChange={handleRangeSelect}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {range === "custom" && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 size-4" />
              {displayText}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3 space-y-3">
              <div className="text-sm font-medium">Select Date Range</div>
              <CalendarComponent
                mode="single"
                selected={toDate || fromDate}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
