"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { useQuickCreate } from "@/components/shared/quick-create-context"
import { CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { FileText, Users, UserPlus, Calendar, Settings, LayoutDashboard } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  subtitle?: string
  type: "page" | "action" | "client" | "lead" | "post" | "task"
  href?: string
  icon?: React.ReactNode
  action?: () => void
}

/**
 * Command Palette / Global Search component with keyboard shortcut (⌘K or Ctrl+K)
 * Unified search across pages, create actions, and entities
 */
export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { openNewLead, openNewClient, openNewPost } = useQuickCreate()

  // Keyboard shortcut: ⌘K or Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Pages navigation
  const pages: SearchResult[] = [
    { id: "dashboard", title: "Dashboard", type: "page", href: "/dashboard", icon: <LayoutDashboard /> },
    { id: "leads", title: "Leads", type: "page", href: "/crm/leads", icon: <UserPlus /> },
    { id: "clients", title: "Clients", type: "page", href: "/crm/clients", icon: <Users /> },
    { id: "posts", title: "Posts", type: "page", href: "/content/posts", icon: <FileText /> },
    { id: "schedules", title: "Schedules", type: "page", href: "/content/schedules", icon: <Calendar /> },
    { id: "settings", title: "Settings", type: "page", href: "/settings", icon: <Settings /> },
  ]

  // Create actions
  const createActions: SearchResult[] = [
    { id: "create-lead", title: "Create Lead", type: "action", action: () => { openNewLead(); setOpen(false) }, icon: <UserPlus /> },
    { id: "create-client", title: "Create Client", type: "action", action: () => { openNewClient(); setOpen(false) }, icon: <Users /> },
    { id: "create-post", title: "Create Post", type: "action", action: () => { openNewPost(); setOpen(false) }, icon: <FileText /> },
  ]

  const handleSelect = (item: SearchResult) => {
    if (item.action) {
      item.action()
    } else if (item.href) {
      router.push(item.href)
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-64 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, create actions, or jump to entity..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Create">
            {createActions.map((action) => (
              <CommandItem
                key={action.id}
                value={action.title}
                onSelect={() => handleSelect(action)}
              >
                {action.icon}
                <span>{action.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.id}
                value={page.title}
                onSelect={() => handleSelect(page)}
              >
                {page.icon}
                <span>{page.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {/* TODO: Add entity search when data layer is ready */}
          {/* <CommandSeparator />
          <CommandGroup heading="Entities">
            <CommandItem disabled>
              <span>Search clients, leads, posts...</span>
              <CommandShortcut>Coming soon</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  )
}

