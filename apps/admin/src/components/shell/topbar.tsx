"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumbs } from "./breadcrumbs"
import { GlobalSearch } from "./global-search"
import { QuickActions } from "./quick-actions"
import { UserMenu } from "./user-menu"
import { NotificationsButton } from "./notifications-button"

/**
 * Topbar component for admin app
 * Includes: sidebar trigger, breadcrumbs, global search, quick actions, notifications, user menu
 */
export function Topbar() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-4 lg:px-6">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 h-4" />

        {/* Breadcrumbs */}
        <div className="flex-1 min-w-0">
          <Breadcrumbs />
        </div>

        {/* Right side: Search, Quick Actions, Notifications, User Menu */}
        <div className="flex items-center gap-2">
          {/* Global Search */}
          <div className="hidden md:block">
            <GlobalSearch />
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Notifications */}
          <NotificationsButton />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

