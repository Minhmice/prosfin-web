"use client";

import * as React from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { CommandPalette } from "./command-palette";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { Button } from "@prosfin/ui";
import { PanelLeft } from "lucide-react";

export interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { collapsed: sidebarCollapsed, setCollapsed: setSidebarCollapsed, hydrated } = useSidebarState();
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);

  // Keyboard shortcut: Cmd/Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <main className="relative flex w-full flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-1"
            onClick={() => setSidebarOpen(true)}
          >
            <PanelLeft className="size-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <AdminTopbar onCommandPaletteOpen={() => setCommandPaletteOpen(true)} />
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-background p-4 md:p-6">
          {children}
        </div>
      </main>
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  );
}
