"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContentQuickActions() {
  const router = useRouter();

  const handleNewPost = () => {
    router.push("/content/posts/new");
  };

  const handleUploadMedia = () => {
    // Will open media upload dialog in Phase 2.4
    console.log("Upload Media");
  };

  const handleViewSchedules = () => {
    router.push("/content/schedules");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common content tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleNewPost}
          >
            <FileText className="mr-2 size-4" />
            New Post
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleUploadMedia}
          >
            <Upload className="mr-2 size-4" />
            Upload Media
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleViewSchedules}
          >
            <Calendar className="mr-2 size-4" />
            View Schedules
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
