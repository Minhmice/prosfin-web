"use client";

import * as React from "react";

/**
 * Lexical editor state type (matches admin app type)
 */
type LexicalEditorState = {
  root: {
    children: Array<Record<string, any>>;
    direction: "ltr" | "rtl" | null;
    format: string;
    indent: number;
    type: "root";
    version: number;
  };
};

// Ensure JSX namespace is available
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface PostRendererProps {
  content: LexicalEditorState;
}

/**
 * Render Lexical editor state as React components
 */
export function PostRenderer({ content }: PostRendererProps) {
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node || typeof node !== "object") return null;

    const { type, children, text, format, ...props } = node;

    // Text node
    if (type === "text") {
      let className = "";
      if (format & 1) className += "font-bold "; // bold
      if (format & 2) className += "italic "; // italic
      if (format & 4) className += "underline "; // underline

      return (
        <span key={index} className={className}>
          {text}
        </span>
      );
    }

    // Paragraph
    if (type === "paragraph") {
      return (
        <p key={index} className="mb-4">
          {children?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      );
    }

    // Headings
    if (type === "heading") {
      const tag = props.tag || "h1";
      const headingClasses = {
        h1: "text-4xl font-bold mb-4 mt-8",
        h2: "text-3xl font-bold mb-3 mt-6",
        h3: "text-2xl font-bold mb-2 mt-4",
      };
      const className = headingClasses[tag as keyof typeof headingClasses] || headingClasses.h1;
      const content = children?.map((child: any, i: number) => renderNode(child, i));
      
      if (tag === "h1") {
        return <h1 key={index} className={className}>{content}</h1>;
      } else if (tag === "h2") {
        return <h2 key={index} className={className}>{content}</h2>;
      } else if (tag === "h3") {
        return <h3 key={index} className={className}>{content}</h3>;
      }
      return <h1 key={index} className={className}>{content}</h1>;
    }

    // Quote
    if (type === "quote") {
      return (
        <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children?.map((child: any, i: number) => renderNode(child, i))}
        </blockquote>
      );
    }

    // List
    if (type === "list") {
      const Tag = props.listType === "number" ? "ol" : "ul";
      const listClasses = props.listType === "number" ? "list-decimal ml-6 my-2" : "list-disc ml-6 my-2";
      return (
        <Tag key={index} className={listClasses}>
          {children?.map((child: any, i: number) => renderNode(child, i))}
        </Tag>
      );
    }

    // List item
    if (type === "listitem") {
      return (
        <li key={index} className="my-1">
          {children?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      );
    }

    // Link
    if (type === "link") {
      return (
        <a
          key={index}
          href={props.url}
          target={props.target || "_self"}
          rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children?.map((child: any, i: number) => renderNode(child, i))}
        </a>
      );
    }

    // Default: render children
    if (children) {
      return (
        <div key={index}>
          {children.map((child: any, i: number) => renderNode(child, i))}
        </div>
      );
    }

    return null;
  };

  if (!content?.root?.children) {
    return <p className="text-muted-foreground">No content</p>;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.root.children.map((child: any, index: number) => renderNode(child, index))}
    </div>
  );
}

