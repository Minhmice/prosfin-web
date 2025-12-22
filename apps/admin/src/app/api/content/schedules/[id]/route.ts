/**
 * Schedule Detail API
 * PATCH /api/content/schedules/[id] - Update schedule
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { contentProvider } from "@/features/content/data/provider"
import { z } from "zod"

const updateScheduleSchema = z.object({
  runAt: z.string().datetime().optional(),
  status: z.enum(["pending", "running", "done", "failed", "canceled"]).optional(),
})

export async function PATCH(
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

    const body = await request.json()
    const data = updateScheduleSchema.parse(body)

    const updateData: Partial<{ runAt: Date; status: string }> = {}
    if (data.runAt) {
      updateData.runAt = new Date(data.runAt)
    }
    if (data.status) {
      updateData.status = data.status
    }

    const schedule = await contentProvider.updateSchedule(params.id, updateData as any)

    return successResponse(schedule)
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.message === "Schedule not found") {
      return notFoundResponse("Schedule not found")
    }
    return errorResponse(error.message || "Failed to update schedule", 500)
  }
}

