"use client";

import * as React from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@prosfin/ui";
import type { PostFormData } from "@/types/content";
import { isSlugUnique } from "@/lib/data/posts";

interface ChecklistItem {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  message?: string;
}

interface ContentChecklistProps {
  formData: PostFormData | null;
  postId?: string;
}

export function useContentChecklist(formData: PostFormData | null, postId?: string) {
  const [slugUnique, setSlugUnique] = React.useState<boolean | null>(null);
  const [isCheckingSlug, setIsCheckingSlug] = React.useState(false);

  React.useEffect(() => {
    if (formData?.slug && formData?.bucket) {
      setIsCheckingSlug(true);
      isSlugUnique(formData.slug, formData.bucket, postId)
        .then((unique) => {
          setSlugUnique(unique);
          setIsCheckingSlug(false);
        })
        .catch(() => {
          setSlugUnique(null);
          setIsCheckingSlug(false);
        });
    } else {
      setSlugUnique(null);
    }
  }, [formData?.slug, formData?.bucket, postId]);

  if (!formData) {
    return {
      items: [],
      passCount: 0,
      warningCount: 0,
      failCount: 0,
      canPublish: false,
      hasWarnings: false,
    };
  }

  const items: ChecklistItem[] = [];

  // Title present
  items.push({
    id: "title",
    label: "Title present",
    status: formData.title?.trim() ? "pass" : "fail",
    message: formData.title?.trim() ? undefined : "Title is required",
  });

  // Slug valid + unique
  const slugValid = formData.slug?.trim() && /^[a-z0-9-]+$/.test(formData.slug);
  const slugStatus =
    !formData.slug?.trim()
      ? "fail"
      : !slugValid
      ? "fail"
      : slugUnique === false
      ? "fail"
      : slugUnique === true
      ? "pass"
      : isCheckingSlug
      ? "warning"
      : "pass";
  items.push({
    id: "slug",
    label: "Slug valid + unique",
    status: slugStatus,
    message:
      !formData.slug?.trim()
        ? "Slug is required"
        : !slugValid
        ? "Slug must contain only lowercase letters, numbers, and hyphens"
        : slugUnique === false
        ? "Slug is not unique"
        : isCheckingSlug
        ? "Checking..."
        : undefined,
  });

  // Excerpt present (warning)
  items.push({
    id: "excerpt",
    label: "Excerpt present",
    status: formData.excerpt?.trim() ? "pass" : "warning",
    message: formData.excerpt?.trim() ? undefined : "Excerpt is recommended",
  });

  // Cover present (warning)
  items.push({
    id: "cover",
    label: "Cover present",
    status: formData.cover?.trim() ? "pass" : "warning",
    message: formData.cover?.trim() ? undefined : "Cover image is recommended",
  });

  // SEO title length
  const seoTitleLength = formData.seoTitle?.length || 0;
  items.push({
    id: "seoTitle",
    label: "SEO title length",
    status: seoTitleLength === 0 ? "warning" : seoTitleLength > 60 ? "warning" : "pass",
    message:
      seoTitleLength === 0
        ? "SEO title is recommended"
        : seoTitleLength > 60
        ? `SEO title is ${seoTitleLength} characters (recommended: ≤60)`
        : undefined,
  });

  // SEO description length
  const seoDescLength = formData.seoDescription?.length || 0;
  items.push({
    id: "seoDescription",
    label: "SEO description length",
    status: seoDescLength === 0 ? "warning" : seoDescLength > 160 ? "warning" : "pass",
    message:
      seoDescLength === 0
        ? "SEO description is recommended"
        : seoDescLength > 160
        ? `SEO description is ${seoDescLength} characters (recommended: ≤160)`
        : undefined,
  });

  const passCount = items.filter((item) => item.status === "pass").length;
  const warningCount = items.filter((item) => item.status === "warning").length;
  const failCount = items.filter((item) => item.status === "fail").length;

  return {
    items,
    passCount,
    warningCount,
    failCount,
    canPublish: failCount === 0,
    hasWarnings: warningCount > 0,
  };
}

export function ContentChecklistDisplay({ formData, postId }: ContentChecklistProps) {
  const checklist = useContentChecklist(formData, postId);

  if (!formData) {
    return null;
  }

  const getIcon = (status: "pass" | "warning" | "fail") => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="size-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="size-4 text-yellow-600" />;
      case "fail":
        return <XCircle className="size-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Content Checklist</h3>
        <Badge variant="secondary" className="text-xs">
          {checklist.passCount}/{checklist.items.length}
        </Badge>
      </div>
      <div className="space-y-2">
        {checklist.items.map((item) => (
          <div key={item.id} className="flex items-start gap-2 text-sm">
            {getIcon(item.status)}
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              {item.message && (
                <div className="text-muted-foreground text-xs mt-0.5">{item.message}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {checklist.failCount > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-red-800 text-xs">
          {checklist.failCount} issue{checklist.failCount > 1 ? "s" : ""} must be fixed before publishing
        </div>
      )}
      {checklist.failCount === 0 && checklist.warningCount > 0 && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-2 text-yellow-800 text-xs">
          {checklist.warningCount} warning{checklist.warningCount > 1 ? "s" : ""} - review before publishing
        </div>
      )}
    </div>
  );
}
