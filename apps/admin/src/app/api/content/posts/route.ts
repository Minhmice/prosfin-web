/**
 * Content Posts API
 * GET /api/content/posts - List posts
 * POST /api/content/posts - Create post
 */

import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQuery } from "@/lib/query-parser"
import { buildWhereClause, buildOrderBy, paginateQuery } from "@/lib/db-query"
import { db } from "@prosfin/db"
import { createPostSchema, postFilterSchema } from "@prosfin/shared/schemas"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const searchParams = request.nextUrl.searchParams
    const filters = postFilterSchema.parse(Object.fromEntries(searchParams))
    const parsed = parseQuery(searchParams)

    const where = buildWhereClause(parsed.filters, ["title", "slug", "excerpt"])
    const orderBy = buildOrderBy(parsed.sort)

    const [posts, total] = await Promise.all([
      db.post.findMany({
        ...paginateQuery({ where, orderBy }, parsed.page, parsed.pageSize),
        include: {
          author: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      db.post.count({ where }),
    ])

    const totalPages = Math.ceil(total / parsed.pageSize)

    return successResponse(
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        status: post.status,
        content: post.content,
        coverMediaId: post.coverMediaId,
        categoryId: post.categoryId,
        category: post.category?.name,
        tags: post.tags.map((pt) => pt.tag.name),
        authorId: post.authorId,
        authorName: post.author.name || post.author.email,
        scheduledAt: post.scheduledAt,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
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
    return errorResponse(error.message || "Failed to fetch posts", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "content_editor"])

    const body = await request.json()
    const data = createPostSchema.parse({
      ...body,
      authorId: session.user.id,
    })

    const post = await db.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status,
        coverMediaId: data.coverMediaId,
        categoryId: data.categoryId,
        authorId: data.authorId,
        scheduledAt: data.scheduledAt,
      },
    })

    return successResponse({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      status: post.status,
      content: post.content,
      coverMediaId: post.coverMediaId,
      categoryId: post.categoryId,
      tags: [],
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    if (error.code === "P2002") {
      return errorResponse("Slug already exists", 409)
    }
    return errorResponse(error.message || "Failed to create post", 500)
  }
}

