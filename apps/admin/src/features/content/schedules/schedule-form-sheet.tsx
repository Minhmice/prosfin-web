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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PostCombobox } from "./post-combobox"
import { DateTimePicker } from "@/components/shared/date-time-picker"
import { scheduleSchema, type ScheduleFormData } from "@/features/content/schemas"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"
import { toast } from "sonner"

interface ScheduleFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleItem | null
  defaultPostId?: string
  defaultRunAt?: Date
  onSuccess?: () => void
}

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
      runAt: schedule?.runAt || defaultRunAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
      timezone: schedule?.timezone || "Asia/Bangkok",
      channels: schedule?.channels || [],
      action: schedule?.action || "publish",
    },
  })

  React.useEffect(() => {
    if (schedule) {
      form.reset({
        postId: schedule.postId,
        runAt: schedule.runAt,
      })
    } else if (defaultPostId || defaultRunAt) {
      form.reset({
        postId: defaultPostId || "",
        runAt: defaultRunAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
    }
  }, [schedule, defaultPostId, defaultRunAt, form])

  const onSubmit = async (data: ScheduleFormData) => {
    try {
      if (schedule) {
        await contentProvider.reschedule(schedule.postId, data.runAt)
        toast.success("Schedule updated")
      } else {
        // Create new schedule via post scheduling
        const post = await contentProvider.getPost(data.postId)
        if (post) {
          await contentProvider.schedulePost(data.postId, data.runAt)
          toast.success("Schedule created")
        }
      }
      onSuccess?.()
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to save schedule")
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
              name="runAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Date & Time</FormLabel>
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

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
