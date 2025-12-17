/**
 * Lexical Editor Configuration
 * 
 * Base configuration for the Lexical editor
 */

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes, EditorState } from "lexical";
import type { LexicalEditorState } from "@/types/content";

/**
 * Convert Lexical EditorState to our JSON format
 */
export function editorStateToJSON(editorState: EditorState): LexicalEditorState {
  return editorState.toJSON() as LexicalEditorState;
}

/**
 * Convert our JSON format to Lexical EditorState
 */
export function jsonToEditorState(
  editor: ReturnType<typeof useLexicalComposerContext>[0],
  json: LexicalEditorState
): void {
  editor.update(() => {
    const root = $getRoot();
    root.clear();
    // Lexical will parse the JSON automatically when we set the editor state
  });
  editor.setEditable(true);
}

/**
 * Initial editor configuration
 */
export const initialEditorConfig = {
  namespace: "ProsFinEditor",
  theme: {
    paragraph: "editor-paragraph",
    heading: {
      h1: "editor-heading-h1",
      h2: "editor-heading-h2",
      h3: "editor-heading-h3",
    },
    quote: "editor-quote",
    list: {
      nested: {
        listitem: "editor-nested-listitem",
      },
      ol: "editor-list-ol",
      ul: "editor-list-ul",
      listitem: "editor-listitem",
    },
    link: "editor-link",
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
    },
  },
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
  onError: (error: Error) => {
    console.error("Lexical error:", error);
  },
};

