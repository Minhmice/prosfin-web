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
import { Progress } from "@/components/ui/progress"
import { UploadZone } from "./upload-zone"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"
import { emitActivity } from "@/lib/activity-events"
import { toast } from "sonner"

interface MediaUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete?: (media: MediaAsset[]) => void
}

interface UploadProgress {
  file: File
  progress: number
  status: "uploading" | "success" | "error"
}

export function MediaUploadDialog({
  open,
  onOpenChange,
  onUploadComplete,
}: MediaUploadDialogProps) {
  const [uploads, setUploads] = React.useState<UploadProgress[]>([])
  const [isUploading, setIsUploading] = React.useState(false)

  const handleFilesSelected = async (files: File[]) => {
    setIsUploading(true)
    const newUploads: UploadProgress[] = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }))
    setUploads(newUploads)

    // Simulate upload progress
    for (let i = 0; i < newUploads.length; i++) {
      const upload = newUploads[i]
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploads((prev) =>
          prev.map((u, idx) =>
            idx === i ? { ...u, progress } : u
          )
        )
      }
    }

    try {
      const uploaded = await contentProvider.uploadMedia(files)
      setUploads((prev) =>
        prev.map((u) => ({ ...u, status: "success" as const }))
      )
      uploaded.forEach((media) => {
        emitActivity.mediaUploaded(media.id, media.name, "admin")
      })
      toast.success(`${uploaded.length} file(s) uploaded`)
      onUploadComplete?.(uploaded)
      setTimeout(() => {
        setUploads([])
        setIsUploading(false)
        onOpenChange(false)
      }, 1000)
    } catch (error) {
      setUploads((prev) =>
        prev.map((u) => ({ ...u, status: "error" as const }))
      )
      toast.error("Upload failed")
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Upload images, videos, or documents to your media library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {uploads.length === 0 ? (
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept="image/*,video/*,.pdf,.doc,.docx"
              multiple
            />
          ) : (
            <div className="space-y-3">
              {uploads.map((upload, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate flex-1">{upload.file.name}</span>
                    <span className="text-muted-foreground ml-2">
                      {upload.progress}%
                    </span>
                  </div>
                  <Progress value={upload.progress} />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
