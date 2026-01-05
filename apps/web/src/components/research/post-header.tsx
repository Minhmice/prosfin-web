import type { Post } from "@/types/content";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import {
  getTypeLabel,
  getTopicLabel,
  getPersonaLabel,
} from "@/lib/research/facets";

interface PostHeaderProps {
  post: Post;
}

/**
 * PostHeader - Header section for post detail page
 * 
 * Displays title, meta info, badges, and reading time
 */
export function PostHeader({ post }: PostHeaderProps) {
  const readingTime =
    typeof post.readingTime === "number"
      ? post.readingTime
      : post.readingTime?.minutes;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : post.date
      ? new Date(post.date)
      : null;

  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null;

  return (
    <header className="space-y-4">
      {/* Type badge */}
      {post.type && (
        <AppBadge variant="outline">{getTypeLabel(post.type)}</AppBadge>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight md:text-4xl">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {publishedDate && (
          <span>
            Xuất bản: {publishedDate.toLocaleDateString("vi-VN")}
          </span>
        )}
        {updatedDate && updatedDate.getTime() !== publishedDate?.getTime() && (
          <span>
            Cập nhật: {updatedDate.toLocaleDateString("vi-VN")}
          </span>
        )}
        {readingTime && <span>{readingTime} phút đọc</span>}
      </div>

      {/* Topics and Personas */}
      <div className="flex flex-wrap gap-2">
        {post.topics?.map((topic) => (
          <AppBadge key={topic} variant="outline">
            {getTopicLabel(topic)}
          </AppBadge>
        ))}
        {post.personas?.map((persona) => (
          <AppBadge key={persona} variant="outline">
            {getPersonaLabel(persona)}
          </AppBadge>
        ))}
      </div>
    </header>
  );
}

