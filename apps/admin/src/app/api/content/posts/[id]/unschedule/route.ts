/**
 * Unschedule Post
 * POST /api/content/posts/[id]/unschedule
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const post = await db.post.update({
      where: { id: params.id },
      data: {
        status: "draft",
        scheduledAt: null,
      },
    })

    // Cancel scheduled records
    await db.schedule.updateMany({
      where: {
        postId: post.id,
        status: "queued",
      },
      data: {
        status: "cancelled",
      },
    })

    return successResponse({
      id: post.id,
      status: post.status,
      scheduledAt: post.scheduledAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Post not found")
    }
    return errorResponse(error.message || "Failed to unschedule post", 500)
  }
}

