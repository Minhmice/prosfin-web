/**
 * Environment Variables Validation
 * Fail-fast validation using Zod
 */

import { z } from "zod"

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  
  // Auth
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_URL: z.string().url().optional(),
  
  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  
  // Storage (MinIO/S3)
  S3_ENDPOINT: z.string().url("S3_ENDPOINT must be a valid URL"),
  S3_ACCESS_KEY: z.string().min(1, "S3_ACCESS_KEY is required"),
  S3_SECRET_KEY: z.string().min(1, "S3_SECRET_KEY is required"),
  S3_BUCKET: z.string().min(1, "S3_BUCKET is required"),
  S3_REGION: z.string().default("us-east-1"),
  
  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export type Env = z.infer<typeof envSchema>

/**
 * Check if we're in build phase
 * Next.js sets NEXT_PHASE during build
 */
function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build" || 
         process.env.NEXT_PHASE === "phase-development-build" ||
         process.env.NEXT_PHASE === "phase-export"
}

function getEnv(): Env {
  // Skip validation during build phase to allow build to complete
  if (isBuildPhase()) {
    // Return a partial env object with defaults for build
    return {
      DATABASE_URL: process.env.DATABASE_URL || "postgresql://localhost:5432/db",
      AUTH_SECRET: process.env.AUTH_SECRET || "default-secret-key-for-build-only-min-32-chars",
      AUTH_URL: process.env.AUTH_URL,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      S3_ENDPOINT: process.env.S3_ENDPOINT || "http://localhost:9000",
      S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || "minioadmin",
      S3_SECRET_KEY: process.env.S3_SECRET_KEY || "minioadmin",
      S3_BUCKET: process.env.S3_BUCKET || "default-bucket",
      S3_REGION: process.env.S3_REGION || "us-east-1",
      NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
    } as Env
  }

  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((e: any) => `${(e.path || []).join(".")}: ${e.message || ""}`).join("\n")
      throw new Error(`❌ Missing or invalid environment variables:\n${missingVars}`)
    }
    throw error
  }
}

export const env = getEnv()

