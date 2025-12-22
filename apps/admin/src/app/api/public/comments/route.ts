/**
 * Public Comments API
 * POST /api/public/comments - Create public comment (ingestion)
 */

import { NextRequest } from "next/server"
import { successResponse, errorResponse } from "@/lib/api-response"
import { z } from "zod"

const createCommentSchema = z.object({
  postId: z.string(),
  authorName: z.string().min(1),
  authorEmail: z.string().email().optional(),
  body: z.string().min(1),
  source: z.enum(["facebook", "tiktok", "linkedin", "web"]).optional(),
  parentId: z.string().optional(),
})

// Placeholder for spam classification (Phase sau)
async function classifySpam(body: string, authorEmail?: string): Promise<boolean> {
  // Phase sau: integrate với Akismet/Turnstile
  // For now, simple keyword check
  const spamKeywords = ["buy now", "click here", "free money"]
  return spamKeywords.some((keyword) => body.toLowerCase().includes(keyword))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createCommentSchema.parse(body)

    // Anti-spam check
    const isSpam = await classifySpam(data.body, data.authorEmail)
    const status = isSpam ? "spam" : "pending"

    // In real implementation:
    // 1. Save to database
    // 2. Send notification if pending
    // 3. Return created comment

    return successResponse({
      id: `comment-${Date.now()}`,
      postId: data.postId,
      channel: "public",
      status,
      author: {
        name: data.authorName,
        email: data.authorEmail,
        source: data.source || "web",
      },
      body: data.body,
      parentId: data.parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    return errorResponse(error.message || "Failed to create comment", 500)
  }
}

