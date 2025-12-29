/**
 * CRM Lead Detail API
 * GET /api/crm/leads/[id] - Get lead
 * PUT /api/crm/leads/[id] - Update lead
 * DELETE /api/crm/leads/[id] - Delete lead
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"
import { updateLeadSchema } from "@prosfin/shared/schemas"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const lead = await db.lead.findUnique({
      where: { id: params.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        attribution: true,
      },
    })

    if (!lead) {
      return notFoundResponse("Lead not found")
    }

    type LeadTag = typeof lead["tags"][0]

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
      utmCampaign: lead.attribution?.utmCampaign,
      tags: lead.tags.map((lt: LeadTag) => lt.tag.name),
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to fetch lead", 500)
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const body = await request.json()
    const data = updateLeadSchema.parse(body)

    const lead = await db.lead.update({
      where: { id: params.id },
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        status: data.status,
        source: data.source,
        ownerId: data.ownerId,
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
    if (error.code === "P2025") {
      return notFoundResponse("Lead not found")
    }
    return errorResponse(error.message || "Failed to update lead", 500)
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const session = await getServerSession()
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    await db.lead.delete({
      where: { id: params.id },
    })

    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Lead not found")
    }
    return errorResponse(error.message || "Failed to delete lead", 500)
  }
}

