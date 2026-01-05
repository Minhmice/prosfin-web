"use client";

import * as React from "react";
import type { Post } from "@/types/content";
import type { Service } from "@/types/content";
import { PostDetail } from "./post-detail";
import { ServiceFinderDialog } from "@/components/services/discovery/service-finder-dialog";

interface PostDetailWrapperProps {
  post: Post;
  allServices: Service[];
  allPosts: Post[];
}

/**
 * PostDetailWrapper - Client wrapper for PostDetail
 * 
 * Handles ServiceFinderDialog state
 */
export function PostDetailWrapper({
  post,
  allServices,
  allPosts,
}: PostDetailWrapperProps) {
  const [wizardOpen, setWizardOpen] = React.useState(false);

  return (
    <>
      <PostDetail
        post={post}
        allServices={allServices}
        allPosts={allPosts}
        onOpenServiceFinder={() => setWizardOpen(true)}
      />
      <ServiceFinderDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
      />
    </>
  );
}

