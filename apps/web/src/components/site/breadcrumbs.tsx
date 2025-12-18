"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface SiteBreadcrumbsProps {
  items: BreadcrumbItemData[];
}

/**
 * SiteBreadcrumbs - Breadcrumb component for site navigation
 * 
 * Hiển thị breadcrumb navigation với các items có thể click.
 * Item cuối cùng không có href sẽ được render như current page.
 */
export function SiteBreadcrumbs({ items }: SiteBreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

