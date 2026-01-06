/**
 * Artifact Render Endpoint
 * 
 * GET /api/artifacts/render?artifactId=...
 * 
 * Render artifact to HTML preview (for PDF generation).
 */

import { NextRequest, NextResponse } from "next/server";
import { getArtifactById } from "@/server/delivery/artifact.service";
import { getTemplate, renderTemplate } from "@/server/delivery/document-templates";

/**
 * GET /api/artifacts/render
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

    // Get template
    const template = getTemplate(artifact.kind, artifact.version);
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Render template with artifact content
    const renderedSections = renderTemplate(template, artifact.content || {});

    // Generate HTML preview
    const html = generateHTMLPreview(artifact, renderedSections);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("[Artifact Render] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Generate HTML preview from rendered sections
 */
function generateHTMLPreview(
  artifact: any,
  sections: any[]
): string {
  const sectionsHTML = sections.map((section) => {
    switch (section.type) {
      case "header":
        return `<h1>${section.content}</h1>`;
      case "paragraph":
        return `<p>${section.content}</p>`;
      case "list":
        if (Array.isArray(section.content)) {
          return `<ul>${section.content.map((item: string) => `<li>${item}</li>`).join("")}</ul>`;
        }
        return `<p>${section.content}</p>`;
      case "callout":
        if (typeof section.content === "object") {
          const obj = section.content as Record<string, unknown>;
          return `
            <div class="callout">
              <h2>${obj.title || ""}</h2>
              ${Object.entries(obj).filter(([k]) => k !== "title").map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("")}
            </div>
          `;
        }
        return `<p>${section.content}</p>`;
      default:
        return `<p>${JSON.stringify(section.content)}</p>`;
    }
  }).join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${artifact.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #172554; }
          .callout { background: #f8fafc; padding: 20px; border-left: 4px solid #172554; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>${artifact.title}</h1>
        <p><em>Version: ${artifact.version}</em></p>
        ${sectionsHTML}
      </body>
    </html>
  `;
}

