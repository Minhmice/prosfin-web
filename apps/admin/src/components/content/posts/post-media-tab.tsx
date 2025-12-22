"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IconPlus } from "@tabler/icons-react"
import { Image as ImageIcon } from "lucide-react"
import type { Post } from "@/features/content/types"
import { mockMedia } from "@/data/content-mock"

interface PostMediaTabProps {
  post: Post
}

export function PostMediaTab({ post }: PostMediaTabProps) {
  const mediaItems = React.useMemo(() => {
    const items = []
    if (post.coverMediaId) {
      const media = mockMedia.find((m) => m.id === post.coverMediaId)
      if (media) items.push({ ...media, type: "cover" })
    }
    if (post.heroMediaId) {
      const media = mockMedia.find((m) => m.id === post.heroMediaId)
      if (media) items.push({ ...media, type: "hero" })
    }
    return items
  }, [post])

  const handleAttachMedia = () => {
    window.dispatchEvent(
      new CustomEvent("openMediaPicker", { detail: { postId: post.id } })
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Media</h3>
          <p className="text-sm text-muted-foreground">Attached media files</p>
        </div>
        <Button onClick={handleAttachMedia}>
          <IconPlus className="mr-2 size-4" />
          Attach Media
        </Button>
      </div>

      {mediaItems.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <ImageIcon className="mx-auto size-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No media attached</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="size-8 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {item.type} • {item.type}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
