import Link from "next/link";
import type { Post } from "@/types/content";
import type { Service } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { getRelatedServices } from "@/lib/research/related";

interface RelatedServicesProps {
  post: Post;
  allServices: Service[];
  onOpenServiceFinder?: () => void;
}

/**
 * RelatedServices - Display related services for a post
 * 
 * Shows services linked via serviceSlugs and similar services
 * Includes CTA to open Service Finder
 */
export function RelatedServices({
  post,
  allServices,
  onOpenServiceFinder,
}: RelatedServicesProps) {
  const related = getRelatedServices(post, allServices);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <ProsfinSectionHeading
        title="Dịch vụ liên quan"
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border p-4 transition-all hover:border-primary"
          >
            <h3 className="font-semibold">{service.title}</h3>
            {service.excerpt && (
              <p className="mt-2 text-sm text-muted-foreground">
                {service.excerpt}
              </p>
            )}
            <ProsfinSecondaryButton
              href={`/services/${service.slug}`}
              className="mt-4 w-full"
              size="sm"
            >
              Xem chi tiết
            </ProsfinSecondaryButton>
          </div>
        ))}
      </div>
      {onOpenServiceFinder && (
        <div className="flex justify-center">
          <ProsfinPrimaryButton onClick={onOpenServiceFinder} size="lg">
            Xem dịch vụ phù hợp với bạn
          </ProsfinPrimaryButton>
        </div>
      )}
    </section>
  );
}

