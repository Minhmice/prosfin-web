/**
 * Upload Init Endpoint
 * 
 * POST /api/uploads/init
 * 
 * Validate token/session, validate file metadata, issue upload URL (presigned or Blob token).
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyOnboardingToken } from "@/server/onboarding/token";
import { randomUUID } from "crypto";

/**
 * Allowed MIME types
 */
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
  "image/png",
  "image/jpeg",
  "image/jpg",
];

/**
 * Max file size: 10MB
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Max files per engagement: 50
 */
const MAX_FILES_PER_ENGAGEMENT = 50;

/**
 * POST /api/uploads/init
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, filename, mime, size, engagementId, gateId, classification } = body;

    // Validate token
    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 401 }
      );
    }

    const tokenResult = verifyOnboardingToken(token);
    if (!tokenResult.valid || !tokenResult.leadId) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Validate file metadata
    if (!filename || !mime || !size) {
      return NextResponse.json(
        { error: "Missing file metadata (filename, mime, size)" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum (${MAX_FILE_SIZE / 1024 / 1024}MB)` },
        { status: 400 }
      );
    }

    // TODO: Check file count per engagement (if engagementId provided)
    // const fileCount = await getFileCountByEngagementId(engagementId);
    // if (fileCount >= MAX_FILES_PER_ENGAGEMENT) {
    //   return NextResponse.json(
    //     { error: "Maximum file limit reached for this engagement" },
    //     { status: 400 }
    //   );
    // }

    // Generate file asset ID
    const fileAssetId = randomUUID();

    // Generate storage key
    const storageKey = `engagements/${engagementId || tokenResult.leadId}/${fileAssetId}/${filename}`;

    // TODO: Generate presigned URL (for S3/R2) or Blob token (for Vercel Blob)
    // For MVP, return placeholder
    const uploadUrl = `/api/uploads/upload?fileAssetId=${fileAssetId}&token=${token}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes

    // Create file asset record (pending)
    // TODO: Save to database
    // await prisma.fileAsset.create({
    //   data: {
    //     id: fileAssetId,
    //     engagementId,
    //     gateId,
    //     uploader: "client",
    //     filename,
    //     mime,
    //     size,
    //     storageKey,
    //     storageProvider: "vercel_blob", // or "s3", "r2"
    //     classification: classification || "other",
    //     status: "pending",
    //   },
    // });

    return NextResponse.json({
      fileAssetId,
      uploadUrl,
      expiresAt,
      storageKey,
    });
  } catch (error) {
    console.error("[Upload Init] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

