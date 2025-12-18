"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface PostNavItem {
  title: string
  url: string
}

export function NavPosts({ items }: { items: PostNavItem[] }) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(
    pathname?.startsWith("/content/posts") ?? false
  )

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const isPostsActive = pathname?.startsWith("/content/posts") ?? false

  return (
    <div className="mt-2">
      <SidebarMenu>
        <Collapsible asChild open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip="Posts" isActive={isPostsActive}>
              <FileText />
              <span>Posts</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton asChild isActive={isActive}>
                      <Link href={item.url} onClick={handleNavClick}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
    </div>
  )
}
