/**
 * Media Assets API
 * GET /api/content/media - List media assets
 * DELETE /api/content/media - Delete media asset
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { parseQuery } from "@/lib/query-parser"
import { buildWhereClause, buildOrderBy, paginateQuery } from "@/lib/db-query"
import { db } from "@prosfin/db"
import { z } from "zod"

const deleteMediaSchema = z.object({
  id: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const searchParams = request.nextUrl.searchParams
    const parsed = parseQuery(searchParams)

    const where = buildWhereClause(parsed.filters, ["name", "mime"])
    const orderBy = buildOrderBy(parsed.sort) || { createdAt: "desc" }

    const media = await db.mediaAsset.findMany({
      ...paginateQuery({ where, orderBy }, parsed.page, parsed.pageSize),
    })

    const total = await db.mediaAsset.count({ where })

    const totalPages = Math.ceil(total / parsed.pageSize)

    type MediaAsset = typeof media[0]

    return successResponse(
      media.map((m: MediaAsset) => ({
        id: m.id,
        type: m.type,
        name: m.name,
        size: m.size,
        mime: m.mime,
        url: m.url,
        key: m.key,
        width: m.width,
        height: m.height,
        createdAt: m.createdAt,
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
    return errorResponse(error.message || "Failed to fetch media", 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const { id } = deleteMediaSchema.parse(body)

    await db.mediaAsset.delete({
      where: { id },
    })

    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Media not found")
    }
    return errorResponse(error.message || "Failed to delete media", 500)
  }
}

