"use client"

import * as React from "react"
import { MoreVertical, Copy, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MediaAsset } from "@/features/content/types"
import { toast } from "sonner"

interface MediaGridProps {
  media: MediaAsset[]
  onDelete?: (id: string) => void
  onSelect?: (media: MediaAsset) => void
  selectMode?: boolean
}

export function MediaGrid({
  media,
  onDelete,
  onSelect,
  selectMode = false,
}: MediaGridProps) {
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("URL copied to clipboard")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {media.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "relative overflow-hidden cursor-pointer transition-all",
            selectMode && "hover:ring-2 hover:ring-primary"
          )}
          onClick={() => selectMode && onSelect?.(item)}
        >
          <CardContent className="p-0">
            {item.type === "image" ? (
              <div className="aspect-square relative bg-muted">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center bg-muted">
                <div className="text-center">
                  <p className="text-2xl mb-2">📄</p>
                  <p className="text-xs text-muted-foreground truncate px-2">
                    {item.name}
                  </p>
                </div>
              </div>
            )}
            <div className="p-2 space-y-1">
              <p className="text-xs font-medium truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(item.size)}
              </p>
            </div>
            {!selectMode && (
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                      <Copy className="mr-2 size-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 size-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete?.(item.id)}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
