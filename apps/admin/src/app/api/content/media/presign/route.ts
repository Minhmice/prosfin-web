/**
 * Presign Media Upload
 * POST /api/content/media/presign
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { generatePresignedPutUrl, generateFileKey } from "@/lib/storage"
import { presignMediaSchema } from "@prosfin/shared/schemas"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const data = presignMediaSchema.parse(body)

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (data.size > maxSize) {
      return errorResponse("File size exceeds 10MB limit", 400)
    }

    // Generate unique key
    const key = generateFileKey(data.name, "media")

    // Generate presigned URL
    const { url, expiresAt } = await generatePresignedPutUrl(
      key,
      data.mime,
      3600 // 1 hour
    )

    return successResponse({
      url,
      key,
      expiresAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    return errorResponse(error.message || "Failed to generate presigned URL", 500)
  }
}

