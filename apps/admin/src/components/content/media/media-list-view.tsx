"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { contentProvider } from "@/features/content/data/provider"
import type { MediaAsset } from "@/features/content/types"
import { useMediaListQuery } from "@/hooks/use-media-list-query"
import { toast } from "sonner"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MediaPreviewDialog } from "./media-preview-dialog"
import { MediaUsagePanel } from "./media-usage-panel"

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface MediaListViewProps {
  media: MediaAsset[]
  onDelete?: (id: string) => void
}

export function MediaListView({ media, onDelete }: MediaListViewProps) {
  const [previewMedia, setPreviewMedia] = React.useState<MediaAsset | null>(null)
  const [usageMedia, setUsageMedia] = React.useState<MediaAsset | null>(null)

  const columns = React.useMemo<ColumnDef<MediaAsset>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.type === "image" && (
              <img
                src={row.original.url}
                alt={row.original.altText || row.original.name}
                className="size-10 rounded object-cover"
              />
            )}
            <div>
              <div className="font-medium">{row.original.name}</div>
              {row.original.title && (
                <div className="text-xs text-muted-foreground">{row.original.title}</div>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.type}</Badge>
        ),
      },
      {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => formatFileSize(row.original.size),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
      },
      {
        id: "usedBy",
        header: "Used In",
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.usedInPosts?.length || 0}{" "}
            {(row.original.usedInPosts?.length || 0) === 1 ? "post" : "posts"}
          </span>
        ),
      },
      {
        id: "createdBy",
        header: "Uploaded By",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.createdBy || "Unknown"}</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPreviewMedia(row.original)}>
                <Eye className="mr-2 size-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUsageMedia(row.original)}>
                <ExternalLink className="mr-2 size-4" />
                View Usage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  return (
    <>
      <DataTable
        data={media}
        columns={columns}
        enableRowSelection={false}
        enableColumnVisibility
        enableSorting
        enableFiltering
        onRowAction={(action, row) => {
          if (action === "delete" && onDelete) {
            onDelete(row.id)
          }
        }}
        rowActions={(row) => [
          { label: "Preview", action: "preview" },
          { label: "View Usage", action: "usage" },
          { label: "Delete", action: "delete", variant: "destructive" },
        ]}
      />
      <MediaPreviewDialog
        open={!!previewMedia}
        onOpenChange={(open) => !open && setPreviewMedia(null)}
        media={previewMedia}
      />
      <MediaUsagePanel
        open={!!usageMedia}
        onOpenChange={(open) => !open && setUsageMedia(null)}
        media={usageMedia}
      />
    </>
  )
}

