"use client";

import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder } from "../image-placeholder";
import { Linkedin } from "lucide-react";

export interface ProsfinTeamCardWrapperProps {
  /**
   * Team member name
   */
  name: string;
  /**
   * Role/title
   */
  role: string;
  /**
   * Short bio (2-3 sentences)
   */
  bio: string;
  /**
   * Credentials (badges)
   */
  credentials?: string[];
  /**
   * Avatar image URL
   */
  avatarUrl?: string;
  /**
   * LinkedIn profile URL
   */
  linkedInUrl?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinTeamCardWrapper - Wrapper component cho Team Member Cards
 * 
 * Wrap shadcn Card với style thống nhất cho mọi team member card.
 * Có avatar, name, role, credentials, bio.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinTeamCardWrapper({
  name,
  role,
  bio,
  credentials,
  avatarUrl,
  linkedInUrl,
  className,
}: ProsfinTeamCardWrapperProps) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:border-primary/50",
        className
      )}
    >
      <CardHeader className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="mb-4">
          {avatarUrl ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          ) : (
            <AvatarPlaceholder
              label={getInitials(name)}
              icon={undefined}
              size="lg"
              className="h-24 w-24 rounded-full"
            />
          )}
        </div>

        {/* Name & Role */}
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="mt-1 text-base font-medium">
          {role}
        </CardDescription>

        {/* Credentials */}
        {credentials && credentials.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {credentials.map((cred, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {cred}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {/* Bio */}
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {bio}
        </p>

        {/* LinkedIn Link */}
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </CardContent>
    </Card>
  );
}

