"use client";

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
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { cn } from "@/lib/utils";

interface OurPeopleProps {
  people: Person[];
  title?: string;
}

/**
 * OurPeople - Display people section with tooltip
 * 
 * Hiển thị các thành viên team với avatar, name, title, và tooltip bio.
 * Hỗ trợ mail và phone actions.
 */
export function OurPeople({ people, title = "Our People" }: OurPeopleProps) {
  if (!people || people.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading title={title} align="left" titleSize="lg" />

      <TooltipProvider>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <Tooltip key={person.id} side="top">
              <TooltipTrigger asChild>
                <Card className="cursor-pointer transition-all hover:shadow-md">
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
                          <a
                            href={`mailto:${person.email}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="space-y-2">
                  {person.bioLong ? (
                    <p className="text-sm">{person.bioLong}</p>
                  ) : (
                    <p className="text-sm">{person.tooltipBio}</p>
                  )}
                  
                  {person.focusAreas && person.focusAreas.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-semibold mb-1">Lĩnh vực chuyên sâu:</p>
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
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

