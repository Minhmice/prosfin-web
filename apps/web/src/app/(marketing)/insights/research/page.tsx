import type { Metadata } from "next";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ResearchHero } from "@/components/research/research-hero";
import { ResearchFilterBar } from "@/components/research/research-filter-bar";
import { ResearchResults } from "@/components/research/research-results";
import { CollectionsSection } from "@/components/research/collections-section";
import { getAllResearchPosts } from "@/lib/content/posts";
import { getFacets } from "@/lib/research/facets";
import { parseSearchParams } from "@/lib/research/params";
import { searchPosts } from "@/lib/research/search";
import { getAllCollections } from "@/data/collections";

/**
 * Research List Page
 * 
 * Server-first: parses searchParams, filters posts, renders results
 */
interface ResearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "ProsFIN Research",
  description:
    "Nghiên cứu và insights về tài chính doanh nghiệp. Briefs, playbooks và tools để nắm vững kiến thức tài chính.",
};

export default async function ResearchPage({
  searchParams,
}: ResearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();

  // Convert searchParams to URLSearchParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  const filters = parseSearchParams(urlSearchParams);
  const allPosts = getAllResearchPosts();
  const facets = getFacets(allPosts);
  const collections = getAllCollections();

  // Filter posts
  let filteredPosts = allPosts;

  // Text search
  if (filters.q) {
    filteredPosts = searchPosts(filteredPosts, filters.q);
  }

  // Type filter
  if (filters.type) {
    filteredPosts = filteredPosts.filter((post) => post.type === filters.type);
  }

  // Topic filter
  if (filters.topic) {
    filteredPosts = filteredPosts.filter(
      (post) => post.topics?.includes(filters.topic!)
    );
  }

  // Persona filter
  if (filters.persona) {
    filteredPosts = filteredPosts.filter(
      (post) => post.personas?.includes(filters.persona!)
    );
  }

  // Outcome filter
  if (filters.outcome) {
    filteredPosts = filteredPosts.filter(
      (post) => post.outcomes?.includes(filters.outcome!)
    );
  }

  // Sort
  if (filters.sort === "updated") {
    filteredPosts.sort((a, b) => {
      const aDate = a.updatedAt ? new Date(a.updatedAt) : new Date(a.date);
      const bDate = b.updatedAt ? new Date(b.updatedAt) : new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });
  } else if (filters.sort === "popular") {
    // Mock popular sort - can be enhanced with view counts later
    filteredPosts.sort((a, b) => {
      // For now, sort by date as proxy for popularity
      const aDate = a.publishedAt ? new Date(a.publishedAt) : new Date(a.date);
      const bDate = b.publishedAt ? new Date(b.publishedAt) : new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });
  } else {
    // Default: latest (by publishedAt or date)
    filteredPosts.sort((a, b) => {
      const aDate = a.publishedAt ? new Date(a.publishedAt) : new Date(a.date);
      const bDate = b.publishedAt ? new Date(b.publishedAt) : new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });
  }

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ResearchHero />
      </ProsfinSectionWrapper>

      {/* Filter Bar */}
      <ResearchFilterBar facets={facets} initialFilters={filters} />

      {/* Collections Section */}
      {collections.length > 0 && (
        <ProsfinSectionWrapper>
          <CollectionsSection collections={collections} />
        </ProsfinSectionWrapper>
      )}

      {/* Results */}
      <ProsfinSectionWrapper background="muted">
        <ResearchResults posts={filteredPosts} />
      </ProsfinSectionWrapper>
    </>
  );
}

