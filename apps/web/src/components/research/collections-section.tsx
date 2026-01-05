"use client";

import Link from "next/link";
import type { Collection } from "@/data/collections";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface CollectionsSectionProps {
  collections: Collection[];
}

/**
 * CollectionsSection - Display curated collections
 * 
 * Shows collection cards with "Start collection" button
 * that navigates to first post in collection
 */
export function CollectionsSection({ collections }: CollectionsSectionProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <section id="collections" className="space-y-6">
      <ProsfinSectionHeading
        title="Collections"
        subtitle="Bộ sưu tập bài viết được tuyển chọn theo chủ đề"
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => {
          const firstPostSlug = collection.postSlugs[0];
          const href = firstPostSlug ? `/research/${firstPostSlug}` : "#";

          return (
            <Card key={collection.id} className="flex flex-col">
              {collection.coverImage && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {collection.difficulty && (
                    <AppBadge variant="outline" className="text-xs">
                      {collection.difficulty === "beginner"
                        ? "Cơ bản"
                        : collection.difficulty === "intermediate"
                          ? "Trung bình"
                          : "Nâng cao"}
                    </AppBadge>
                  )}
                  {collection.estimatedTime && (
                    <AppBadge variant="outline" className="text-xs">
                      {collection.estimatedTime}
                    </AppBadge>
                  )}
                  <AppBadge variant="outline" className="text-xs">
                    {collection.postSlugs.length} bài
                  </AppBadge>
                </div>
                <ProsfinPrimaryButton href={href} className="mt-auto w-full">
                  Bắt đầu collection
                </ProsfinPrimaryButton>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

