"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@prosfin/ui";
import { RotateCcw, GitCompare, Save } from "lucide-react";
import { ActivityLog } from "./activity-log";
import type { Post, PostActivityEvent } from "@/types/content";
import { getPostActivity } from "@/lib/data/posts";

interface VersionPanelProps {
  post?: Post;
  formData: any;
  onRestorePublished?: () => void;
}

export function VersionPanel({ post, formData, onRestorePublished }: VersionPanelProps) {
  const [activity, setActivity] = React.useState<PostActivityEvent[]>([]);
  const [isLoadingActivity, setIsLoadingActivity] = React.useState(false);

  React.useEffect(() => {
    if (post?.id) {
      setIsLoadingActivity(true);
      getPostActivity(post.id).then((events) => {
        setActivity(events);
        setIsLoadingActivity(false);
      });
    }
  }, [post?.id]);

  const viewing = post?.status === "published" ? "Published" : "Draft";
  const lastSaved = formData?.updatedAt || post?.updatedAt;
  const lastPublished = post?.publishedAt;

  return (
    <div className="space-y-6 p-4">
      {/* Version Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Version Info</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Viewing: </span>
            <span className="font-medium">{viewing}</span>
          </div>
          {lastSaved && (
            <div>
              <span className="text-muted-foreground">Last saved: </span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(lastSaved), { addSuffix: true })}
              </span>
            </div>
          )}
          {lastPublished && (
            <div>
              <span className="text-muted-foreground">Last published: </span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(lastPublished), { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            disabled
            title="Coming in Phase 3"
          >
            <GitCompare className="mr-2 size-4" />
            Compare changes
          </Button>
          {post?.status === "draft" && post?.publishedAt && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={onRestorePublished}
            >
              <RotateCcw className="mr-2 size-4" />
              Restore published → draft
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            disabled
            title="Coming in Phase 3"
          >
            <Save className="mr-2 size-4" />
            Save as new revision
          </Button>
        </div>
      </div>

      {/* Activity Log */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Activity Log</h3>
        {isLoadingActivity ? (
          <div className="text-center text-muted-foreground text-sm py-4">Loading...</div>
        ) : (
          <ActivityLog events={activity} />
        )}
      </div>
    </div>
  );
}

