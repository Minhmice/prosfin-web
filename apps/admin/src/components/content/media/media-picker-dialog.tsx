"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MediaGrid } from "./media-grid"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"
import { toast } from "sonner"

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
  const [selectedMedia, setSelectedMedia] = React.useState<MediaAsset | null>(null)

  React.useEffect(() => {
    if (open) {
      const loadMedia = async () => {
        try {
          const result = await contentProvider.listMedia({
            page: 1,
            pageSize: 50,
          })
          setMedia(result.data)
        } catch (error) {
          toast.error("Failed to load media")
        }
      }
      loadMedia()
    }
  }, [open])

  const handleSelect = () => {
    if (selectedMedia) {
      onSelect(selectedMedia)
      onOpenChange(false)
      setSelectedMedia(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose a media file to attach to your post
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto">
            <MediaGrid
              media={media}
              selectMode={true}
              onSelect={setSelectedMedia}
            />
          </div>
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSelect} disabled={!selectedMedia}>
              Select
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

