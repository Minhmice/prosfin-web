"use client";

import * as React from "react";
import { use } from "react";
import { EditorShell } from "@/components/content/post-editor/editor-shell";
import { EditorCanvas } from "@/components/content/post-editor/editor-canvas";
import { getPostById, saveDraft, publish } from "@/lib/data/posts";
import type { PostFormData } from "@/types/content";

interface EditorPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { slug } = use(params);
  const [post, setPost] = React.useState<Awaited<ReturnType<typeof getPostById>>>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [formData, setFormData] = React.useState<PostFormData | null>(null);

  React.useEffect(() => {
    if (slug === "new") {
      setIsLoading(false);
      setFormData({
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
      });
      return;
    }

    // Find post by slug (we need to search all buckets)
    const loadPost = async () => {
      try {
        const { listPosts } = await import("@/lib/data/posts");
        const allPosts = await listPosts();
        const found = allPosts.find((p) => p.slug === slug);
        if (found) {
          const { getPostById } = await import("@/lib/data/posts");
          const fullPost = await getPostById(found.id);
          setPost(fullPost);
          if (fullPost) {
            setFormData({
              title: fullPost.title,
              slug: fullPost.slug,
              bucket: fullPost.bucket,
              excerpt: fullPost.excerpt,
              cover: fullPost.cover,
              tags: fullPost.tags,
              content: fullPost.content,
              seoTitle: fullPost.seoTitle,
              seoDescription: fullPost.seoDescription,
              canonical: fullPost.canonical,
              noindex: fullPost.noindex,
              status: fullPost.status,
              scheduledFor: fullPost.scheduledFor,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleSave = async (data: PostFormData) => {
    await saveDraft(data, post?.id);
    if (post) {
      const updated = await getPostById(post.id);
      setPost(updated);
    }
  };

  const handlePublish = async (data: PostFormData) => {
    if (post) {
      await publish(post.id);
    } else {
      const saved = await saveDraft(data);
      await publish(saved.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  return (
    <EditorShell
      post={post || undefined}
      onSave={handleSave}
      onPublish={handlePublish}
      formData={formData}
      onFormDataChange={setFormData}
    >
      <EditorCanvas
        content={formData.content}
        onChange={(content) => {
          setFormData({ ...formData, content });
        }}
      />
    </EditorShell>
  );
}

