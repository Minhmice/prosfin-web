import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolStaticParams } from "@/lib/tools";
import { ToolDetailShell } from "@/components/tools/tool-detail-shell";
import { parseToolParams } from "@/lib/tools/url-state";
import { canonicalForRoute } from "@/lib/seo/canonical";
import { buildOg } from "@/lib/seo/open-graph";
import { robotsForRoute } from "@/lib/seo/robots";

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate static params for all tools
 */
export async function generateStaticParams() {
  return getToolStaticParams();
}

/**
 * Generate metadata for tool detail page
 */
export async function generateMetadata({
  params,
}: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | ProsFIN",
    };
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: canonicalForRoute(`/tools/${slug}`),
    },
    openGraph: buildOg({
      title: tool.seo.title,
      description: tool.seo.description,
      url: `/tools/${slug}`,
    }),
    robots: robotsForRoute({
      index: true,
      follow: true,
    }),
  };
}

/**
 * Tool Detail Page
 */
export default async function ToolDetailPage({
  params,
  searchParams,
}: ToolDetailPageProps) {
  const { slug } = await params;
  const searchParamsObj = await searchParams;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Parse initial input from URL
  const initialInput = parseToolParams(
    new URLSearchParams(
      Object.entries(searchParamsObj).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>
      )
    )
  );

  return <ToolDetailShell tool={tool} initialInput={initialInput} />;
}

