/**
 * Cron Tick Endpoint
 * 
 * This endpoint is called by cron jobs (Vercel Cron Jobs or self-hosted cron)
 * to process due schedules and enqueue them for execution.
 * 
 * Vercel Cron Jobs: Configure in vercel.json
 *   {
 *     "crons": [{
 *       "path": "/api/cron/schedule-tick",
 *       "schedule": "*/5 * * * *" // Every 5 minutes
 *     }]
 *   }
 * 
 * Self-hosted: Use Linux cron
 *   */5 * * * * curl -X POST https://your-domain.com/api/cron/schedule-tick -H "Authorization: Bearer YOUR_SECRET"
 * 
 * BullMQ (Phase runtime): Use BullMQ Job Schedulers with cron repeat strategies
 *   https://docs.bullmq.io/guide/jobs/repeatable-jobs
 */

import { NextRequest, NextResponse } from "next/server"
import { contentProvider } from "@/features/content/data/provider"

const CRON_SECRET = process.env.CRON_SECRET || "change-me-in-production"

export async function POST(request: NextRequest) {
  try {
    // Validate secret (from header or query param)
    const authHeader = request.headers.get("authorization")
    const secretParam = request.nextUrl.searchParams.get("secret")
    const providedSecret = authHeader?.replace("Bearer ", "") || secretParam

    if (providedSecret !== CRON_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Find due schedules
    const now = new Date()
    const dueSchedules = await contentProvider.findDueSchedules(now)

    // Stub: Enqueue schedules (in Phase runtime, this would enqueue to BullMQ/Redis)
    const processed: string[] = []
    for (const schedule of dueSchedules) {
      // In production, this would:
      // 1. Update status to "running"
      // 2. Enqueue job to BullMQ/Redis queue
      // 3. Handle retries and error tracking
      
      // For now, just log
      console.log(`[CRON] Enqueueing schedule ${schedule.id} for post ${schedule.postId}`)
      
      // Update status to running (mock)
      await contentProvider.updateSchedule(schedule.id, {
        status: "running",
        attempts: schedule.attempts + 1,
      })
      
      processed.push(schedule.id)
    }

    return NextResponse.json({
      success: true,
      processed: processed.length,
      scheduleIds: processed,
      timestamp: now.toISOString(),
    })
  } catch (error) {
    console.error("[CRON] Error processing schedules:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Allow GET for testing (remove in production)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Schedule tick endpoint",
    method: "POST",
    note: "This endpoint should be called via POST with authorization",
  })
}
