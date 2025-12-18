/**
 * CRM Leads API
 * GET /api/crm/leads - List leads
 * POST /api/crm/leads - Create lead
 */

import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQuery } from "@/lib/query-parser"
import { buildWhereClause, buildOrderBy, paginateQuery } from "@/lib/db-query"
import { db } from "@prosfin/db"
import { createLeadSchema, leadFilterSchema } from "@prosfin/shared/schemas"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const searchParams = request.nextUrl.searchParams
    const filters = leadFilterSchema.parse(Object.fromEntries(searchParams))
    const parsed = parseQuery(searchParams)

    const where = buildWhereClause(parsed.filters, ["name", "company", "email"])
    const orderBy = buildOrderBy(parsed.sort)

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        ...paginateQuery({ where, orderBy }, parsed.page, parsed.pageSize),
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          attribution: true,
        },
      }),
      db.lead.count({ where }),
    ])

    const totalPages = Math.ceil(total / parsed.pageSize)

    return successResponse(
      leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        interest: lead.interest,
        status: lead.status,
        source: lead.source,
        ownerId: lead.ownerId,
        utmCampaign: lead.attribution?.utmCampaign,
        tags: lead.tags.map((lt) => lt.tag.name),
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
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
    return errorResponse(error.message || "Failed to fetch leads", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const body = await request.json()
    const data = createLeadSchema.parse(body)

    const lead = await db.lead.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        status: data.status,
        source: data.source,
        ownerId: data.ownerId || session.user.id,
        utmCampaign: data.utmCampaign,
      },
    })

    return successResponse({
      id: lead.id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      interest: lead.interest,
      status: lead.status,
      source: lead.source,
      ownerId: lead.ownerId,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    return errorResponse(error.message || "Failed to create lead", 500)
  }
}

