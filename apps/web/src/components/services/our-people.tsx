"use client";

import * as React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { Person } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/shared/tooltip/animated-tooltip";
import {
  HoverCardProvider,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/shared/hover-card/hover-card";
import { PersonDetailDrawer } from "./person-detail-drawer";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface OurPeopleProps {
  people: Person[];
  title?: string;
}

/**
 * OurPeople - Display people section with HoverCard and Tooltip
 * 
 * Hiển thị các thành viên team với avatar, name, title.
 * - HoverCard khi hover vào card để hiển thị chi tiết (bioLong, focusAreas, bestFor)
 * - Tooltip riêng cho mail/call icons
 * - Hỗ trợ keyboard navigation (Tab + Enter/Space)
 */
export function OurPeople({ people, title = "Our People" }: OurPeopleProps) {
  const isMobile = useMobile();
  const [openDrawerId, setOpenDrawerId] = React.useState<string | null>(null);

  if (!people || people.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading title={title} align="left" titleSize="lg" />

      <HoverCardProvider>
        <TooltipProvider>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => {
              const cardContent = (
                <Card className="cursor-pointer transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        {person.avatarUrl ? (
                          <Image
                            src={person.avatarUrl}
                            alt={person.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
                              "text-lg font-semibold"
                            )}
                          >
                            {person.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">{person.name}</h4>
                          <p className="text-sm text-muted-foreground">{person.title}</p>
                        </div>
                      </div>

                      {person.tags && person.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {person.tags.slice(0, 3).map((tag) => (
                            <AppBadge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </AppBadge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        {person.email && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={`mailto:${person.email}`}
                                className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted focus:ring-2 focus:ring-primary"
                                onClick={(e) => e.stopPropagation()}
                                onFocus={(e) => e.stopPropagation()}
                                aria-label={`Gửi email cho ${person.name}`}
                              >
                                <Mail className="h-4 w-4" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{person.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {person.phone && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={`tel:${person.phone}`}
                                className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted focus:ring-2 focus:ring-primary"
                                onClick={(e) => e.stopPropagation()}
                                onFocus={(e) => e.stopPropagation()}
                                aria-label={`Gọi ${person.name}`}
                              >
                                <Phone className="h-4 w-4" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{person.phone}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              // Mobile: Use Drawer
              if (isMobile) {
                return (
                  <React.Fragment key={person.id}>
                    <div onClick={() => setOpenDrawerId(person.id)}>
                      {cardContent}
                    </div>
                    <PersonDetailDrawer
                      person={person}
                      open={openDrawerId === person.id}
                      onOpenChange={(open) => {
                        setOpenDrawerId(open ? person.id : null);
                      }}
                    />
                  </React.Fragment>
                );
              }

              // Desktop: Use HoverCard
              return (
                <HoverCard key={person.id} side="top">
                  <HoverCardTrigger asChild>{cardContent}</HoverCardTrigger>
                  <HoverCardContent className="max-w-sm">
                    <div className="space-y-3">
                      {person.bioLong ? (
                        <p className="text-sm leading-relaxed">{person.bioLong}</p>
                      ) : (
                        <p className="text-sm leading-relaxed">{person.tooltipBio}</p>
                      )}
                      
                      {person.focusAreas && person.focusAreas.length > 0 && (
                        <div className="pt-2 border-t">
                          <p className="text-xs font-semibold mb-2">Lĩnh vực chuyên sâu:</p>
                          <div className="flex flex-wrap gap-1">
                            {person.focusAreas.map((area) => (
                              <span key={area} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {person.bestFor && person.bestFor.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs font-semibold mb-1">Phù hợp cho:</p>
                          <p className="text-xs text-muted-foreground">
                            {person.bestFor.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        </TooltipProvider>
      </HoverCardProvider>
    </div>
  );
}

