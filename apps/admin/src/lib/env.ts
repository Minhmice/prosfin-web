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

function getEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n")
      throw new Error(`❌ Missing or invalid environment variables:\n${missingVars}`)
    }
    throw error
  }
}

export const env = getEnv()

