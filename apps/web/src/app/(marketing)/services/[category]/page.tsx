import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCategoryBySlug,
  getServicesByCategory,
  getAllCategoryPaths,
} from "@/lib/services/getServiceCatalog";
import { buildCategoryMetadata } from "@/lib/services/serviceMeta";
import { buildCategoryBreadcrumb } from "@/lib/services/servicesBreadcrumb";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Generate static params for all category slugs
 */
export async function generateStaticParams() {
  const paths = getAllCategoryPaths();
  return paths;
}

/**
 * Generate metadata for category page
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | ProsFIN",
    };
  }

  return buildCategoryMetadata(category);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const services = getServicesByCategory(category.id);
  const breadcrumbs = buildCategoryBreadcrumb(category);

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <SiteBreadcrumbs items={breadcrumbs} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Category Hero */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">{category.label}</h1>
            {category.description && (
              <p className="text-lg text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Service List */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Các dịch vụ trong nhóm</h2>
            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service.id}
                  className={cn(
                    "border rounded-lg p-6 transition-colors",
                    "hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Link
                          href={service.links.href}
                          className="text-xl font-semibold hover:text-foreground transition-colors"
                        >
                          {service.title}
                        </Link>
                        {service.status !== "existing" && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            Đang hoàn thiện
                          </span>
                        )}
                      </div>
                      {service.tagline && (
                        <p className="text-muted-foreground">{service.tagline}</p>
                      )}
                    </div>
                    <ProsfinPrimaryButton asChild size="sm">
                      <Link href={service.links.href}>Tìm hiểu thêm</Link>
                    </ProsfinPrimaryButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">
              Bạn cần tư vấn về {category.label.toLowerCase()}?
            </h2>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href="/request-proposal">Gửi yêu cầu tư vấn</Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

