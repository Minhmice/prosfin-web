/**
 * Convert Lead to Client
 * POST /api/crm/leads/[id]/convert
 */

import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { requireRole, unauthorizedResponse } from "@/lib/rbac"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return unauthorizedResponse()
    }

    requireRole(session, ["admin", "crm_manager"])

    const lead = await db.lead.findUnique({
      where: { id: params.id },
    })

    if (!lead) {
      return notFoundResponse("Lead not found")
    }

    // Create client from lead
    const client = await db.client.create({
      data: {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        status: "active",
        ownerId: lead.ownerId || session.user.id,
      },
    })

    // Update lead status to converted
    await db.lead.update({
      where: { id: params.id },
      data: {
        status: "converted",
      },
    })

    return successResponse({
      client: {
        id: client.id,
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        status: client.status,
        createdAt: client.createdAt,
      },
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return unauthorizedResponse()
    }
    return errorResponse(error.message || "Failed to convert lead", 500)
  }
}

