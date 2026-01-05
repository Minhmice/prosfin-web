"use client";

import Link from "next/link";
import type { Post } from "@/types/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import {
  getTypeLabel,
  getTopicLabel,
  getPersonaLabel,
} from "@/lib/research/facets";

interface ResearchCardProps {
  post: Post;
}

/**
 * ResearchCard - Card component for displaying research post in grid
 * 
 * Displays:
 * - Type badge (Brief/Playbook/Tool)
 * - Title, excerpt
 * - Topics, personas badges
 * - Reading time
 * - Link to detail
 */
export function ResearchCard({ post }: ResearchCardProps) {
  const slug = post.href?.split("/").pop() || post.id;
  const href = `/research/${slug}`;

  // Get reading time
  const readingTime =
    typeof post.readingTime === "number"
      ? post.readingTime
      : post.readingTime?.minutes;

  // Get cover image
  const coverImage = post.cover?.src || post.coverImage;

  return (
    <Card className="flex h-full flex-col transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/50">
      {coverImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={coverImage}
            alt={post.cover?.alt || post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-4 md:p-6">
        {post.type && (
          <div className="mb-2">
            <AppBadge variant="outline" className="text-xs">
              {getTypeLabel(post.type)}
            </AppBadge>
          </div>
        )}
        <CardTitle className="text-base leading-tight md:text-xl">
          {post.title}
        </CardTitle>
        {post.excerpt && (
          <CardDescription className="mt-2 text-sm leading-relaxed md:text-base">
            {post.excerpt}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-4 md:p-6">
        {/* Topics */}
        {post.topics && post.topics.length > 0 && (
          <div>
            <div className="mb-1.5 text-xs font-medium text-muted-foreground">
              Topics:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.topics.slice(0, 3).map((topic) => (
                <AppBadge key={topic} variant="outline" className="text-xs">
                  {getTopicLabel(topic)}
                </AppBadge>
              ))}
            </div>
          </div>
        )}

        {/* Personas */}
        {post.personas && post.personas.length > 0 && (
          <div>
            <div className="mb-1.5 text-xs font-medium text-muted-foreground">
              Dành cho:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.personas.slice(0, 2).map((persona) => (
                <AppBadge key={persona} variant="outline" className="text-xs">
                  {getPersonaLabel(persona)}
                </AppBadge>
              ))}
            </div>
          </div>
        )}

        {/* Reading time */}
        {readingTime && (
          <div className="mt-auto text-xs text-muted-foreground">
            {readingTime} phút đọc
          </div>
        )}

        {/* CTA */}
        <ProsfinSecondaryButton href={href} className="w-full mt-2">
          Đọc tiếp
        </ProsfinSecondaryButton>
      </CardContent>
    </Card>
  );
}

