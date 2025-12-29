"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateTimePicker } from "@/components/shared/datetime-picker"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { IconCheck } from "@tabler/icons-react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockPosts } from "@/data/content-mock"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem, Post } from "@/features/content/types"
import { toast } from "sonner"

const channels = ["facebook", "tiktok", "linkedin", "twitter", "instagram"]

interface ScheduleFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleItem | null
  prefillPostId?: string
  prefillDate?: Date
}

export function ScheduleFormSheet({
  open,
  onOpenChange,
  schedule,
  prefillPostId,
  prefillDate,
}: ScheduleFormSheetProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [postId, setPostId] = React.useState<string>(prefillPostId || schedule?.postId || "")
  const [channel, setChannel] = React.useState<string>(schedule?.channel || "")
  const [scheduledAt, setScheduledAt] = React.useState<Date>(
    prefillDate || schedule?.scheduledAt || new Date()
  )
  const [assignee, setAssignee] = React.useState<string>(schedule?.assignee || "")
  const [utmLink, setUtmLink] = React.useState<string>(schedule?.utmLink || "")
  const [postOpen, setPostOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    const urlPostId = searchParams.get("postId")
    const urlAction = searchParams.get("action")
    if (urlPostId && urlAction === "create" && open) {
      setPostId(urlPostId)
    }
    const urlDate = searchParams.get("runAt")
    if (urlDate && open) {
      setScheduledAt(new Date(urlDate))
    }
  }, [searchParams, open])

  const selectedPost = React.useMemo(() => {
    return mockPosts.find((p) => p.id === postId)
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postId || !channel || !scheduledAt) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      if (schedule) {
        await contentProvider.reschedule(schedule.postId, scheduledAt)
        toast.success("Schedule updated")
      } else {
        await contentProvider.schedulePost(postId, scheduledAt)
        toast.success("Schedule created")
      }
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error("Failed to save schedule")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{schedule ? "Edit Schedule" : "Create Schedule"}</SheetTitle>
          <SheetDescription>
            Schedule a post for publishing on a specific channel
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post">Post *</Label>
            <Popover open={postOpen} onOpenChange={setPostOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedPost ? selectedPost.title : "Select post..."}
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search posts..." />
                  <CommandEmpty>No posts found.</CommandEmpty>
                  <CommandGroup>
                    {mockPosts.map((post) => (
                      <CommandItem
                        key={post.id}
                        value={post.id}
                        onSelect={() => {
                          setPostId(post.id)
                          setPostOpen(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            "mr-2 size-4",
                            postId === post.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {post.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel">Channel *</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger id="channel">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                {channels.map((ch) => (
                  <SelectItem key={ch} value={ch} className="capitalize">
                    {ch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date & Time *</Label>
            <DateTimePicker value={scheduledAt} onChange={setScheduledAt} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="utmLink">UTM Link</Label>
            <Input
              id="utmLink"
              value={utmLink}
              onChange={(e) => setUtmLink(e.target.value)}
              placeholder="Optional UTM tracking link"
            />
          </div>

          <SheetFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {schedule ? "Update" : "Create"} Schedule
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
