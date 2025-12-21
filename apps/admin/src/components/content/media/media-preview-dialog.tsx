"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import type { MediaAsset } from "@/features/content/types"

interface MediaPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: MediaAsset | null
}

export function MediaPreviewDialog({
  open,
  onOpenChange,
  media,
}: MediaPreviewDialogProps) {
  if (!media) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative w-full h-full">
          {media.type === "image" ? (
            <img
              src={media.url}
              alt={media.altText || media.name}
              className="w-full h-full object-contain"
            />
          ) : media.type === "video" ? (
            <video
              src={media.url}
              controls
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">
                Preview not available for {media.type} files.
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:underline"
                >
                  Open in new tab
                </a>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

