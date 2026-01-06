"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ResearchTocProps {
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * ResearchToc - Sticky Table of Contents
 * 
 * Auto-builds from headings in content and highlights current section
 */
export function ResearchToc({ contentRef }: ResearchTocProps) {
  const [headings, setHeadings] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    // Find all headings in content
    const container = contentRef?.current || document;
    const headingElements = container.querySelectorAll("h2, h3, h4");

    const tocItems: TocItem[] = [];
    headingElements.forEach((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      if (!id) return;

      // Set id if not present
      if (!el.id) {
        el.id = id;
      }

      const level = parseInt(el.tagName.charAt(1));
      tocItems.push({
        id,
        text: el.textContent || "",
        level,
      });
    });

    setHeadings(tocItems);
  }, [contentRef]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for sticky header

      // Find the heading that's currently in view
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = document.getElementById(headings[i].id);
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id);
          break;
        }
      }
    };

    if (headings.length > 0) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20 space-y-2">
      <h3 className="text-sm font-semibold">Mục lục</h3>
      <nav className="space-y-1">
        {headings.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-primary",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-8",
              activeId === item.id
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}

