import { permanentRedirect } from "next/navigation";

/**
 * Redirect old /research/[slug] route to /insights/[slug]
 * 
 * SEO preservation: 308 Permanent Redirect
 */
export default async function ResearchDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/insights/${slug}`);
}
