/**
 * CRM Client Detail API
 * GET /api/crm/clients/[id] - Get client
 * PUT /api/crm/clients/[id] - Update client
 * DELETE /api/crm/clients/[id] - Delete client
 */

import { NextRequest } from "next/server"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"
import { updateClientSchema } from "@prosfin/shared/schemas"

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

    const client = await db.client.findUnique({
      where: { id: params.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!client) {
      return notFoundResponse("Client not found")
    }

    return successResponse({
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
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to fetch client", 500)
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
    const data = updateClientSchema.parse(body)

    const client = await db.client.update({
      where: { id: params.id },
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        status: data.status,
        ownerId: data.ownerId,
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
    if (error.code === "P2025") {
      return notFoundResponse("Client not found")
    }
    return errorResponse(error.message || "Failed to update client", 500)
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

    await db.client.delete({
      where: { id: params.id },
    })

    return successResponse({ success: true })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    if (error.code === "P2025") {
      return notFoundResponse("Client not found")
    }
    return errorResponse(error.message || "Failed to delete client", 500)
  }
}

