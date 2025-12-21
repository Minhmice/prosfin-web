/**
 * Media Upload API
 * POST /api/content/media/upload - Upload media file to local filesystem
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export const runtime = "nodejs" // Required for filesystem access

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIMES = ["image/", "video/", "application/pdf"]

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return errorResponse("No file provided", 400)
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`, 400)
    }

    // Validate mime type
    const isValidMime = ALLOWED_MIMES.some((mime) => file.type.startsWith(mime))
    if (!isValidMime) {
      return errorResponse("Invalid file type. Allowed: images, videos, PDFs", 400)
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "media")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}-${sanitizedName}`
    const filepath = join(uploadsDir, filename)

    // Save file to filesystem
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Return file info (in real implementation, create MediaAsset record in DB)
    const url = `/uploads/media/${filename}`

    return successResponse({
      id: `media-${timestamp}`,
      filename,
      url,
      size: file.size,
      mime: file.type,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to upload file", 500)
  }
}

