"use client";

import * as React from "react";
import { Search, Bell, User, Plus, Link as LinkIcon } from "lucide-react";
import { Button, Input, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@prosfin/ui";
import { Breadcrumb } from "./breadcrumb";
import { useRouter } from "next/navigation";

export interface AdminTopbarProps {
  onMenuClick?: () => void;
  onCommandPaletteOpen?: () => void;
}

export function AdminTopbar({ onMenuClick, onCommandPaletteOpen }: AdminTopbarProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-between gap-4">
      {/* Left: Breadcrumb */}
      <div className="hidden md:block">
        <Breadcrumb />
      </div>

      {/* Center: Command trigger (hidden on mobile, shown as button on desktop) */}
      <div className="flex-1 flex justify-center">
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2 text-muted-foreground"
          onClick={onCommandPaletteOpen}
        >
          <Search className="size-4" />
          <span className="text-sm">Search...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Right: Quick actions + User menu */}
      <div className="flex items-center gap-2">
        {/* Quick actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Plus className="size-5" />
              <span className="sr-only">Quick actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/content/new")}>
              <Plus className="mr-2 size-4" />
              New Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/campaigns?action=create")}>
              <LinkIcon className="mr-2 size-4" />
              Create Campaign Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="size-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </div>
  );
}
