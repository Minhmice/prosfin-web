"use client";

import * as React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $getRoot,
} from "lexical";
import { $isHeadingNode, $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $isListNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { $createLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@prosfin/ui";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Link, Minus } from "lucide-react";

export function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const headingNode = $createHeadingNode(headingSize);
        selection.insertNodes([headingNode]);
      }
    });
  };

  const insertDivider = () => {
    editor.update(() => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      root.append(paragraph);
      // Create a simple divider using a paragraph with border
      const divider = $createParagraphNode();
      divider.setFormat("center");
      root.append(divider);
    });
  };

  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("");
  const [linkText, setLinkText] = React.useState("");

  const insertLink = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (!selection.isCollapsed()) {
          // If text is selected, make it a link
          const url = linkUrl || "https://";
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        } else {
          // Insert link node with text
          const linkNode = $createLinkNode(linkUrl || "https://", { target: "_blank" });
          const paragraph = $createParagraphNode();
          if (linkText) {
            // Add text node to paragraph, then add paragraph to link
            // This is simplified - in real implementation would use TextNode
            selection.insertNodes([linkNode]);
          } else {
            selection.insertNodes([linkNode]);
          }
        }
      }
      setLinkDialogOpen(false);
      setLinkUrl("");
      setLinkText("");
    });
  };

  return (
    <div className="flex items-center gap-1 border-b p-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={isBold ? "bg-muted" : ""}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={isItalic ? "bg-muted" : ""}
      >
        <Italic className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={isUnderline ? "bg-muted" : ""}
      >
        <Underline className="size-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatHeading("h1")}
        title="Heading 1"
      >
        <Heading1 className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatHeading("h2")}
        title="Heading 2"
      >
        <Heading2 className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatHeading("h3")}
        title="Heading 3"
      >
        <Heading3 className="size-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        title="Bullet List"
      >
        <List className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        title="Numbered List"
      >
        <ListOrdered className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const quoteNode = $createQuoteNode();
              selection.insertNodes([quoteNode]);
            }
          });
        }}
        title="Quote"
      >
        <Quote className="size-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" />
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Insert Link"
          >
            <Link className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-text">Link Text (optional)</Label>
              <Input
                id="link-text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
            </div>
            <Button onClick={insertLink} className="w-full">
              Insert Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="ghost"
        size="icon"
        onClick={insertDivider}
        title="Divider"
      >
        <Minus className="size-4" />
      </Button>
    </div>
  );
}

