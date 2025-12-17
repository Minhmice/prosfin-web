"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  cn,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@prosfin/ui";
import { navGroups } from "@/lib/navigation";
import { ChevronRight, ChevronsUpDown, PanelLeft } from "lucide-react";

export interface AdminSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AdminSidebar({
  open,
  onOpenChange,
  collapsed = false,
  onCollapsedChange,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-4">
        {!collapsed ? (
          <div className="flex w-full items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <span className="text-sm font-semibold">P</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold">ProsFIN</span>
              <span className="truncate text-xs text-sidebar-foreground/70">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              onClick={() => onCollapsedChange?.(!collapsed)}
            >
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
        ) : (
          <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="text-sm font-semibold">P</span>
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {navGroups.map((group, groupIdx) => (
          <div key={group.label} className="relative flex w-full min-w-0 flex-col">
            {!collapsed && (
              <div className="flex shrink-0 items-center px-4 py-2 text-xs font-medium text-sidebar-foreground/70">
                {group.label}
              </div>
            )}
            <ul className="flex w-full min-w-0 flex-col space-y-0.5 px-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="group/menu-item relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      onClick={() => onOpenChange?.(false)}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon className="size-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                      {item.badge && !collapsed && (
                        <span className="ml-auto rounded-full bg-sidebar-primary px-2 py-0.5 text-xs text-sidebar-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="flex shrink-0 flex-col border-t border-sidebar-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "overflow-hidden outline-hidden hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-2"
              )}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="text-xs font-medium">A</span>
              </div>
              {!collapsed && (
                <>
                  <div className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate text-sm font-medium">Admin</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      admin@prosfin.vn
                    </span>
                  </div>
                  <ChevronsUpDown className="size-4 shrink-0" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn("hidden md:block", collapsed ? "w-16" : "w-64")}>
        <SidebarContent />
      </aside>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0 md:hidden">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
