"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  disabled?: boolean
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [hour, setHour] = React.useState<string>(
    value ? value.getHours().toString().padStart(2, "0") : "12"
  )
  const [minute, setMinute] = React.useState<string>(
    value ? value.getMinutes().toString().padStart(2, "0") : "00"
  )

  React.useEffect(() => {
    if (value) {
      setDate(value)
      setHour(value.getHours().toString().padStart(2, "0"))
      setMinute(value.getMinutes().toString().padStart(2, "0"))
    }
  }, [value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setHours(parseInt(hour, 10))
      newDate.setMinutes(parseInt(minute, 10))
      setDate(newDate)
      onChange(newDate)
    } else {
      setDate(undefined)
      onChange(undefined)
    }
  }

  const handleTimeChange = () => {
    if (date) {
      const newDate = new Date(date)
      newDate.setHours(parseInt(hour, 10))
      newDate.setMinutes(parseInt(minute, 10))
      setDate(newDate)
      onChange(newDate)
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP HH:mm") : "Pick a date and time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex items-center gap-2 border-t pt-3">
            <span className="text-sm font-medium">Time:</span>
            <Select value={hour} onValueChange={(v) => {
              setHour(v)
              setTimeout(handleTimeChange, 0)
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm">:</span>
            <Select value={minute} onValueChange={(v) => {
              setMinute(v)
              setTimeout(handleTimeChange, 0)
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
