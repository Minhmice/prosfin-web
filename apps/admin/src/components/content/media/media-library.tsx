"use client"

import * as React from "react"
import { Grid3x3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MediaGrid } from "./media-grid"
import { MediaUploadDialog } from "./media-upload-dialog"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"
import { toast } from "sonner"

type ViewMode = "grid" | "table"

export function MediaLibrary() {
  const [media, setMedia] = React.useState<MediaAsset[]>([])
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<string>("all")

  const loadMedia = React.useCallback(async () => {
    try {
      const result = await contentProvider.listMedia({
        q: searchQuery || undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
        page: 1,
        pageSize: 100,
      })
      setMedia(result.data)
    } catch (error) {
      toast.error("Failed to load media")
    }
  }, [searchQuery, typeFilter])

  React.useEffect(() => {
    loadMedia()
  }, [loadMedia])

  const handleDelete = async (id: string) => {
    try {
      await contentProvider.deleteMedia(id)
      toast.success("Media deleted")
      loadMedia()
    } catch (error) {
      toast.error("Failed to delete media")
    }
  }

  const handleUploadComplete = () => {
    loadMedia()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="file">Files</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          >
            {viewMode === "grid" ? <List className="size-4" /> : <Grid3x3 className="size-4" />}
          </Button>
          <Button onClick={() => setIsUploadOpen(true)}>
            Upload Media
          </Button>
        </div>
      </div>

      {media.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No media files found</p>
        </div>
      ) : (
        <MediaGrid
          media={media}
          onDelete={handleDelete}
        />
      )}

      <MediaUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  )
}
