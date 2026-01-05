"use client";

import * as React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import {
  saveToReadingList,
  removeFromReadingList,
  isInReadingList,
  getReadingProgress,
} from "@/lib/research/reading-list";

interface ReadingListButtonProps {
  slug: string;
}

/**
 * ReadingListButton - Save/unsave post to reading list
 * 
 * Shows bookmark icon and "Continue reading" indicator if in progress
 */
export function ReadingListButton({ slug }: ReadingListButtonProps) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    setIsSaved(isInReadingList(slug));
    const readingProgress = getReadingProgress(slug);
    setProgress(readingProgress?.progress || null);
  }, [slug]);

  const handleToggle = () => {
    if (isSaved) {
      removeFromReadingList(slug);
      setIsSaved(false);
      setProgress(null);
    } else {
      saveToReadingList(slug);
      setIsSaved(true);
    }
  };

  return (
    <ProsfinSecondaryButton onClick={handleToggle} size="sm">
      {isSaved ? (
        <>
          <BookmarkCheck className="mr-2 h-4 w-4" />
          {progress !== null && progress > 0
            ? `Tiếp tục đọc (${Math.round(progress)}%)`
            : "Đã lưu"}
        </>
      ) : (
        <>
          <Bookmark className="mr-2 h-4 w-4" />
          Lưu để đọc sau
        </>
      )}
    </ProsfinSecondaryButton>
  );
}

