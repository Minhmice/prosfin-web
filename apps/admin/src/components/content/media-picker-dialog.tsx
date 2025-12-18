"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MediaGrid } from "./media/media-grid"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"

interface MediaPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (media: MediaAsset) => void
}

export function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
}: MediaPickerDialogProps) {
  const [media, setMedia] = React.useState<MediaAsset[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    if (open) {
      const loadMedia = async () => {
        const result = await contentProvider.listMedia({
          q: searchQuery || undefined,
          type: "image",
          page: 1,
          pageSize: 50,
        })
        setMedia(result.data)
      }
      loadMedia()
    }
  }, [open, searchQuery])

  const handleSelect = (selectedMedia: MediaAsset) => {
    onSelect(selectedMedia)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose Cover Image</DialogTitle>
          <DialogDescription>
            Select an image from your media library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-[500px] overflow-y-auto">
            <MediaGrid
              media={media}
              selectMode
              onSelect={handleSelect}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
