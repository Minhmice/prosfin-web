"use client"

import * as React from "react"
import { use } from "react"
import { PostEditor } from "@/features/content/posts/post-editor"
import { contentProvider } from "@/features/content/data/provider"
import type { Post } from "@/features/content/types"
import { PageBody } from "@/components/shared/page-body"

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params)
  const [post, setPost] = React.useState<Post | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        const loadedPost = await contentProvider.getPost(id)
        setPost(loadedPost)
      } catch (error) {
        console.error("Failed to load post", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [id])

  if (isLoading) {
    return (
      <PageBody>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </PageBody>
    )
  }

  if (!post) {
    return (
      <PageBody>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Post not found</p>
        </div>
      </PageBody>
    )
  }

  return (
    <PageBody>
      <PostEditor post={post} />
    </PageBody>
  )
}
