/**
 * Storage Helper
 * MinIO/S3 presigned URL generation
 */

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { env } from "./env"

function generateUUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

const s3Client = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  forcePathStyle: true, // Required for MinIO
})

/**
 * Generate presigned PUT URL for upload
 */
export async function generatePresignedPutUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<{ url: string; key: string; expiresAt: Date }> {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn })

  return {
    url,
    key,
    expiresAt: new Date(Date.now() + expiresIn * 1000),
  }
}

/**
 * Generate unique key for file
 */
export function generateFileKey(
  filename: string,
  prefix: string = "media"
): string {
  const ext = filename.split(".").pop()
  const uuid = generateUUID()
  const timestamp = Date.now()
  return `${prefix}/${timestamp}-${uuid}.${ext}`
}

/**
 * Verify file exists in bucket (optional check)
 */
export async function verifyFileExists(key: string): Promise<boolean> {
  try {
    const command = new GetObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: key,
    })
    await s3Client.send(command)
    return true
  } catch {
    return false
  }
}

