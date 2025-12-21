"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DataTable } from "@/components/table"
import type { ColumnDef } from "@tanstack/react-table"
import type { MediaAsset } from "@/features/content/types"
import { contentProvider } from "@/features/content/data/provider"
import type { Post } from "@/features/content/types"
import { format } from "date-fns"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaUsagePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: MediaAsset | null
}

export function MediaUsagePanel({
  open,
  onOpenChange,
  media,
}: MediaUsagePanelProps) {
  const router = useRouter()
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    if (media && media.usedInPosts.length > 0) {
      const loadPosts = async () => {
        try {
          const allPosts = await Promise.all(
            media.usedInPosts.map((postId) => contentProvider.getPost(postId))
          )
          setPosts(allPosts.filter((p): p is Post => p !== null))
        } catch (error) {
          // Handle error
        }
      }
      loadPosts()
    } else {
      setPosts([])
    }
  }, [media])

  const columns = React.useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => format(new Date(row.original.updatedAt), "MMM d, yyyy"),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/content/posts/${row.original.id}/edit`)}
          >
            <ExternalLink className="mr-2 size-4" />
            Open
          </Button>
        ),
      },
    ],
    [router]
  )

  if (!media) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Media Usage</SheetTitle>
          <SheetDescription>
            Posts using {media.name}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">This media is not used in any posts</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={posts}
              isLoading={false}
              selectedRows={[]}
              onSelectedRowsChange={() => {}}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

