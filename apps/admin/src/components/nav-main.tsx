"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useQuickCreate } from "@/components/shared/quick-create-context"
import { toast } from "sonner"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const { openNewLead, openNewClient, openNewPost } = useQuickCreate()

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleNewPost = () => {
    toast.info("This feature will be available in Phase 2")
    openNewPost()
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mb-5">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="start">
                <DropdownMenuItem onClick={openNewLead}>
                  New Lead
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openNewClient}>
                  New Client
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNewPost}>
                  Create Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url || pathname?.startsWith(item.url + "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                >
                  <Link href={item.url} onClick={handleNavClick}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
