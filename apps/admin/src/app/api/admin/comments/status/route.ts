/**
 * Admin Comments Status API
 * PATCH /api/admin/comments/status - Update comment status (bulk)
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { contentProvider } from "@/features/content/data/provider"
import { z } from "zod"

const updateStatusSchema = z.object({
  ids: z.array(z.string()).min(1),
  status: z.enum(["pending", "approved", "rejected", "spam", "trash", "open", "resolved"]),
  reason: z.string().optional(),
})

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const { ids, status, reason } = updateStatusSchema.parse(body)

    await contentProvider.updateStatus(ids, status, reason)

    return successResponse({ success: true, count: ids.length })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    return errorResponse(error.message || "Failed to update status", 500)
  }
}

