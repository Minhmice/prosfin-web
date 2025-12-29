/**
 * Publish Post
 * POST /api/content/posts/[id]/publish
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const post = await db.post.update({
      where: { id: params.id },
      data: {
        status: "published",
        publishedAt: new Date(),
      },
    })

    return successResponse({
      id: post.id,
      status: post.status,
      publishedAt: post.publishedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Post not found")
    }
    return errorResponse(error.message || "Failed to publish post", 500)
  }
}

