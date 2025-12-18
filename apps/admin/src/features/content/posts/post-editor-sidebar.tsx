"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { DateTimePicker } from "@/components/shared/date-time-picker"
import { MediaPickerDialog } from "@/components/content/media-picker-dialog"
import { CategorySelect } from "@/components/content/taxonomy/category-select"
import { TagsCombobox } from "@/components/content/taxonomy/tags-combobox"
import { contentProvider } from "../../data/provider"
import type { PostFormData } from "../../schemas"
import type { MediaAsset } from "../../types"

function CoverMediaPicker() {
  const form = useFormContext<PostFormData>()
  const [isPickerOpen, setIsPickerOpen] = React.useState(false)
  const [coverMedia, setCoverMedia] = React.useState<MediaAsset | null>(null)
  const coverMediaId = form.watch("coverMediaId")

  React.useEffect(() => {
    if (coverMediaId) {
      // In real app, would fetch media by ID
      // For now, just set placeholder
      setCoverMedia(null)
    } else {
      setCoverMedia(null)
    }
  }, [coverMediaId])

  const handleSelect = (media: MediaAsset) => {
    form.setValue("coverMediaId", media.id)
    setCoverMedia(media)
  }

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="coverMediaId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Media</FormLabel>
            <div className="space-y-2">
              {coverMediaId && (
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Image className="size-8 text-muted-foreground" />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsPickerOpen(true)}
              >
                <Image className="mr-2 size-4" />
                Choose Cover Image
              </Button>
            </div>
            <FormControl>
              <input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <MediaPickerDialog
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        onSelect={handleSelect}
      />
    </div>
  )
}

export function PostEditorSidebar() {
  const form = useFormContext<PostFormData>()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>Set the post status</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Schedule publication date</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taxonomy</CardTitle>
          <CardDescription>Category and tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CategorySelect />
          <Separator />
          <TagsCombobox />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cover Image</CardTitle>
          <CardDescription>Set featured image</CardDescription>
        </CardHeader>
        <CardContent>
          <CoverMediaPicker />
        </CardContent>
      </Card>
    </div>
  )
}
