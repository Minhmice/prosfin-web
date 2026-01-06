/**
 * Related Thinking Inline
 * 
 * Displays 3 related posts based on topicKey.
 * Shows reading time + intent label chips.
 */

"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { Post } from "@/types/content";
import { getAllTopics } from "../content/topic-mapping";

interface RelatedThinkingInlineProps {
  topicKeys: string[];
  limit?: number;
  posts?: Post[]; // Optional: pre-filtered posts
}

/**
 * Estimate reading time (words per minute = 200)
 */
function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function RelatedThinkingInline({
  topicKeys,
  limit = 3,
  posts: providedPosts,
}: RelatedThinkingInlineProps) {
  // TODO: Filter posts by topicKeys
  // For now, return placeholder structure
  // In production, use getPostsByTags or similar with topicKeys mapped to tags

  if (!topicKeys || topicKeys.length === 0) {
    return null;
  }

  // Placeholder: In production, filter posts by topicKeys
  const relatedPosts: Post[] = providedPosts || [];

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <h3 className="text-sm font-semibold">Đọc thêm (Our Thinking)</h3>
      <div className="space-y-2">
        {relatedPosts.slice(0, limit).map((post) => {
          const readingTime = estimateReadingTime(post.content || post.excerpt || "");
          return (
            <Link
              key={post.id}
              href={post.href}
              className="block rounded border p-2 transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {readingTime} phút
                    </Badge>
                    {post.tags?.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

