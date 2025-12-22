import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/content/services";

export const alt = "ProsFIN Service";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Generate OG image for service detail pages
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const title = service?.title || "ProsFIN Service";
  const excerpt = service?.excerpt || service?.shortDescription || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, -apple-system",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "24px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {title}
          </h1>
          {excerpt && (
            <p
              style={{
                fontSize: "28px",
                lineHeight: "1.5",
                opacity: 0.9,
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              {excerpt.substring(0, 120)}
              {excerpt.length > 120 ? "..." : ""}
            </p>
          )}
          <div
            style={{
              marginTop: "48px",
              fontSize: "24px",
              opacity: 0.8,
            }}
          >
            prosfin.vn
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

