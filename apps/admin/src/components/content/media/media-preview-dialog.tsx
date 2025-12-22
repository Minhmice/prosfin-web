"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/table"
import type { ColumnDef } from "@tanstack/react-table"
import { IconExternalLink } from "@tabler/icons-react"
import type { MediaAsset, Post } from "@/features/content/types"
import { mockPosts } from "@/data/content-mock"
import { format } from "date-fns"

interface MediaPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: MediaAsset | null
}

const postColumns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Post",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.status}</Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            window.location.href = `/content/posts/${row.original.id}/edit`
          }}
        >
          <IconExternalLink className="mr-2 size-4" />
          Open
        </Button>
      )
    },
  },
]

export function MediaPreviewDialog({
  open,
  onOpenChange,
  media,
}: MediaPreviewDialogProps) {
  const router = useRouter()
  const [usedInPosts, setUsedInPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    if (media && media.usedInPosts) {
      const posts = mockPosts.filter((p) => {
        return media.usedInPosts.includes(p.id)
      })
      setUsedInPosts(posts)
    } else {
      setUsedInPosts([])
    }
  }, [media])

  if (!media) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{media.name}</DialogTitle>
          <DialogDescription>Media preview and details</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-4">
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={media.altText || media.name}
                className="w-full h-auto rounded-lg border"
              />
            ) : media.type === "video" ? (
              <video src={media.url} controls className="w-full rounded-lg border" />
            ) : (
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <p className="text-muted-foreground">
                  Preview not available for {media.type} files.
                </p>
              </div>
            )}
          </div>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 pr-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Metadata</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Type</span>
                    <Badge variant="outline">{media.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Size</span>
                    <span className="text-sm">
                      {(media.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  {media.altText && (
                    <div>
                      <span className="text-sm font-medium">Alt Text</span>
                      <p className="text-sm text-muted-foreground">{media.altText}</p>
                    </div>
                  )}
                  {media.tags && media.tags.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Tags</span>
                      <div className="flex gap-1 mt-1">
                        {media.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {media.license && (
                    <div>
                      <span className="text-sm font-medium">License</span>
                      <p className="text-sm text-muted-foreground">{media.license}</p>
                    </div>
                  )}
                  {media.source && (
                    <div>
                      <span className="text-sm font-medium">Source</span>
                      <p className="text-sm text-muted-foreground">{media.source}</p>
                    </div>
                  )}
                </div>
              </div>
              {usedInPosts.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">
                    Used in {usedInPosts.length} post{usedInPosts.length !== 1 ? "s" : ""}
                  </div>
                  <DataTable
                    data={usedInPosts}
                    columns={postColumns}
                    enableRowSelection={false}
                    enableColumnVisibility={false}
                    enableSorting={false}
                    enableFiltering={false}
                    initialPageSize={5}
                  />
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

