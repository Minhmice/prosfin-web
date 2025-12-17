"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Separator } from "@prosfin/ui";
import { Save, Eye, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import { MetadataPanel } from "./metadata-panel";
import type { Post, PostFormData } from "@/types/content";

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
  onSave,
  onPublish,
  onSchedule,
  formData: externalFormData,
  onFormDataChange: externalOnFormDataChange,
  children,
}: EditorShellProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [internalFormData, setInternalFormData] = React.useState<PostFormData | null>(null);

  const formData = externalFormData ?? internalFormData;
  const setFormData = externalOnFormDataChange ?? setInternalFormData;

  // Track unsaved changes
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

  // Auto-save to localStorage and trigger save callback
  React.useEffect(() => {
    if (formData && hasUnsavedChanges && formData.title) {
      const timer = setTimeout(async () => {
        const key = post ? `post-draft-${post.id}` : "post-draft-new";
        localStorage.setItem(key, JSON.stringify(formData));
        
        // Auto-save draft (silent, don't show saved indicator)
        try {
          await onSave(formData);
          setHasUnsavedChanges(false);
        } catch (error) {
          console.error("Auto-save failed:", error);
        }
      }, 3000); // Auto-save after 3 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [formData, hasUnsavedChanges, post, onSave]);

  const handleSave = async () => {
    if (!formData) return;

    setIsSaving(true);
    try {
      await onSave(formData);
      setIsSaved(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!formData) return;

    setIsSaving(true);
    try {
      await onPublish?.(formData);
      router.push("/content");
    } catch (error) {
      console.error("Failed to publish:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!formData || !post) return;
    const slug = formData.slug || post.slug;
    window.open(`/content/preview/${slug}`, "_blank");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Top Action Bar */}
      <div className="border-b bg-background">
        <div className="flex h-14 items-center justify-between px-6">
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
                <span className="text-sm text-muted-foreground">Unsaved changes</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
            >
              <Save className="mr-2 size-4" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            {post && (
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 size-4" />
                Preview
              </Button>
            )}
            <Button onClick={handlePublish} disabled={isSaving || !formData}>
              Publish
            </Button>
          </div>
        </div>
      </div>

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
              setFormData(data);
              setHasUnsavedChanges(true);
            }}
            onSchedule={onSchedule}
          />
        </div>
      </div>
    </div>
  );
}

