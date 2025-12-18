/**
 * Public Leads API
 * POST /api/public/leads - Create lead from marketing form
 */

import { NextRequest } from "next/server"
import { successResponse, errorResponse } from "@/lib/api-response"
import { db } from "@prosfin/db"
import { createLeadWithAttributionSchema } from "@prosfin/shared/schemas"

// Simple in-memory rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 }) // 1 minute window
    return true
  }

  if (record.count >= 5) {
    // Max 5 requests per minute
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return errorResponse("Too many requests", 429)
    }

    const body = await request.json()
    
    // Honeypot check (if field exists and has value, it's a bot)
    if (body.honeypot) {
      return successResponse({ success: true }) // Silent fail for bots
    }

    const data = createLeadWithAttributionSchema.parse(body)

    // Create lead
    const lead = await db.lead.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        status: "new",
        source: data.source || "website",
      },
    })

    // Create attribution if provided
    if (data.attribution) {
      await db.leadAttribution.create({
        data: {
          leadId: lead.id,
          utmSource: data.attribution.utmSource,
          utmMedium: data.attribution.utmMedium,
          utmCampaign: data.attribution.utmCampaign,
          utmTerm: data.attribution.utmTerm,
          utmContent: data.attribution.utmContent,
          referrer: data.attribution.referrer,
          landingPath: data.attribution.landingPath,
          userAgent: data.attribution.userAgent,
        },
      })
    }

    return successResponse({
      id: lead.id,
      success: true,
    })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return errorResponse("Validation error", 400)
    }
    // Don't expose internal errors to public
    return errorResponse("Failed to submit form", 500)
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

