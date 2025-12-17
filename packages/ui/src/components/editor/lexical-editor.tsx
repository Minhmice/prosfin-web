"use client";

import * as React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { $getRoot } from "lexical";

/**
 * Lexical editor state type (matches admin app type)
 */
export type LexicalEditorState = {
  root: {
    children: Array<Record<string, any>>;
    direction: "ltr" | "rtl" | null;
    format: string;
    indent: number;
    type: "root";
    version: number;
  };
};

/**
 * Base Lexical Editor Component
 * 
 * Provides a rich text editor using Lexical
 */

interface LexicalEditorProps {
  initialContent?: LexicalEditorState;
  onChange?: (content: LexicalEditorState) => void;
  placeholder?: string;
  className?: string;
}

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold mb-3",
    h3: "text-2xl font-bold mb-2",
  },
  quote: "border-l-4 border-gray-300 pl-4 italic my-4",
  list: {
    nested: {
      listitem: "ml-4",
    },
    ol: "list-decimal ml-6 my-2",
    ul: "list-disc ml-6 my-2",
    listitem: "my-1",
  },
  link: "text-blue-600 underline hover:text-blue-800",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const initialConfig = {
  namespace: "ProsFinEditor",
  theme,
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
  onError: (error: Error) => {
    console.error("Lexical error:", error);
  },
};

function EditorContent({ placeholder }: { placeholder?: string }) {
  return (
    <div className="relative">
      <ContentEditable
        className="min-h-[600px] outline-none prose prose-lg max-w-none"
        placeholder={
          placeholder ? (
            <div className="absolute top-0 text-muted-foreground pointer-events-none">
              {placeholder}
            </div>
          ) : null
        }
      />
    </div>
  );
}

function OnChange({
  onChange,
}: {
  onChange?: (content: LexicalEditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const json = editorState.toJSON() as LexicalEditorState;
        onChange?.(json);
      });
    });
  }, [editor, onChange]);

  return null;
}

function InitialContentPlugin({
  initialContent,
}: {
  initialContent?: LexicalEditorState;
}) {
  const [editor] = useLexicalComposerContext();
  const [hasSetInitial, setHasSetInitial] = React.useState(false);

  React.useEffect(() => {
    if (initialContent && !hasSetInitial) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        // Lexical will parse JSON when editor state is set
      });
      // Set editor state from JSON
      const editorState = editor.parseEditorState(initialContent);
      editor.setEditorState(editorState);
      setHasSetInitial(true);
    }
  }, [editor, initialContent, hasSetInitial]);

  return null;
}

export function LexicalEditor({
  initialContent,
  onChange,
  placeholder = "Start writing...",
  className,
}: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={className}>
        <RichTextPlugin
          contentEditable={<EditorContent placeholder={placeholder} />}
          placeholder={null}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <OnChange onChange={onChange} />
        {initialContent && <InitialContentPlugin initialContent={initialContent} />}
      </div>
    </LexicalComposer>
  );
}

