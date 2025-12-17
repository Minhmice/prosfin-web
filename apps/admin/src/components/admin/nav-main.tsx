"use client";

import * as React from "react";
import Link from "next/link";
import { CirclePlus, Mail } from "lucide-react";
import { Button } from "@prosfin/ui";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@prosfin/ui";
import { navGroups } from "@/lib/navigation";

/**
 * NavMain - Main navigation section với Quick Create và Inbox buttons
 * 
 * Hiển thị:
 * - Quick Create button (primary, link đến /content/new)
 * - Inbox button (outline, link đến /leads, ẩn khi collapsed)
 * - Main menu items từ navGroups[0].items
 */
export function NavMain() {
  const mainItems = navGroups[0]?.items || [];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Link href="/content/new">
                <CirclePlus />
                <span>Quick Create</span>
              </Link>
            </SidebarMenuButton>
            <Button
              asChild
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <Link href="/leads">
                <Mail />
                <span className="sr-only">Inbox</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

