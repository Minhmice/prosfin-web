import type { PostStatus } from "@/types"
import { notifySuccess, notifyError } from "@/lib/notify"

export async function setPostStatus(
  postId: string,
  status: PostStatus
): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Post status updated", `Status changed to ${status}`)
    return { success: true }
  } catch (error) {
    notifyError("Failed to update post status", "Please try again")
    return { success: false }
  }
}

export async function archivePost(postId: string): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Post archived", "The post has been moved to archive")
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive post", "Please try again")
    return { success: false }
  }
}

export async function unarchivePost(postId: string): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    notifySuccess("Post unarchived", "The post has been restored")
    return { success: true }
  } catch (error) {
    notifyError("Failed to unarchive post", "Please try again")
    return { success: false }
  }
}

export async function bulkArchivePosts(postIds: string[]): Promise<{ success: boolean }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    notifySuccess(
      `${postIds.length} posts archived`,
      "Selected posts have been moved to archive"
    )
    return { success: true }
  } catch (error) {
    notifyError("Failed to archive posts", "Please try again")
    return { success: false }
  }
}
