import * as React from "react";
import { Text } from "@/components/shared";

export function ScopeNoteCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-lg border-2 border-primary bg-card p-6 shadow-sm">
      <Text as="p" variant="large" className="mb-4">
        {title}
      </Text>
      <Text as="p" variant="lead" className="text-muted-foreground">
        {content}
      </Text>
    </div>
  );
}


