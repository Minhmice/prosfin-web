"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/shell/topbar";
import { Toaster } from "@/components/ui/sonner";
import { QuickCreateProvider } from "@/components/shared/quick-create-context";
import { LeadFormSheet } from "@/features/crm/leads/lead-form-sheet";
import { ClientFormSheet } from "@/features/crm/clients/client-form-sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leadFormOpen, setLeadFormOpen] = React.useState(false)
  const [clientFormOpen, setClientFormOpen] = React.useState(false)

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const accent = localStorage.getItem('admin-accent-theme') || 'ocean';
                document.documentElement.setAttribute('data-accent', accent);
              } catch (e) {}
            })();
          `,
        }}
      />
      <QuickCreateProvider
        onNewLead={() => setLeadFormOpen(true)}
        onNewClient={() => setClientFormOpen(true)}
        onNewPost={() => {}}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <Topbar />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
        <LeadFormSheet
          open={leadFormOpen}
          onOpenChange={setLeadFormOpen}
        />
        <ClientFormSheet
          open={clientFormOpen}
          onOpenChange={setClientFormOpen}
        />
      </QuickCreateProvider>
    </>
  );
}
