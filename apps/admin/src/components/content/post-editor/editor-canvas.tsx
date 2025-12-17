"use client";

import * as React from "react";
import { LexicalEditor } from "@/lib/editor/lexical-editor";
import type { LexicalEditorState } from "@/types/content";

interface EditorCanvasProps {
  content: LexicalEditorState;
  onChange: (content: LexicalEditorState) => void;
}

/**
 * Editor canvas using Lexical
 */
export function EditorCanvas({ content, onChange }: EditorCanvasProps) {
  return (
    <div className="space-y-4">
      <LexicalEditor
        initialContent={content}
        onChange={onChange}
        placeholder="Start writing your post..."
        className="min-h-[600px]"
      />
    </div>
  );
}

