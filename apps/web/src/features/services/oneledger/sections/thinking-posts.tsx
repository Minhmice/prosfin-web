"use client";

import type { ServicePageConfig } from "@/content/services/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThinkingPostsProps {
  config: ServicePageConfig;
}

export function ThinkingPosts({ config }: ThinkingPostsProps) {
  const tags = config.thinkingTags || [];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Our Thinking</p>
        <h2 className="text-2xl font-semibold">Bài viết liên quan</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tags đề xuất</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

