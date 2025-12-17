"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal, Folder, Share2, Trash2 } from "lucide-react";
import { FileStack } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@prosfin/ui";

const documents = [
  {
    name: "Data Library",
    href: "/documents/data-library",
    icon: FileStack,
  },
  {
    name: "Reports",
    href: "/documents/reports",
    icon: FileStack,
  },
  {
    name: "Word Assistant",
    href: "/documents/word-assistant",
    icon: FileStack,
  },
];

/**
 * NavDocuments - Documents section với dropdown actions
 * 
 * Hiển thị:
 * - Section label "Documents"
 * - Document items với dropdown actions (Open, Share, Delete)
 * - "More" button ở cuối
 * - Ẩn khi sidebar collapsed
 */
export function NavDocuments() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <SidebarMenuItem key={doc.name}>
              <SidebarMenuButton asChild>
                <Link href={doc.href}>
                  <Icon />
                  <span>{doc.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

