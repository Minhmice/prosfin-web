/**
 * RFP API Route Handler
 * 
 * Handles multipart form submission for Request Proposal form.
 * Validates, stores submission, and routes to appropriate team.
 */

import { NextRequest, NextResponse } from "next/server";
import { rfpSubmissionSchema } from "@/lib/rfp/rfp.schema";
import {
  buildRfpPayload,
  extractRfpMetadata,
  getRfpRoutingTeam,
} from "@/lib/rfp/rfp.utils";
import { RFP_FILE_CONSTRAINTS } from "@/lib/rfp/rfp.schema";

export const runtime = "nodejs";
export const maxDuration = 30; // 30 seconds for file upload

/**
 * POST /api/rfp
 * 
 * Handles RFP form submission with multipart/form-data
 */
export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();

    // Extract form fields
    const service = formData.get("service") as string;
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const jobTitle = formData.get("jobTitle") as string | null;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const companyLocation = formData.get("companyLocation") as string;
    const industry = formData.get("industry") as string;
    const companyName = formData.get("companyName") as string | null;
    const yearlyRevenue = formData.get("yearlyRevenue") as string | null;
    const comments = formData.get("comments") as string;
    const acceptTerms = formData.get("acceptTerms") === "true";
    const honeypot = formData.get("honeypot") as string | null;

    // Anti-spam: check honeypot
    if (honeypot) {
      console.warn("Honeypot field filled - potential spam");
      return NextResponse.json(
        { message: "Invalid submission" },
        { status: 400 }
      );
    }

    // Extract metadata
    const sourcePath = (formData.get("sourcePath") as string) || request.url;
    const referrer = (formData.get("referrer") as string) || undefined;
    const utmSource = (formData.get("utm_source") as string) || undefined;
    const utmMedium = (formData.get("utm_medium") as string) || undefined;
    const utmCampaign = (formData.get("utm_campaign") as string) || undefined;
    const utmContent = (formData.get("utm_content") as string) || undefined;
    const utmTerm = (formData.get("utm_term") as string) || undefined;

    const metadata = extractRfpMetadata(sourcePath, request.headers);
    metadata.referrer = referrer;
    metadata.utmSource = utmSource;
    metadata.utmMedium = utmMedium;
    metadata.utmCampaign = utmCampaign;
    metadata.utmContent = utmContent;
    metadata.utmTerm = utmTerm;

    // Handle file upload
    const attachmentFile = formData.get("attachment") as File | null;
    let attachmentInfo: {
      filename: string;
      size: number;
      mime: string;
      storageUrl?: string;
    } | undefined;

    if (attachmentFile && attachmentFile.size > 0) {
      // Validate file size
      if (attachmentFile.size > RFP_FILE_CONSTRAINTS.maxSize) {
        return NextResponse.json(
          {
            message: `File không được vượt quá ${RFP_FILE_CONSTRAINTS.maxSizeMB}MB`,
          },
          { status: 400 }
        );
      }

      // Validate file type
      if (!RFP_FILE_CONSTRAINTS.allowedTypes.includes(attachmentFile.type)) {
        return NextResponse.json(
          {
            message: `Chỉ chấp nhận file: ${RFP_FILE_CONSTRAINTS.allowedExtensions.join(", ")}`,
          },
          { status: 400 }
        );
      }

      // For v1: Store file metadata only
      // In production: Upload to S3/R2/Supabase Storage and get URL
      attachmentInfo = {
        filename: attachmentFile.name,
        size: attachmentFile.size,
        mime: attachmentFile.type,
        // storageUrl: await uploadToStorage(attachmentFile), // TODO: Implement storage upload
      };

      // TODO: In production, upload file to storage here
      // For now, we'll log that file was received but not stored
      console.log("File received:", {
        filename: attachmentFile.name,
        size: attachmentFile.size,
        type: attachmentFile.type,
      });
    }

    // Build submission data
    const submissionData = {
      service,
      title,
      firstName,
      lastName,
      jobTitle: jobTitle || undefined,
      email,
      phone: phone || undefined,
      companyLocation,
      industry,
      companyName: companyName || undefined,
      yearlyRevenue: yearlyRevenue || undefined,
      comments,
      acceptTerms,
      attachment: attachmentFile || undefined,
    };

    // Validate with Zod (server-side defense-in-depth)
    const validated = rfpSubmissionSchema.parse(submissionData);

    // Build payload
    const payload = buildRfpPayload(validated, metadata, attachmentInfo);

    // Get routing team
    const routingTeam = getRfpRoutingTeam(service);

    // TODO: Store submission in DB
    // TODO: Send notification email to team
    // TODO: Send confirmation email to user
    // For now, log the submission
    console.log("RFP Submission:", {
      id: payload.id,
      service: payload.service,
      team: routingTeam,
      email: payload.contact.email,
      hasAttachment: !!attachmentInfo,
    });

    // Return success
    return NextResponse.json({
      ok: true,
      submissionId: payload.id,
      message: "Yêu cầu đã được gửi thành công",
    });
  } catch (error) {
    console.error("RFP submission error:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại form.",
          errors: error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}

