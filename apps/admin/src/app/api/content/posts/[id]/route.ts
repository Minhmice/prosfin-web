/**
 * Content Post Detail API
 * GET /api/content/posts/[id] - Get post
 * PATCH /api/content/posts/[id] - Update post
 * DELETE /api/content/posts/[id] - Delete post
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"
import { updatePostSchema } from "@prosfin/shared/schemas"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const post = await db.post.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!post) {
      return notFoundResponse("Post not found")
    }

    return successResponse({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      status: post.status,
      content: post.content,
      coverMediaId: post.coverMediaId,
      categoryId: post.categoryId,
      category: post.category?.name,
      tags: post.tags.map((pt) => pt.tag.name),
      authorId: post.authorId,
      authorName: post.author.name || post.author.email,
      scheduledAt: post.scheduledAt,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to fetch post", 500)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const data = updatePostSchema.parse(body)

    const post = await db.post.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status,
        coverMediaId: data.coverMediaId,
        categoryId: data.categoryId,
        scheduledAt: data.scheduledAt,
      },
    })

    return successResponse({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      status: post.status,
      content: post.content,
      coverMediaId: post.coverMediaId,
      categoryId: post.categoryId,
      tags: [],
      authorId: post.authorId,
      scheduledAt: post.scheduledAt,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.code === "P2025") {
      return notFoundResponse("Post not found")
    }
    if (error.code === "P2002") {
      return errorResponse("Slug already exists", 409)
    }
    return errorResponse(error.message || "Failed to update post", 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    await db.post.delete({
      where: { id: params.id },
    })

    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Post not found")
    }
    return errorResponse(error.message || "Failed to delete post", 500)
  }
}

