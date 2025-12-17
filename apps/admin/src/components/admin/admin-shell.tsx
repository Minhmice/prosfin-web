"use client";

import * as React from "react";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@prosfin/ui";

interface AdminShellProps {
  children: React.ReactNode;
}

/**
 * AdminShell - Main shell component cho admin app
 * 
 * Wraps content với SidebarProvider, AppSidebar, và SidebarInset.
 * Cung cấp layout structure với sidebar bên trái và content bên phải.
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

