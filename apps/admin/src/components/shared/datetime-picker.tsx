"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  onChange?: (date: Date) => void
  className?: string
}

const timePresets = [
  { label: "9:00 AM", value: "09:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "6:00 PM", value: "18:00" },
]

export function DateTimePicker({ value, onChange, className }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [time, setTime] = React.useState<string>(() => {
    if (value) {
      return format(value, "HH:mm")
    }
    return "09:00"
  })

  React.useEffect(() => {
    if (value) {
      setDate(value)
      setTime(format(value, "HH:mm"))
    }
  }, [value])

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const [hours, minutes] = time.split(":").map(Number)
    const newDateTime = new Date(selectedDate)
    newDateTime.setHours(hours, minutes, 0, 0)

    setDate(selectedDate)
    if (onChange) {
      onChange(newDateTime)
    }
  }

  const handleTimeChange = (newTime: string) => {
    setTime(newTime)
    if (date) {
      const [hours, minutes] = newTime.split(":").map(Number)
      const newDateTime = new Date(date)
      newDateTime.setHours(hours, minutes, 0, 0)
      if (onChange) {
        onChange(newDateTime)
      }
    }
  }

  const handlePreset = (presetTime: string) => {
    handleTimeChange(presetTime)
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <Select value={time} onValueChange={handleTimeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timePresets.map((preset) => (
                <SelectItem key={preset.value} value={preset.value}>
                  {preset.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {time === "custom" && (
          <input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        )}
      </div>
    </div>
  )
}
