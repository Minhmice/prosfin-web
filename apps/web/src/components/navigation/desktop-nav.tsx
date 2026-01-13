"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { getSiteNavigation } from "@/content/site.navigation";
import { cn } from "@/lib/utils";
import { ProsfinPrimaryButton } from "@/components/shared";

/**
 * DesktopNav - Desktop navigation component với mega menu
 * 
 * Sử dụng shadcn Navigation Menu để render:
 * - Mega menu cho "Dịch vụ" (5-column grid)
 * - Dropdown cho "Về ProsFIN", "Góc nhìn", "Tuyển dụng"
 * - CTA button
 * 
 * Data source: site.navigation.ts (single source of truth)
 */
export function DesktopNav() {
  const pathname = usePathname();
  const navigation = getSiteNavigation();

  // Check if pathname matches nav item (for active state)
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    // Handle query params (e.g., /insights?topic=tai-chinh)
    const hrefPath = href.split("?")[0];
    // Check if pathname starts with href path
    // For nested routes like /services/{category}/{service}, we want to highlight parent
    if (pathname === hrefPath || pathname.startsWith(hrefPath + "/")) {
      return true;
    }
    return false;
  };

  return (
    <div className="hidden md:flex md:items-center md:gap-6">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Dịch vụ - Mega menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium",
                (isActive("/services") || pathname.startsWith("/services/")) && "text-foreground"
              )}
            >
              {navigation.mainNav[0]?.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ServicesMegaMenu
                categories={navigation.mainNav[0]?.children || []}
              />
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Về ProsFIN - Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium",
                isActive("/about") && "text-foreground"
              )}
            >
              {navigation.mainNav[1]?.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <AboutDropdown items={navigation.mainNav[1]?.children || []} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Góc nhìn - Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium",
                (isActive("/insights") || pathname.startsWith("/insights")) && "text-foreground"
              )}
            >
              {navigation.mainNav[2]?.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <InsightsDropdown items={navigation.mainNav[2]?.children || []} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tuyển dụng - Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium",
                (isActive("/recruitment") || pathname.startsWith("/recruitment")) && "text-foreground"
              )}
            >
              {navigation.mainNav[3]?.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <RecruitmentDropdown items={navigation.mainNav[3]?.children || []} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>

      {/* CTA Button */}
      <ProsfinPrimaryButton href={navigation.cta.href} size="sm">
        {navigation.cta.label}
      </ProsfinPrimaryButton>
    </div>
  );
}

/**
 * Services Mega Menu - 5-column grid với categories và services
 */
function ServicesMegaMenu({ categories }: { categories: Array<{ id: string; label: string; href: string; description?: string; children?: Array<{ id: string; label: string; href: string; description?: string }> }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 p-4 lg:p-6 w-full max-w-6xl max-h-[600px] overflow-y-auto">
      {categories.map((category) => (
        <div key={category.id} className="space-y-3 min-w-0">
          <Link
            href={category.href}
            className="block font-semibold text-sm hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            {category.label}
          </Link>
          <ul className="space-y-2">
            {category.children?.map((service) => (
              <li key={service.id}>
                <NavigationMenuLink asChild>
                  <Link
                    href={service.href}
                    className={cn(
                      "block rounded-sm p-2 text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="font-medium leading-none">
                        {service.label}
                      </div>
                      {service.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1 leading-snug">
                          {service.description}
                        </div>
                      )}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * About Dropdown - Simple list
 */
function AboutDropdown({ items }: { items: Array<{ id: string; label: string; href: string; description?: string }> }) {
  return (
    <ul className="w-[200px] p-2">
      {items.map((item) => (
        <li key={item.id}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground"
              )}
            >
              <div className="text-sm font-medium leading-none">
                {item.label}
              </div>
              {item.description && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {item.description}
                </p>
              )}
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Insights Dropdown - Hub link + topic quick links
 */
function InsightsDropdown({ items }: { items: Array<{ id: string; label: string; href: string; description?: string }> }) {
  return (
    <ul className="w-[250px] p-2">
      <li>
        <NavigationMenuLink asChild>
          <Link
            href="/insights"
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground",
              "font-semibold"
            )}
          >
            Xem tất cả
          </Link>
        </NavigationMenuLink>
      </li>
      {items.map((item) => (
        <li key={item.id}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground"
              )}
            >
              <div className="text-sm font-medium leading-none">
                {item.label}
              </div>
              {item.description && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {item.description}
                </p>
              )}
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * Recruitment Dropdown - Brokerage, Training, Talent pool
 */
function RecruitmentDropdown({ items }: { items: Array<{ id: string; label: string; href: string; description?: string }> }) {
  // Check if talent pool page exists (for badge)
  const hasTalentPool = items.some((item) => item.id === "recruitment-talent-pool");

  return (
    <ul className="w-[250px] p-2">
      {items.map((item) => {
        const isTalentPool = item.id === "recruitment-talent-pool";
        // For now, we'll show badge if it's talent pool (can be enhanced later to check if page exists)
        const showBadge = isTalentPool;

        return (
          <li key={item.id}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium leading-none">
                    {item.label}
                  </div>
                  {showBadge && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Sắp ra mắt
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        );
      })}
    </ul>
  );
}

