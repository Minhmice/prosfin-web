"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MediaGrid } from "./media-grid"
import { MediaListView } from "./media-list-view"
import { MediaToolbar } from "./media-toolbar"
import { MediaUploadDialog } from "./media-upload-dialog"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"
import { useMediaListQuery } from "@/hooks/use-media-list-query"
import { toast } from "sonner"

export function MediaLibrary() {
  const { query, updateQuery, updateSearch, resetFilters } = useMediaListQuery()
  const [media, setMedia] = React.useState<MediaAsset[]>([])
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)
  const viewMode = query.view || "grid"

  const loadMedia = React.useCallback(async () => {
    try {
      const from = query.from ? new Date(query.from) : undefined
      const to = query.to ? new Date(query.to) : undefined

      const result = await contentProvider.listMedia({
        q: query.q,
        type: query.type,
        tag: query.tag,
        used: query.used,
        from,
        to,
        sort: query.sort,
        page: query.page,
        pageSize: query.pageSize,
      })
      setMedia(result.data)
    } catch (error) {
      toast.error("Failed to load media")
    }
  }, [query])

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
      <div className="flex items-center justify-between">
        <MediaToolbar
          query={query}
          onQueryChange={updateQuery}
          onSearchChange={updateSearch}
          onResetFilters={resetFilters}
          viewMode={viewMode}
          onViewModeChange={(mode) => updateQuery({ view: mode })}
        />
        <Button onClick={() => setIsUploadOpen(true)}>
          Upload Media
        </Button>
      </div>

      {viewMode === "grid" ? (
        media.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No media files found</p>
          </div>
        ) : (
          <MediaGrid media={media} onDelete={handleDelete} />
        )
      ) : (
        <MediaListView />
      )}

      <MediaUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  )
}
