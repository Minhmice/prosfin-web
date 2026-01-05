"use client";

import * as React from "react";
import type { Post } from "@/types/content";
import type { Service } from "@/types/content";
import { PostRenderer } from "@/components/content/post-renderer";
import { ReadingProgress } from "./reading-progress";
import { PostHeader } from "./post-header";
import { ResearchToc } from "./research-toc";
import { ReadingListButton } from "./reading-list-button";
import { RelatedServices } from "./related-services";
import { RelatedPosts } from "./related-posts";
import { updateReadingProgress } from "@/lib/research/reading-list";

interface PostDetailProps {
  post: Post;
  allServices: Service[];
  allPosts: Post[];
  onOpenServiceFinder?: () => void;
}

/**
 * PostDetail - Main wrapper for post detail page
 * 
 * Includes:
 * - ReadingProgress (client)
 * - PostHeader
 * - PostContent (renderer)
 * - ResearchToc (client)
 * - Key takeaways (if available)
 * - RelatedServices
 * - RelatedPosts
 */
export function PostDetail({
  post,
  allServices,
  allPosts,
  onOpenServiceFinder,
}: PostDetailProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const slug = post.href?.split("/").pop() || post.id;

  // Track reading progress
  React.useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const windowHeight = window.innerHeight;
      const contentHeight = contentRef.current.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const contentTop = contentRef.current.offsetTop;

      const scrolled = Math.max(0, scrollTop - contentTop);
      const scrollableHeight = contentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrolled / scrollableHeight) * 100 : 0;

      updateReadingProgress(slug, progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  return (
    <article className="relative">
      <ReadingProgress />
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <PostHeader post={post} />
          <div className="mt-6">
            <ReadingListButton slug={slug} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_250px]">
          {/* Main content */}
          <div>
            <main ref={contentRef}>
              {post.content && <PostRenderer content={post.content} />}
              {!post.content && (
                <div className="prose max-w-none">
                  <p className="text-muted-foreground">
                    Nội dung đang được cập nhật...
                  </p>
                </div>
              )}

              {/* Key takeaways */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mt-8 rounded-lg border bg-muted/50 p-6">
                  <h3 className="mb-4 font-semibold">Điểm chính</h3>
                  <ul className="space-y-2">
                    {post.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 text-primary">•</span>
                        <span className="text-sm">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </main>

            {/* Related content */}
            <div className="mt-12 space-y-12">
              <RelatedServices
                post={post}
                allServices={allServices}
                onOpenServiceFinder={onOpenServiceFinder}
              />
              <RelatedPosts post={post} allPosts={allPosts} />
            </div>
          </div>

          {/* Sidebar - ToC */}
          <aside className="hidden lg:block">
            <ResearchToc contentRef={contentRef} />
          </aside>
        </div>
      </div>
    </article>
  );
}

