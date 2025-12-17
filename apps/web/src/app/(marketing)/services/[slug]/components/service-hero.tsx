import * as React from "react";
import { ProsfinPrimaryButton, ProsfinSecondaryButton, Text, H1 } from "@/components/shared";

type ServiceHeroProps = {
  tags: string[];
  title: string;
  summaryBullets: string[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

export function ServiceHero({
  tags,
  title,
  summaryBullets,
  primaryCta,
  secondaryCta,
}: ServiceHeroProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <H1 className="mb-4">{title}</H1>

      <ul className="mb-8 max-w-3xl space-y-3">
        {summaryBullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 text-primary" aria-hidden="true">
              •
            </span>
            <Text as="span" variant="body">
              {bullet}
            </Text>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 sm:flex-row">
        <ProsfinPrimaryButton href={primaryCta.href} size="lg">
          {primaryCta.label}
        </ProsfinPrimaryButton>
        <ProsfinSecondaryButton href={secondaryCta.href} size="lg">
          {secondaryCta.label}
        </ProsfinSecondaryButton>
      </div>
    </div>
  );
}


