"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { Button, Separator } from "@prosfin/ui";
import {
  Save,
  Eye,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Send,
  Archive,
  RotateCcw,
  X,
  Play,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import type { Post, PostFormData, PostStatus } from "@/types/content";
import { showToast } from "@/lib/toast";
import { useContentChecklist } from "./content-checklist";
import { Badge } from "@prosfin/ui";

interface EditorActionBarProps {
  post?: Post;
  formData: PostFormData | null;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  isSaved: boolean;
  lastSavedAt?: string;
  onSave: () => Promise<void>;
  onPublish?: () => Promise<void>;
  onSchedule?: (scheduledFor: string) => Promise<void>;
  onUnpublish?: () => Promise<void>;
  onArchive?: () => Promise<void>;
  onRestore?: () => Promise<void>;
  onReschedule?: () => void;
  onPublishNow?: () => Promise<void>;
  onCancelSchedule?: () => Promise<void>;
  onUpdatePublished?: () => void;
  onUnsavedChangesChange?: (hasChanges: boolean) => void;
  showChecklist?: boolean;
}

export function EditorActionBar({
  post,
  formData,
  hasUnsavedChanges,
  isSaving,
  isSaved,
  lastSavedAt,
  onSave,
  onPublish,
  onSchedule,
  onUnpublish,
  onArchive,
  onRestore,
  onReschedule,
  onPublishNow,
  onCancelSchedule,
  onUpdatePublished,
  onUnsavedChangesChange,
  showChecklist = false,
}: EditorActionBarProps) {
  const router = useRouter();
  const status: PostStatus = post?.status || formData?.status || "draft";
  const checklist = useContentChecklist(formData, post?.id);

  // Track unsaved changes guard
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    if (!formData) return;
    await onSave();
    onUnsavedChangesChange?.(false);
  };

  const handlePreviewDraft = () => {
    if (!formData) return;
    const slug = formData.slug || post?.slug;
    const bucket = formData.bucket || post?.bucket;
    if (!slug || !bucket) {
      showToast.error("Slug and bucket are required for preview");
      return;
    }
    // Phase 2: Hardcode secret, Phase 3 will generate token
    const secret = "your-secret-token";
    window.open(`/api/draft?secret=${secret}&slug=${slug}&bucket=${bucket}`, "_blank");
  };

  const handlePreviewPublished = () => {
    if (!post || post.status !== "published") return;
    const bucket = post.bucket;
    const slug = post.slug;
    window.open(`/${bucket}/${slug}`, "_blank");
  };

  const handlePublish = async () => {
    if (!formData) return;
    await onPublish?.();
  };

  const handleSchedule = () => {
    onReschedule?.();
  };

  const handleUnpublish = async () => {
    if (!confirm("Are you sure you want to unpublish this post? It will be set to draft.")) {
      return;
    }
    await onUnpublish?.();
  };

  const handleArchive = async () => {
    if (!confirm("Are you sure you want to archive this post? It will be hidden from public view.")) {
      return;
    }
    await onArchive?.();
  };

  const handleRestore = async () => {
    await onRestore?.();
  };

  const lastSavedText = React.useMemo(() => {
    if (!lastSavedAt) return null;
    try {
      return formatDistanceToNow(new Date(lastSavedAt), { addSuffix: true });
    } catch {
      return null;
    }
  }, [lastSavedAt]);

  const scheduledForText = React.useMemo(() => {
    if (status !== "scheduled" || !post?.scheduledFor) return null;
    try {
      const scheduledDate = new Date(post.scheduledFor);
      const now = new Date();
      if (scheduledDate <= now) return "Ready to publish";
      return `Publishes ${formatDistanceToNow(scheduledDate, { addSuffix: true })}`;
    } catch {
      return null;
    }
  }, [status, post?.scheduledFor]);

  return (
    <div className="border-b bg-background">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Left: Back + Status */}
        <div className="flex items-center gap-4">
          <Link href="/content">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            {isSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-green-600" />
                <span>Saved</span>
              </div>
            )}
            {hasUnsavedChanges && !isSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>Unsaved changes</span>
              </div>
            )}
            {!hasUnsavedChanges && lastSavedText && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Last saved {lastSavedText}</span>
              </div>
            )}
            {scheduledForText && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Calendar className="size-4" />
                <span>{scheduledForText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {formData && (
            <div className="group relative mr-2">
              {checklist.failCount > 0 ? (
                <Badge variant="destructive" className="cursor-help">
                  <AlertCircle className="mr-1 size-3" />
                  {checklist.failCount} issue{checklist.failCount > 1 ? "s" : ""}
                </Badge>
              ) : checklist.warningCount > 0 ? (
                <Badge variant="secondary" className="cursor-help">
                  <AlertCircle className="mr-1 size-3" />
                  {checklist.warningCount} warning{checklist.warningCount > 1 ? "s" : ""}
                </Badge>
              ) : (
                <Badge variant="secondary" className="cursor-help">
                  <CheckCircle2 className="mr-1 size-3" />
                  All checks pass
                </Badge>
              )}
              {showChecklist && (
                <div className="invisible absolute right-0 top-full z-10 mt-2 w-64 rounded-md border bg-popover p-3 text-sm shadow-lg group-hover:visible">
                  <div className="space-y-1">
                    {checklist.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        {item.status === "pass" && (
                          <CheckCircle2 className="size-3 text-green-600" />
                        )}
                        {item.status === "warning" && (
                          <AlertCircle className="size-3 text-yellow-600" />
                        )}
                        {item.status === "fail" && (
                          <AlertCircle className="size-3 text-red-600" />
                        )}
                        <span className={item.status === "fail" ? "font-medium" : ""}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Draft Controls */}
          {status === "draft" && (
            <>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
              >
                <Save className="mr-2 size-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button variant="outline" onClick={handlePreviewDraft} disabled={!formData?.slug}>
                <Eye className="mr-2 size-4" />
                Preview Draft
              </Button>
              <Button variant="outline" onClick={handleSchedule}>
                <Calendar className="mr-2 size-4" />
                Schedule
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving || !formData || !checklist.canPublish}
                title={!checklist.canPublish ? "Fix required issues before publishing" : undefined}
              >
                <Send className="mr-2 size-4" />
                Publish
              </Button>
            </>
          )}

          {/* Scheduled Controls */}
          {status === "scheduled" && (
            <>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
              >
                <Save className="mr-2 size-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handlePreviewDraft} disabled={!formData?.slug}>
                <Eye className="mr-2 size-4" />
                Preview Draft
              </Button>
              <Button variant="outline" onClick={handleSchedule}>
                <Calendar className="mr-2 size-4" />
                Reschedule
              </Button>
              <Button variant="outline" onClick={onPublishNow}>
                <Play className="mr-2 size-4" />
                Publish Now
              </Button>
              <Button variant="outline" onClick={onCancelSchedule}>
                <X className="mr-2 size-4" />
                Cancel Schedule
              </Button>
            </>
          )}

          {/* Published Controls */}
          {status === "published" && (
            <>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
              >
                <Save className="mr-2 size-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handlePreviewPublished}>
                <Eye className="mr-2 size-4" />
                Preview Published
              </Button>
              <Button variant="outline" onClick={onUpdatePublished}>
                <Send className="mr-2 size-4" />
                Update Published
              </Button>
              <Button variant="outline" onClick={handleUnpublish}>
                Unpublish
              </Button>
              <Button variant="outline" onClick={handleArchive}>
                <Archive className="mr-2 size-4" />
                Archive
              </Button>
            </>
          )}

          {/* Archived Controls */}
          {status === "archived" && (
            <>
              <Button variant="outline" onClick={handlePreviewDraft} disabled={!formData?.slug}>
                <Eye className="mr-2 size-4" />
                Preview Draft
              </Button>
              <Button onClick={handleRestore}>
                <RotateCcw className="mr-2 size-4" />
                Restore
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

