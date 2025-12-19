/**
 * Comments API
 * GET /api/content/comments - List comments
 * PATCH /api/content/comments - Update comment status
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQuery } from "@/lib/query-parser"
import { buildWhereClause, buildOrderBy, paginateQuery } from "@/lib/db-query"
import { db } from "@prosfin/db"
import { commentFilterSchema, updateCommentSchema } from "@prosfin/shared/schemas"
import { z } from "zod"

const updateCommentBodySchema = z.object({
  id: z.string(),
  status: updateCommentSchema.shape.status,
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const searchParams = request.nextUrl.searchParams
    const filters = commentFilterSchema.parse(Object.fromEntries(searchParams))
    const parsed = parseQuery(searchParams)

    const where = buildWhereClause(parsed.filters, ["authorName", "content"])
    const orderBy = buildOrderBy(parsed.sort) || { createdAt: "desc" }

    const [comments, total] = await Promise.all([
      db.comment.findMany({
        ...paginateQuery({ where, orderBy }, parsed.page, parsed.pageSize),
        include: {
          post: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      db.comment.count({ where }),
    ])

    const totalPages = Math.ceil(total / parsed.pageSize)

    return successResponse(
      comments.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        postTitle: comment.post.title,
        authorName: comment.authorName,
        authorEmail: comment.authorEmail,
        content: comment.content,
        status: comment.status,
        createdAt: comment.createdAt,
      })),
      {
        page: parsed.page,
        pageSize: parsed.pageSize,
        total,
        totalPages,
      }
    )
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to fetch comments", 500)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const { id, status } = updateCommentBodySchema.parse(body)

    const comment = await db.comment.update({
      where: { id },
      data: { status },
    })

    return successResponse({
      id: comment.id,
      status: comment.status,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.code === "P2025") {
      return errorResponse("Comment not found", 404)
    }
    return errorResponse(error.message || "Failed to update comment", 500)
  }
}

