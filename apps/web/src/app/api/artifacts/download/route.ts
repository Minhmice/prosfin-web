/**
 * Artifact Download Endpoint
 * 
 * GET /api/artifacts/download?artifactId=...
 * 
 * Generate signed URL for artifact download (PDF).
 */

import { NextRequest, NextResponse } from "next/server";
import { getArtifactById } from "@/server/delivery/artifact.service";

/**
 * GET /api/artifacts/download
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artifactId = searchParams.get("artifactId");

    if (!artifactId) {
      return NextResponse.json(
        { error: "Missing artifactId parameter" },
        { status: 400 }
      );
    }

    // Get artifact
    const artifact = await getArtifactById(artifactId);
    if (!artifact) {
      return NextResponse.json(
        { error: "Artifact not found" },
        { status: 404 }
      );
    }

    // Check if artifact is published
    if (artifact.status !== "published") {
      return NextResponse.json(
        { error: "Artifact is not published" },
        { status: 403 }
      );
    }

    // TODO: Generate signed URL for storage
    // For MVP, return placeholder URL
    const downloadUrl = artifact.storage.url || `/api/artifacts/render?artifactId=${artifactId}`;

    return NextResponse.json({
      downloadUrl,
      filename: `${artifact.title}_${artifact.version}.pdf`,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    });
  } catch (error) {
    console.error("[Artifact Download] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

