/**
 * Schedule Post
 * POST /api/content/posts/[id]/schedule
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"
import { z } from "zod"

const scheduleSchema = z.object({
  scheduledAt: z.coerce.date(),
  channel: z.string().optional(),
})

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

    const body = await request.json()
    const data = scheduleSchema.parse(body)

    const post = await db.post.update({
      where: { id: params.id },
      data: {
        status: "scheduled",
        scheduledAt: data.scheduledAt,
      },
    })

    // Create schedule record
    await db.schedule.create({
      data: {
        postId: post.id,
        scheduledAt: data.scheduledAt,
        status: "queued",
        channel: data.channel,
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
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.code === "P2025") {
      return notFoundResponse("Post not found")
    }
    return errorResponse(error.message || "Failed to schedule post", 500)
  }
}

