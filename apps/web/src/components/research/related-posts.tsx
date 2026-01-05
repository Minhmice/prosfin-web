import type { Post } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ResearchCard } from "./research-card";
import { getRelatedPosts } from "@/lib/research/related";

interface RelatedPostsProps {
  post: Post;
  allPosts: Post[];
  limit?: number;
}

/**
 * RelatedPosts - Display related posts for a post
 * 
 * Shows posts with similar topics, personas, outcomes
 */
export function RelatedPosts({
  post,
  allPosts,
  limit = 4,
}: RelatedPostsProps) {
  const related = getRelatedPosts(post, allPosts, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <ProsfinSectionHeading
        title="Bài liên quan"
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {related.map((relatedPost) => (
          <ResearchCard key={relatedPost.id} post={relatedPost} />
        ))}
      </div>
    </section>
  );
}

