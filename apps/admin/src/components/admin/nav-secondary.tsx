"use client";

import * as React from "react";
import Link from "next/link";
import { Settings, HelpCircle, Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@prosfin/ui";

const secondaryItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Get Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "Search",
    href: "#",
    icon: Search,
  },
];

/**
 * NavSecondary - Secondary navigation section
 * 
 * Hiển thị Settings, Get Help, và Search links.
 * Đặt ở cuối content với mt-auto để push xuống dưới.
 */
export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
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

