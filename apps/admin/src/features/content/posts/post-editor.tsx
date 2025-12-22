"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  FormProvider,
} from "@/components/ui/form"
import { PostEditorForm } from "./post-editor-form"
import { PostEditorSidebar } from "./post-editor-sidebar"
import { postSchema, type PostFormData } from "@/features/content/schemas"
import { contentProvider } from "@/features/content/data/provider"
import type { Post } from "@/features/content/types"
import { emitActivity } from "@/lib/activity-events"
import { toast } from "sonner"

interface PostEditorProps {
  post?: Post | null
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState(false)
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null)

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      status: post?.status || "draft",
      coverMediaId: post?.coverMediaId || undefined,
      category: post?.category,
      tags: post?.tags || [],
      scheduledAt: post?.scheduledAt,
    },
  })

  // Autosave draft
  React.useEffect(() => {
    if (!post) return

    const subscription = form.watch(() => {
      const timeoutId = setTimeout(async () => {
        try {
          const values = form.getValues()
          await contentProvider.updatePost(post.id, values)
          setLastSaved(new Date())
        } catch (error) {
          // Silent fail for autosave
        }
      }, 2000)

      return () => clearTimeout(timeoutId)
    })

    return () => subscription.unsubscribe()
  }, [form, post])

  const handleSave = async (status?: PostFormData["status"]) => {
    setIsSaving(true)
    try {
      const values = form.getValues()
      const finalStatus = status || values.status

      if (post) {
        await contentProvider.updatePost(post.id, { ...values, status: finalStatus })
        toast.success("Post saved")
      } else {
        const newPost = await contentProvider.createPost({
          ...values,
          status: finalStatus,
          authorId: "author-1",
          authorName: "Admin User",
        })
        emitActivity.postCreated(newPost.id, newPost.title, "Admin User")
        toast.success("Post created")
        router.push(`/content/posts/${newPost.id}/edit`)
      }
      setLastSaved(new Date())
    } catch (error) {
      toast.error("Failed to save post")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (post) {
      await handleSave("published")
      await contentProvider.publishPost(post.id)
      emitActivity.postPublished(post.id, post.title, "Admin User")
    } else {
      const values = form.getValues()
      const newPost = await contentProvider.createPost({
        ...values,
        status: "published",
        authorId: "author-1",
        authorName: "Admin User",
      })
      await contentProvider.publishPost(newPost.id)
      emitActivity.postPublished(newPost.id, newPost.title, "Admin User")
      router.push(`/content/posts/${newPost.id}/edit`)
    }
    toast.success("Post published")
  }

  const handleSchedule = async () => {
    const scheduledAt = form.getValues("scheduledAt")
    if (!scheduledAt) {
      toast.error("Please select a schedule date")
      return
    }

    if (post) {
      await handleSave("scheduled")
      await contentProvider.schedulePost(post.id, scheduledAt)
      emitActivity.postScheduled(post.id, post.title, "Admin User")
    } else {
      const values = form.getValues()
      const newPost = await contentProvider.createPost({
        ...values,
        status: "scheduled",
        scheduledAt,
        authorId: "author-1",
        authorName: "Admin User",
      })
      await contentProvider.schedulePost(newPost.id, scheduledAt)
      emitActivity.postScheduled(newPost.id, newPost.title, "Admin User")
      router.push(`/content/posts/${newPost.id}/edit`)
    }
    toast.success("Post scheduled")
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {post ? "Edit Post" : "New Post"}
              </h1>
              {lastSaved && (
                <p className="text-sm text-muted-foreground mt-1">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave()}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button disabled={isSaving}>
                    {post ? "Update" : "Publish"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handlePublish}>
                    Publish Now
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSchedule}>
                    Schedule...
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSave("draft")}>
                    Save as Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <PostEditorForm />
        </div>
        <div className="w-full lg:w-80 space-y-4">
          <PostEditorSidebar />
        </div>
      </div>
    </FormProvider>
  )
}
