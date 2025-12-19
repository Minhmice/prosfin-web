/**
 * CRM Clients API
 * GET /api/crm/clients - List clients
 * POST /api/crm/clients - Create client
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQuery } from "@/lib/query-parser"
import { buildWhereClause, buildOrderBy, paginateQuery } from "@/lib/db-query"
import { db } from "@prosfin/db"
import { createClientSchema, clientFilterSchema } from "@prosfin/shared/schemas"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const searchParams = request.nextUrl.searchParams
    const filters = clientFilterSchema.parse(Object.fromEntries(searchParams))
    const parsed = parseQuery(searchParams)

    const where = buildWhereClause(parsed.filters, ["name", "company", "email"])
    const orderBy = buildOrderBy(parsed.sort)

    const [clients, total] = await Promise.all([
      db.client.findMany({
        ...paginateQuery({ where, orderBy }, parsed.page, parsed.pageSize),
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      db.client.count({ where }),
    ])

    const totalPages = Math.ceil(total / parsed.pageSize)

    return successResponse(
      clients.map((client) => ({
        id: client.id,
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        status: client.status,
        ownerId: client.ownerId,
        tags: client.tags.map((ct) => ct.tag.name),
        lastContactedAt: client.lastContactedAt,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
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
    return errorResponse(error.message || "Failed to fetch clients", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const body = await request.json()
    const data = createClientSchema.parse(body)

    const client = await db.client.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        status: data.status,
        ownerId: data.ownerId || session.user.id,
        tags: {
          create: data.tags.map((tagName) => {
            // In a real app, you'd lookup or create the tag first
            // For now, we'll skip tag creation
            return {} as any
          }),
        },
      },
    })

    return successResponse({
      id: client.id,
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      status: client.status,
      ownerId: client.ownerId,
      tags: [],
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    return errorResponse(error.message || "Failed to create client", 500)
  }
}

