import type { Metadata } from "next";
import Link from "next/link";
import {
  getTalentPoolBreadcrumb,
  getRecruitmentHubMetadata,
} from "@/lib/recruitment/getRecruitmentRoutes";
import {
  getTalentPoolCandidates,
  filterTalentPool,
  getTalentPoolFilters,
  type TalentPoolFilters,
} from "@/lib/recruitment/getTalentPool";
import { recruitmentCatalog } from "@/content/recruitment.catalog";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { TalentPoolFilterBar } from "@/components/recruitment/talent-pool-filter-bar";
import { TalentPoolGrid } from "@/components/recruitment/talent-pool-grid";
import { PrivacyBanner } from "@/components/recruitment/privacy-banner";

interface TalentPoolPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for talent pool page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Talent Pool | Tuyển dụng | ProsFIN`,
    description:
      "Xem bể nhân sự Tài chính – Kế toán có sẵn. Liên hệ ProsFIN để nhận hồ sơ chi tiết.",
    openGraph: {
      title: `Talent Pool | Tuyển dụng | ProsFIN`,
      description:
        "Xem bể nhân sự Tài chính – Kế toán có sẵn. Liên hệ ProsFIN để nhận hồ sơ chi tiết.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn"}/recruitment/talent-pool`,
      type: "website",
    },
  };
}

export default async function TalentPoolPage({
  searchParams,
}: TalentPoolPageProps) {
  const resolvedSearchParams = await searchParams;
  const breadcrumbs = getTalentPoolBreadcrumb();

  // Parse query params
  const filters: TalentPoolFilters = {
    roleTitle: resolvedSearchParams.role as string | undefined,
    level: resolvedSearchParams.level as TalentPoolFilters["level"] | undefined,
    skillTags:
      typeof resolvedSearchParams.skill === "string"
        ? resolvedSearchParams.skill.split(",").filter(Boolean)
        : undefined,
    industryTags:
      typeof resolvedSearchParams.industry === "string"
        ? resolvedSearchParams.industry.split(",").filter(Boolean)
        : undefined,
    location: resolvedSearchParams.location as string | undefined,
    availability: resolvedSearchParams.availability as
      | TalentPoolFilters["availability"]
      | undefined,
  };

  // Get candidates and filter
  const allCandidates = getTalentPoolCandidates();
  const filteredCandidates = filterTalentPool(allCandidates, filters);
  const filterOptions = getTalentPoolFilters();

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
            <h1 className="text-4xl font-bold tracking-tight">
              Talent Pool - Bể nhân sự Tài chính
            </h1>
            <p className="text-lg text-muted-foreground">
              Xem danh sách nhân sự Tài chính – Kế toán có sẵn. Liên hệ ProsFIN
              để nhận hồ sơ chi tiết và đặt lịch trao đổi.
            </p>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Privacy Banner */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <PrivacyBanner />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Filter Bar */}
      <TalentPoolFilterBar filterOptions={filterOptions} />

      {/* Results Grid */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <TalentPoolGrid candidates={filteredCandidates} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">
              Không tìm thấy ứng viên phù hợp?
            </h2>
            <p className="text-muted-foreground">
              Gửi yêu cầu để ProsFIN đề xuất ứng viên phù hợp với nhu cầu của bạn.
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={recruitmentCatalog.ctaDefaults.brokerage}>
                Gửi yêu cầu tuyển dụng
              </Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

