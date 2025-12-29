"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, Phone, X } from "lucide-react";
import type { Person } from "@/types/content";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { cn } from "@/lib/utils";

interface PersonDetailDrawerProps {
  person: Person;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * PersonDetailDrawer - Drawer component để hiển thị person details trên mobile
 * 
 * Hiển thị đầy đủ thông tin person trong Sheet:
 * - Avatar, name, title
 * - bioLong
 * - focusAreas
 * - bestFor
 * - Contact buttons (email, phone)
 */
export function PersonDetailDrawer({
  person,
  trigger,
  open,
  onOpenChange,
}: PersonDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">{person.name} - Chi tiết</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pt-4">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            {person.avatarUrl ? (
              <Image
                src={person.avatarUrl}
                alt={person.name}
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
                  "text-2xl font-semibold"
                )}
              >
                {person.name.charAt(0)}
              </div>
            )}
            <div className="flex-1 space-y-1">
              <h3 className="text-2xl font-semibold">{person.name}</h3>
              <p className="text-lg text-muted-foreground">{person.title}</p>
            </div>
          </div>

          {/* Tags */}
          {person.tags && person.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {person.tags.map((tag) => (
                <AppBadge key={tag} variant="outline">
                  {tag}
                </AppBadge>
              ))}
            </div>
          )}

          {/* Bio Long */}
          <div className="space-y-2">
            <h4 className="font-semibold">Giới thiệu</h4>
            {person.bioLong ? (
              <p className="text-muted-foreground leading-relaxed">{person.bioLong}</p>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{person.tooltipBio}</p>
            )}
          </div>

          {/* Focus Areas */}
          {person.focusAreas && person.focusAreas.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Lĩnh vực chuyên sâu</h4>
              <div className="flex flex-wrap gap-2">
                {person.focusAreas.map((area) => (
                  <AppBadge key={area} variant="outline" className="bg-primary/10 text-primary">
                    {area}
                  </AppBadge>
                ))}
              </div>
            </div>
          )}

          {/* Best For */}
          {person.bestFor && person.bestFor.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Phù hợp cho</h4>
              <p className="text-muted-foreground">{person.bestFor.join(", ")}</p>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t">
            {person.email && (
              <ProsfinPrimaryButton
                href={`mailto:${person.email}`}
                className="w-full gap-2"
                variant="outline"
              >
                <Mail className="h-4 w-4" />
                Gửi email: {person.email}
              </ProsfinPrimaryButton>
            )}
            {person.phone && (
              <ProsfinPrimaryButton
                href={`tel:${person.phone}`}
                className="w-full gap-2"
                variant="outline"
              >
                <Phone className="h-4 w-4" />
                Gọi: {person.phone}
              </ProsfinPrimaryButton>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

