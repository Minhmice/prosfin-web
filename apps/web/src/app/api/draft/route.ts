import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Draft Mode Route Handler
 * 
 * Enables Next.js Draft Mode for previewing draft content.
 * Phase 2: Mock validation with hardcoded secret
 * Phase 3: Will implement proper auth/token validation
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const bucket = searchParams.get("bucket");

  // Phase 2: Mock validation (Phase 3 will check auth/token)
  if (secret !== "your-secret-token") {
    return new Response("Invalid token", { status: 401 });
  }

  if (!slug || !bucket) {
    return new Response("Missing slug or bucket", { status: 400 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the post page
  redirect(`/${bucket}/${slug}`);
}

