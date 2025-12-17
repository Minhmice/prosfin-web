"use client";

import * as React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@prosfin/ui";

// Mock user data - sẽ thay bằng real data sau
const userData = {
  name: "Admin User",
  email: "admin@prosfin.vn",
  avatar: undefined,
};

/**
 * AppSidebar - Main sidebar component cho admin app
 * 
 * Cấu trúc:
 * - SidebarHeader: ProsFIN logo với Building2 icon
 * - SidebarContent: NavMain, NavDocuments (optional), NavSecondary
 * - SidebarFooter: NavUser
 */
export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Building2 className="!size-5" />
                <span className="text-base font-semibold">ProsFIN</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavDocuments />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}

