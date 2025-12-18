"use client"

import * as React from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export function UploadZone({
  onFilesSelected,
  accept,
  multiple = true,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFilesSelected(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    onFilesSelected(files)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
    >
      <Upload className="mx-auto size-12 text-muted-foreground mb-4" />
      <p className="text-sm font-medium mb-2">
        Drag and drop files here, or click to select
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Supports images, videos, and documents
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
      >
        Select Files
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}
