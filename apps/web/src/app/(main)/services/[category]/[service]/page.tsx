import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCategoryBySlug,
  getServiceBySlugs,
  getAllServicePaths,
} from "@/lib/services/getServiceCatalog";
import { buildServiceMetadata } from "@/lib/services/serviceMeta";
import { buildServiceBreadcrumb } from "@/lib/services/servicesBreadcrumb";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";

interface ServiceDetailPageProps {
  params: Promise<{ category: string; service: string }>;
}

/**
 * Generate static params for all service paths
 */
export async function generateStaticParams() {
  const paths = getAllServicePaths();
  return paths.map(path => ({ category: path.category, service: path.service }));
}

/**
 * Generate metadata for service detail page
 */
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const service = getServiceBySlugs(categorySlug, serviceSlug);

  if (!category || !service) {
    return {
      title: "Service Not Found | ProsFIN",
    };
  }

  return buildServiceMetadata(service, category);
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const service = getServiceBySlugs(categorySlug, serviceSlug);

  if (!category || !service) {
    notFound();
  }

  const breadcrumbs = buildServiceBreadcrumb(service, category);
  const isPlaceholder = service.status !== "existing";

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <SiteBreadcrumbs items={breadcrumbs} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Hero Section */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="space-y-6 max-w-3xl">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {service.title}
              </h1>
              {service.tagline && (
                <p className="text-lg text-muted-foreground">{service.tagline}</p>
              )}
            </div>

            {/* Dành cho ai - Placeholder */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Doanh nghiệp SME
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Startup
              </span>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Hộ kinh doanh
              </span>
            </div>

            {/* CTA */}
            <ProsfinPrimaryButton href={service.links.ctaHref} size="lg">
              Gửi yêu cầu tư vấn
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {isPlaceholder ? (
        /* Placeholder Content */
        <ProsfinSectionWrapper background="muted" padding="lg">
          <ProsfinContainer>
            <div className="max-w-2xl space-y-6 text-center">
              <p className="text-lg text-muted-foreground">
                Nội dung đang được hoàn thiện.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi đang chuẩn bị thông tin chi tiết về dịch vụ này. Vui
                lòng liên hệ với chúng tôi để được tư vấn trực tiếp.
              </p>
              <ProsfinPrimaryButton href={service.links.ctaHref} size="lg">
                Gửi yêu cầu tư vấn
              </ProsfinPrimaryButton>
            </div>
          </ProsfinContainer>
        </ProsfinSectionWrapper>
      ) : (
        /* Full Content Sections */
        <>
          {/* Vấn đề thường gặp */}
          <ProsfinSectionWrapper background="muted" padding="lg">
            <ProsfinContainer>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-semibold">Vấn đề thường gặp</h2>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li>Vấn đề 1 (placeholder - cần bổ sung nội dung)</li>
                  <li>Vấn đề 2 (placeholder - cần bổ sung nội dung)</li>
                  <li>Vấn đề 3 (placeholder - cần bổ sung nội dung)</li>
                </ul>
              </div>
            </ProsfinContainer>
          </ProsfinSectionWrapper>

          {/* Phạm vi & Đầu ra */}
          <ProsfinSectionWrapper background="default" padding="lg">
            <ProsfinContainer>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-semibold">Phạm vi & Đầu ra</h2>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li>Deliverable 1 (placeholder - cần bổ sung nội dung)</li>
                  <li>Deliverable 2 (placeholder - cần bổ sung nội dung)</li>
                  <li>Deliverable 3 (placeholder - cần bổ sung nội dung)</li>
                </ul>
              </div>
            </ProsfinContainer>
          </ProsfinSectionWrapper>

          {/* Cách ProsFIN triển khai */}
          <ProsfinSectionWrapper background="muted" padding="lg">
            <ProsfinContainer>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-semibold">
                  Cách ProsFIN triển khai
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">1. Discovery</h3>
                    <p className="text-muted-foreground">
                      (Placeholder - cần bổ sung nội dung)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">2. Diagnostic</h3>
                    <p className="text-muted-foreground">
                      (Placeholder - cần bổ sung nội dung)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">3. Plan</h3>
                    <p className="text-muted-foreground">
                      (Placeholder - cần bổ sung nội dung)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">4. Execution support</h3>
                    <p className="text-muted-foreground">
                      (Placeholder - cần bổ sung nội dung)
                    </p>
                  </div>
                </div>
              </div>
            </ProsfinContainer>
          </ProsfinSectionWrapper>

          {/* Thời gian & cách làm việc */}
          <ProsfinSectionWrapper background="default" padding="lg">
            <ProsfinContainer>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-semibold">
                  Thời gian & cách làm việc
                </h2>
                <p className="text-muted-foreground">
                  (Placeholder - cần bổ sung timeline ranges)
                </p>
              </div>
            </ProsfinContainer>
          </ProsfinSectionWrapper>

          {/* FAQ */}
          <ProsfinSectionWrapper background="muted" padding="lg">
            <ProsfinContainer>
              <div className="max-w-3xl space-y-6">
                <h2 className="text-2xl font-semibold">Câu hỏi thường gặp</h2>
                <p className="text-muted-foreground">
                  (Placeholder - cần bổ sung FAQ per-service)
                </p>
              </div>
            </ProsfinContainer>
          </ProsfinSectionWrapper>
        </>
      )}

      {/* CTA cuối trang */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">
              Sẵn sàng bắt đầu với {service.title}?
            </h2>
            <ProsfinPrimaryButton href={service.links.ctaHref} size="lg">
              Gửi yêu cầu tư vấn
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

