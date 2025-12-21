"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PostCombobox } from "./post-combobox"
import { DateTimePicker } from "@/components/shared/date-time-picker"
import { scheduleSchema, type ScheduleFormData } from "../schemas"
import { contentProvider } from "../data/provider"
import type { ScheduleItem } from "../types"
import { toast } from "sonner"

interface ScheduleFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleItem | null
  defaultPostId?: string
  defaultRunAt?: Date
  onSuccess?: () => void
}

const CHANNELS = [
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter" },
  { id: "instagram", label: "Instagram" },
]

const TIME_PRESETS = [
  { label: "9:00 AM", value: "09:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "6:00 PM", value: "18:00" },
  { label: "9:00 PM", value: "21:00" },
]

export function ScheduleFormSheet({
  open,
  onOpenChange,
  schedule,
  defaultPostId,
  defaultRunAt,
  onSuccess,
}: ScheduleFormSheetProps) {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      postId: schedule?.postId || defaultPostId || "",
      channels: schedule?.channels || [],
      action: schedule?.action || "publish",
      runAt: schedule?.runAt || defaultRunAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
      timezone: schedule?.timezone || "Asia/Bangkok",
      notes: undefined,
    },
  })

  React.useEffect(() => {
    if (schedule) {
      form.reset({
        postId: schedule.postId,
        channels: schedule.channels,
        action: schedule.action,
        runAt: schedule.runAt,
        timezone: schedule.timezone,
        notes: undefined,
      })
    } else if (defaultPostId || defaultRunAt) {
      form.reset({
        postId: defaultPostId || "",
        channels: [],
        action: "publish",
        runAt: defaultRunAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
        timezone: "Asia/Bangkok",
        notes: undefined,
      })
    }
  }, [schedule, defaultPostId, defaultRunAt, form])

  const onSubmit = async (data: ScheduleFormData) => {
    try {
      if (schedule) {
        await contentProvider.updateSchedule(schedule.id, data)
        toast.success("Schedule updated")
      } else {
        await contentProvider.createSchedule({
          ...data,
          status: "pending",
          attempts: 0,
          createdBy: "admin",
        })
        toast.success("Schedule created")
      }
      onSuccess?.()
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to save schedule")
    }
  }

  const handleDuplicate = async () => {
    const data = form.getValues()
    try {
      await contentProvider.createSchedule({
        ...data,
        runAt: new Date(data.runAt.getTime() + 7 * 24 * 60 * 60 * 1000),
        status: "pending",
        attempts: 0,
        createdBy: "admin",
      })
      toast.success("Schedule duplicated")
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to duplicate schedule")
    }
  }

  const handleCancel = async () => {
    if (!schedule) return
    try {
      await contentProvider.cancelSchedule(schedule.id)
      toast.success("Schedule canceled")
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to cancel schedule")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{schedule ? "Edit Schedule" : "New Schedule"}</SheetTitle>
          <SheetDescription>
            {schedule
              ? "Update schedule details"
              : "Create a new schedule for publishing posts"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <FormField
              control={form.control}
              name="postId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post</FormLabel>
                  <FormControl>
                    <PostCombobox
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channels"
              render={() => (
                <FormItem>
                  <FormLabel>Channels</FormLabel>
                  <div className="space-y-2">
                    {CHANNELS.map((channel) => (
                      <FormField
                        key={channel.id}
                        control={form.control}
                        name="channels"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(channel.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, channel.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== channel.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {channel.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="publish">Publish</SelectItem>
                      <SelectItem value="unpublish">Unpublish</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="runAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Run Date & Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Asia/Bangkok">Asia/Bangkok</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add any notes about this schedule..."
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-2 pt-4">
              <div>
                {schedule && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel Schedule
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {schedule && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDuplicate}
                  >
                    Duplicate
                  </Button>
                )}
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
