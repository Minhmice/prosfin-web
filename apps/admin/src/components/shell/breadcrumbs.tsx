"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/crm/leads": "Leads",
  "/clients": "Clients",
  "/crm/clients": "Clients",
  "/content": "Content",
  "/content/posts": "Posts",
  "/content/schedules": "Schedules",
  "/content/media": "Media",
  "/content/comments": "Comments",
  "/settings": "Settings",
  "/reports": "Reports",
  "/tables": "Tables",
}

/**
 * Breadcrumbs component that generates breadcrumb navigation from pathname
 */
export function Breadcrumbs() {
  const pathname = usePathname()

  const pathSegments = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: Array<{ label: string; href: string }> = []

    // Always include home/dashboard
    breadcrumbs.push({ label: "Dashboard", href: "/dashboard" })

    // Build breadcrumbs from segments
    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }, [pathname])

  if (pathSegments.length <= 1) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((item, index) => {
          const isLast = index === pathSegments.length - 1

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

