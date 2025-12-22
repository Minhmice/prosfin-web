/**
 * Finalize Media Upload
 * POST /api/content/media/finalize
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { verifyFileExists } from "@/lib/storage"
import { db } from "@prosfin/db"
import { finalizeMediaSchema } from "@prosfin/shared/schemas"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const data = finalizeMediaSchema.parse(body)

    // Verify file exists in bucket
    const exists = await verifyFileExists(data.key)
    if (!exists) {
      return errorResponse("File not found in storage", 404)
    }

    // Create media asset record
    const media = await db.mediaAsset.create({
      data: {
        type: data.type,
        name: data.name,
        size: data.size,
        mime: data.mime,
        url: data.url,
        key: data.key,
        width: data.width,
        height: data.height,
        createdBy: session.user.id,
      },
    })

    return successResponse({
      id: media.id,
      type: media.type,
      name: media.name,
      size: media.size,
      mime: media.mime,
      url: media.url,
      key: media.key,
      width: media.width,
      height: media.height,
      createdAt: media.createdAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.code === "P2002") {
      return errorResponse("Media key already exists", 409)
    }
    return errorResponse(error.message || "Failed to finalize media upload", 500)
  }
}

