"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MetadataPanel } from "./metadata-panel";
import { EditorActionBar } from "./editor-action-bar";
import { PublishDialog } from "./publish-dialog";
import { ScheduleDialog } from "./schedule-dialog";
import type { Post, PostFormData } from "@/types/content";
import {
  saveDraft,
  publish,
  unpublish,
  archivePost,
  restorePost,
  reschedulePost,
  publishNow,
  cancelSchedule,
  createDraftRevision,
  updatePublishedPost,
} from "@/lib/data/posts";
import { showToast } from "@/lib/toast";

interface EditorShellProps {
  post?: Post;
  onSave: (data: PostFormData) => Promise<void>;
  onPublish?: (data: PostFormData) => Promise<void>;
  onSchedule?: (data: PostFormData, scheduledFor: string) => Promise<void>;
  formData?: PostFormData | null;
  onFormDataChange?: (data: PostFormData) => void;
  children: React.ReactNode; // Editor canvas
}

export function EditorShell({
  post,
  onSave: externalOnSave,
  onPublish: externalOnPublish,
  onSchedule: externalOnSchedule,
  formData: externalFormData,
  onFormDataChange: externalOnFormDataChange,
  children,
}: EditorShellProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [lastSavedAt, setLastSavedAt] = React.useState<string | undefined>();
  const [internalFormData, setInternalFormData] = React.useState<PostFormData | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = React.useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);

  const formData = externalFormData ?? internalFormData;
  const setFormData = externalOnFormDataChange ?? setInternalFormData;

  // Auto-save to localStorage and trigger save callback
  React.useEffect(() => {
    if (formData && hasUnsavedChanges && formData.title) {
      const timer = setTimeout(async () => {
        const key = post ? `post-draft-${post.id}` : "post-draft-new";
        localStorage.setItem(key, JSON.stringify(formData));
        
        // Auto-save draft (silent, don't show saved indicator)
        try {
          await handleSaveInternal();
        } catch (error) {
          console.error("Auto-save failed:", error);
        }
      }, 3000); // Auto-save after 3 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [formData, hasUnsavedChanges, post]);

  const handleSaveInternal = async () => {
    if (!formData || !post) return;
    await saveDraft(formData, post.id);
    setLastSavedAt(new Date().toISOString());
    setHasUnsavedChanges(false);
  };

  const handleSave = async () => {
    if (!formData) return;

    setIsSaving(true);
    try {
      if (post) {
        await saveDraft(formData, post.id);
        const updated = await import("@/lib/data/posts").then((m) => m.getPostById(post.id));
        if (updated) {
          // Update formData with saved data
          setFormData({
            ...formData,
            status: updated.status,
            scheduledFor: updated.scheduledFor,
          });
        }
      } else {
        const saved = await saveDraft(formData);
        router.push(`/content/${saved.slug}`);
        return;
      }
      setIsSaved(true);
      setLastSavedAt(new Date().toISOString());
      setHasUnsavedChanges(false);
      setTimeout(() => setIsSaved(false), 2000);
      showToast.success("Draft saved");
    } catch (error) {
      console.error("Failed to save:", error);
      showToast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!formData) return;

    setIsSaving(true);
    try {
      if (post) {
        await publish(post.id);
      } else {
        const saved = await saveDraft(formData);
        await publish(saved.id);
      }
      showToast.success("Post published");
      router.push("/content");
    } catch (error) {
      console.error("Failed to publish:", error);
      showToast.error("Failed to publish post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSchedule = async (scheduledFor: string | null) => {
    if (!formData) return;

    setIsSaving(true);
    try {
      if (scheduledFor === null) {
        // Publish immediately
        if (post) {
          await publish(post.id);
        } else {
          const saved = await saveDraft(formData);
          await publish(saved.id);
        }
        showToast.success("Post published");
      } else {
        // Schedule for later
        if (post) {
          await reschedulePost(post.id, scheduledFor);
        } else {
          const saved = await saveDraft(formData);
          await reschedulePost(saved.id, scheduledFor);
        }
        showToast.success("Post scheduled");
      }
      router.push("/content");
    } catch (error) {
      console.error("Failed to schedule:", error);
      showToast.error("Failed to schedule post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnpublish = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await unpublish(post.id);
      showToast.success("Post unpublished");
      router.push("/content");
    } catch (error) {
      console.error("Failed to unpublish:", error);
      showToast.error("Failed to unpublish post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await archivePost(post.id);
      showToast.success("Post archived");
      router.push("/content");
    } catch (error) {
      console.error("Failed to archive:", error);
      showToast.error("Failed to archive post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestore = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await restorePost(post.id);
      showToast.success("Post restored");
      router.push("/content");
    } catch (error) {
      console.error("Failed to restore:", error);
      showToast.error("Failed to restore post");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await publishNow(post.id);
      showToast.success("Post published");
      router.push("/content");
    } catch (error) {
      console.error("Failed to publish now:", error);
      showToast.error("Failed to publish post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelSchedule = async () => {
    if (!post) return;

    setIsSaving(true);
    try {
      await cancelSchedule(post.id);
      showToast.success("Schedule cancelled");
      router.push("/content");
    } catch (error) {
      console.error("Failed to cancel schedule:", error);
      showToast.error("Failed to cancel schedule");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePublished = async (mode: "update" | "draft") => {
    if (!formData || !post) return;

    setIsSaving(true);
    try {
      if (mode === "update") {
        await updatePublishedPost(post.id, formData);
        showToast.success("Published post updated");
      } else {
        const draftRevision = await createDraftRevision(post.id, formData);
        showToast.success("Draft revision created");
        router.push(`/content/${draftRevision.slug}`);
        return;
      }
      router.push("/content");
    } catch (error) {
      console.error("Failed to update published:", error);
      showToast.error("Failed to update published post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <EditorActionBar
        post={post}
        formData={formData}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        isSaved={isSaved}
        lastSavedAt={lastSavedAt}
        onSave={handleSave}
        onPublish={handlePublish}
        onSchedule={handleSchedule}
        onUnpublish={handleUnpublish}
        onArchive={handleArchive}
        onRestore={handleRestore}
        onReschedule={() => setScheduleDialogOpen(true)}
        onPublishNow={handlePublishNow}
        onCancelSchedule={handleCancelSchedule}
        onUpdatePublished={() => setPublishDialogOpen(true)}
        onUnsavedChangesChange={setHasUnsavedChanges}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Canvas (Left) */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto max-w-4xl px-6 py-8">{children}</div>
        </div>

        {/* Metadata Panel (Right) */}
        <div className="w-80 border-l bg-muted/30">
          <MetadataPanel
            post={post}
            formData={formData}
            onFormDataChange={(data) => {
              // Edge case: If status changed from scheduled to draft, cancel schedule
              if (post?.status === "scheduled" && data.status === "draft" && post.scheduledFor) {
                cancelSchedule(post.id).catch(console.error);
              }
              setFormData(data);
              setHasUnsavedChanges(true);
            }}
          />
        </div>
      </div>

      {/* Dialogs */}
      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        onConfirm={handleUpdatePublished}
      />
      <ScheduleDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        onConfirm={handleSchedule}
        currentScheduledFor={post?.scheduledFor}
      />
    </div>
  );
}
