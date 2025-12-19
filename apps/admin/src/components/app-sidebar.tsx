"use client"

import * as React from "react"
import Link from "next/link"
import { IconInnerShadowTop } from "@tabler/icons-react"
import { Image, Calendar, MessageSquare } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavPosts } from "@/components/nav-posts"
import { NavUser } from "@/components/nav-user"
import { mainNavItems, secondaryNavItems } from "@/config/nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Client-only wrapper to prevent hydration mismatch with Radix UI IDs
function ClientOnlySidebar({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure to prevent layout shift
    return (
      <div className="group/sidebar-wrapper flex min-h-svh w-full">
        <aside className="peer hidden w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-linear group-data-[collapsible=icon]:!flex md:flex" />
      </div>
    )
  }

  return <>{children}</>
}

const user = {
  name: "Admin User",
  email: "admin@prosfin.com",
  avatar: "/avatars/admin.jpg",
}

// Convert nav items to format expected by components
const mainNavItemsFormatted = mainNavItems.map((item) => ({
  title: item.label,
  url: item.href,
  icon: item.icon,
}))

// Content items (excluding Posts which is handled separately)
const contentItems = secondaryNavItems
  .filter((item) => item.label !== "Posts")
  .map((item) => ({
    title: item.label,
    url: item.href,
    icon: item.icon,
  }))

// Posts items
const postsItems = [
  { title: "All Posts", url: "/content/posts" },
  { title: "Drafts", url: "/content/posts/drafts" },
  { title: "Scheduled", url: "/content/posts/scheduled" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <ClientOnlySidebar>
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Link href="/">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">ProsFIN Admin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={mainNavItemsFormatted} />
          <div className="mt-4 md:mt-8">
            <NavSecondary items={contentItems} />
            <NavPosts items={postsItems} />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
    </ClientOnlySidebar>
  )
}
