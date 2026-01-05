import type { Post } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ResearchCard } from "./research-card";

interface ResearchResultsProps {
  posts: Post[];
  title?: string;
}

/**
 * ResearchResults - Display filtered posts in grid layout
 * 
 * Features:
 * - Grid layout: 2 cols (desktop), 1 (sm)
 * - Empty state message
 */
export function ResearchResults({
  posts,
  title = "Kết quả tìm kiếm",
}: ResearchResultsProps) {
  if (posts.length === 0) {
    return (
      <div id="results" className="py-12 text-center">
        <p className="text-muted-foreground">
          Không tìm thấy bài viết nào phù hợp với bộ lọc của bạn.
        </p>
      </div>
    );
  }

  return (
    <div id="results" className="space-y-6">
      <ProsfinSectionHeading
        title={title}
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {posts.map((post) => (
          <ResearchCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

