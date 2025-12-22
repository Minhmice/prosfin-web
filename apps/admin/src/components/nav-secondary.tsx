"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// Icon can be from either @tabler/icons-react or lucide-react

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ComponentType<any>
    children?: { title: string; url: string; icon: React.ComponentType<any> }[]
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            // For exact routes like /content, only match exact pathname
            // For routes with children like /content/posts, match startsWith
            const isExactRoute = item.url === "/content"
            const isActive = isExactRoute 
              ? pathname === item.url
              : pathname === item.url || pathname?.startsWith(item.url + "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link href={item.url} onClick={handleNavClick}>
                    <item.icon />
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
