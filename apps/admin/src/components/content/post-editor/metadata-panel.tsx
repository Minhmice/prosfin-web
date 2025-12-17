"use client";

import * as React from "react";
import { Input, Label, Textarea, Button, Badge, Separator, Tabs, TabsList, TabsTrigger, TabsContent } from "@prosfin/ui";
import { Calendar } from "lucide-react";
import type { Post, PostFormData, ContentBucket, PostStatus } from "@/types/content";
import { contentBucketSchema, postStatusSchema } from "@/types/content";
import { VersionPanel } from "./version-panel";
import { ContentChecklistDisplay } from "./content-checklist";

interface MetadataPanelProps {
  post?: Post;
  formData: PostFormData | null;
  onFormDataChange: (data: PostFormData) => void;
  onSchedule?: (data: PostFormData, scheduledFor: string) => Promise<void>;
}

const bucketOptions: { value: ContentBucket; label: string }[] = [
  { value: "insights", label: "Insights" },
  { value: "resources", label: "Resources" },
  { value: "knowledge", label: "Knowledge" },
];

const statusOptions: { value: PostStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "archived", label: "Archived" },
];

export function MetadataPanel({
  post,
  formData,
  onFormDataChange,
  onSchedule,
}: MetadataPanelProps) {
  const [localData, setLocalData] = React.useState<Partial<PostFormData>>(
    post
      ? {
          title: post.title,
          slug: post.slug,
          bucket: post.bucket,
          excerpt: post.excerpt,
          cover: post.cover,
          tags: post.tags,
          content: post.content,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          canonical: post.canonical,
          noindex: post.noindex,
          status: post.status,
          scheduledFor: post.scheduledFor,
        }
      : {
          title: "",
          slug: "",
          bucket: "insights",
          excerpt: "",
          cover: "",
          tags: [],
          content: {
            root: {
              children: [],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
          status: "draft",
        }
  );

  React.useEffect(() => {
    if (formData) {
      setLocalData(formData);
    }
  }, [formData]);

  const updateField = <K extends keyof PostFormData>(
    field: K,
    value: PostFormData[K]
  ) => {
    const updated = { ...localData, [field]: value } as PostFormData;
    setLocalData(updated);
    onFormDataChange(updated);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    updateField("title", value);
    if (!post || !localData.slug) {
      // Auto-generate slug if new post or slug is empty
      updateField("slug", generateSlug(value));
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !localData.tags?.includes(tag.trim())) {
      updateField("tags", [...(localData.tags || []), tag.trim()]);
    }
  };

  const removeTag = (tag: string) => {
    updateField("tags", localData.tags?.filter((t) => t !== tag) || []);
  };

  const handleRestorePublished = async () => {
    // TODO: Implement restore published → draft
    console.log("Restore published to draft");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Tabs defaultValue="metadata" className="flex h-full flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>
        <TabsContent value="metadata" className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Content Checklist */}
            <div className="rounded-md border bg-background p-4">
              <ContentChecklistDisplay formData={formData} postId={post?.id} />
            </div>
            <Separator />
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-semibold">Basic Information</h3>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={localData.title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={localData.slug || ""}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="post-slug"
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly version of the title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bucket">Content Bucket</Label>
            <select
              id="bucket"
              value={localData.bucket || "insights"}
              onChange={(e) =>
                updateField("bucket", e.target.value as ContentBucket)
              }
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {bucketOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={localData.excerpt || ""}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="Brief description of the post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL</Label>
            <Input
              id="cover"
              value={localData.cover || ""}
              onChange={(e) => updateField("cover", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <Separator />

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {localData.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        </div>

        <Separator />

        {/* Status */}
        <div className="space-y-4">
          <h3 className="font-semibold">Status</h3>
          <select
            value={localData.status || "draft"}
            onChange={(e) => {
              const newStatus = e.target.value as PostStatus;
              // Edge case: If changing from scheduled to draft, cancel schedule
              if (localData.status === "scheduled" && newStatus === "draft" && post) {
                // Cancel schedule will be handled by EditorShell
                updateField("status", newStatus);
                updateField("scheduledFor", undefined);
              } else {
                updateField("status", newStatus);
              }
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {localData.status === "scheduled" && localData.scheduledFor && (
            <div className="space-y-2">
              <Label htmlFor="scheduledFor">Schedule For</Label>
              <Input
                id="scheduledFor"
                type="datetime-local"
                value={
                  localData.scheduledFor
                    ? new Date(localData.scheduledFor)
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  updateField(
                    "scheduledFor",
                    e.target.value ? new Date(e.target.value).toISOString() : undefined
                  )
                }
              />
              <p className="text-muted-foreground text-xs">
                Changes to slug/SEO will be applied when the post is published.
              </p>
            </div>
          )}
          {localData.status === "scheduled" && !localData.scheduledFor && (
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-2 text-yellow-800 text-xs">
              Scheduled but no date set. Please reschedule.
            </div>
          )}
        </div>

        <Separator />

        {/* SEO */}
        <div className="space-y-4">
          <h3 className="font-semibold">SEO Settings</h3>

          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={localData.seoTitle || ""}
              onChange={(e) => updateField("seoTitle", e.target.value)}
              placeholder="Custom title for search engines"
            />
            <p className="text-xs text-muted-foreground">
              {localData.seoTitle?.length || 0}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={localData.seoDescription || ""}
              onChange={(e) => updateField("seoDescription", e.target.value)}
              placeholder="Meta description for search engines"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {localData.seoDescription?.length || 0}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical">Canonical URL</Label>
            <Input
              id="canonical"
              value={localData.canonical || ""}
              onChange={(e) => updateField("canonical", e.target.value)}
              placeholder="https://example.com/canonical-url"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noindex"
              checked={localData.noindex || false}
              onChange={(e) => updateField("noindex", e.target.checked)}
              className="size-4 rounded border-input"
            />
            <Label htmlFor="noindex" className="cursor-pointer">
              Noindex (prevent search engines from indexing)
            </Label>
          </div>
        </div>
          </div>
        </TabsContent>
        <TabsContent value="versions" className="flex-1 overflow-y-auto">
          <VersionPanel
            post={post}
            formData={formData}
            onRestorePublished={handleRestorePublished}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

