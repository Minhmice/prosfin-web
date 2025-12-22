"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaGrid } from "./media-grid"
import { MediaListView } from "./media-list-view"
import { MediaUploadDialog } from "./media-upload-dialog"
import { ShareLinkButton } from "@/components/shared/share-link-button"
import { mockMedia } from "@/data/content-mock"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"
import type { MediaAsset } from "@/features/content/types"
import { toast } from "sonner"

export function MediaLibrary() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [media, setMedia] = React.useState<MediaAsset[]>([])
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)

  const params = React.useMemo(() => {
    return parseContentParams(new URLSearchParams(searchParams))
  }, [searchParams])

  const viewMode = params.view || "grid"

  React.useEffect(() => {
    let filtered = [...mockMedia]

    if (params.q) {
      const query = params.q.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          (m.altText && m.altText.toLowerCase().includes(query))
      )
    }

    if (params.type) {
      filtered = filtered.filter((m) => m.type === params.type)
    }

    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter((m) =>
        params.tags!.some((tag) => m.tags.includes(tag))
      )
    }

    setMedia(filtered)
  }, [params])

  const handleViewChange = (view: string) => {
    const newParams = { ...params, view }
    const url = buildContentUrl("/content/media", newParams)
    router.push(url)
  }

  const handleDelete = async (id: string) => {
    try {
      // In real app, call API
      toast.success("Media deleted")
      setMedia((prev) => prev.filter((m) => m.id !== id))
    } catch (error) {
      toast.error("Failed to delete media")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={handleViewChange}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <ShareLinkButton path="/content/media" params={params} size="sm" />
          <Button onClick={() => setIsUploadOpen(true)}>Upload Media</Button>
        </div>
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
        <MediaListView media={media} onDelete={handleDelete} />
      )}

      <MediaUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUploadComplete={() => {
          // Reload media
          setMedia([...mockMedia])
        }}
      />
    </div>
  )
}
