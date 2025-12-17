/**
 * TrustBarSection - Trust bar với logos/credentials
 * 
 * Section hiển thị trust indicators (logos, credentials, awards).
 * Mobile: scroll ngang hoặc wrap 2 hàng.
 */

"use client";

import Image from "next/image";
import { AppSection, AppContainer } from "@/components/shared";
import { type LandingContent } from "@/lib/content/types";

interface TrustBarSectionProps {
  content?: LandingContent["trust"];
}

/**
 * TrustBarSection - Trust bar component
 * 
 * @example
 * ```tsx
 * <TrustBarSection content={landingContent.trust} />
 * ```
 */
export function TrustBarSection({ content }: TrustBarSectionProps) {
  if (!content) {
    return null;
  }

  return (
    <AppSection id="trust" padding="sm" background="default">
      <AppContainer>
        <div className="flex flex-col gap-6">
          {content.title && (
            <p className="text-center text-sm font-medium text-muted-foreground">
              {content.title}
            </p>
          )}
          {content.logos && content.logos.length > 0 && (
            <>
              <div className="h-px w-full bg-border" />
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {content.logos.map((logo, index) => (
                  <div
                    key={logo.name || index}
                    className="flex items-center justify-center opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
                  >
                    {logo.url ? (
                      <a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Image
                          src={logo.logo}
                          alt={logo.name}
                          width={120}
                          height={40}
                          className="h-8 w-auto md:h-10"
                        />
                      </a>
                    ) : (
                      <Image
                        src={logo.logo}
                        alt={logo.name}
                        width={120}
                        height={40}
                        className="h-8 w-auto md:h-10"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </AppContainer>
    </AppSection>
  );
}

