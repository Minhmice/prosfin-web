/**
 * Media Serve API
 * GET /api/content/media/[id] - Serve media file from local filesystem
 */

import { NextRequest } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { notFoundResponse, errorResponse } from "@/lib/api-response"

export const runtime = "nodejs" // Required for filesystem access

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    // In real implementation, look up media by ID in DB to get filename
    // For now, assume filename is the ID
    const filename = params.id
    const filepath = join(process.cwd(), "public", "uploads", "media", filename)

    if (!existsSync(filepath)) {
      return notFoundResponse("Media file not found")
    }

    const fileBuffer = await readFile(filepath)

    // Determine content type from file extension
    const ext = filename.split(".").pop()?.toLowerCase()
    const contentTypeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      mp4: "video/mp4",
      pdf: "application/pdf",
    }
    const contentType = contentTypeMap[ext || ""] || "application/octet-stream"

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    return errorResponse(error.message || "Failed to serve file", 500)
  }
}

