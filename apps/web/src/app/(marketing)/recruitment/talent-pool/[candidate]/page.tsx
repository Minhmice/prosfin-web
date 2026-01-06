import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCandidateDetailBreadcrumb,
} from "@/lib/recruitment/getRecruitmentRoutes";
import {
  getTalentPoolCandidateByCode,
} from "@/lib/recruitment/getTalentPool";
import { recruitmentCatalog } from "@/content/recruitment.catalog";
import { SiteBreadcrumbs } from "@/components/site/breadcrumbs";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinContainer } from "@/components/layout/container";
import { ProsfinPrimaryButton } from "@/components/shared";
import { PrivacyBanner } from "@/components/recruitment/privacy-banner";
import { cn } from "@/lib/utils";

interface CandidateDetailPageProps {
  params: Promise<{ candidate: string }>;
}

const LEVEL_LABELS: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  available: "Có sẵn",
  interviewing: "Đang phỏng vấn",
  "not-available": "Không có sẵn",
};

const AVAILABILITY_COLORS: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  "not-available": "bg-gray-100 text-gray-800",
};

/**
 * Generate static params for candidate detail pages
 */
export async function generateStaticParams() {
  // In production, fetch all candidate codes from API
  // For now, return empty array (dynamic routes)
  return [];
}

/**
 * Generate metadata for candidate detail page
 */
export async function generateMetadata({
  params,
}: CandidateDetailPageProps): Promise<Metadata> {
  const { candidate } = await params;
  const candidateData = getTalentPoolCandidateByCode(candidate);

  if (!candidateData) {
    return {
      title: "Candidate Not Found | ProsFIN",
    };
  }

  const title = `${candidateData.roleTitle} - ${candidate} | Talent Pool | ProsFIN`;
  const description =
    candidateData.summary ||
    `${candidateData.roleTitle} với kinh nghiệm ${candidateData.experienceYearsRange || ""} năm.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn"}/recruitment/talent-pool/${candidate}`,
      type: "profile",
    },
  };
}

export default async function CandidateDetailPage({
  params,
}: CandidateDetailPageProps) {
  const { candidate } = await params;
  const candidateData = getTalentPoolCandidateByCode(candidate);

  if (!candidateData) {
    notFound();
  }

  const breadcrumbs = getCandidateDetailBreadcrumb(candidate);
  const ctaHref = `${recruitmentCatalog.ctaDefaults.talentPool}&candidate=${candidate}`;

  return (
    <>
      {/* Breadcrumb */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <SiteBreadcrumbs items={breadcrumbs} />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Privacy Banner */}
      <ProsfinSectionWrapper background="muted" padding="sm">
        <ProsfinContainer>
          <PrivacyBanner />
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Candidate Header */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{candidateData.roleTitle}</h1>
                  <p className="text-sm font-mono text-muted-foreground">
                    {candidateData.candidateCode}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                    AVAILABILITY_COLORS[candidateData.availability]
                  )}
                >
                  {AVAILABILITY_LABELS[candidateData.availability]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {LEVEL_LABELS[candidateData.level]}
                </span>
                {candidateData.badges &&
                  candidateData.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {badge}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Summary */}
      {candidateData.summary && (
        <ProsfinSectionWrapper background="muted" padding="lg">
          <ProsfinContainer>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold">Tóm tắt</h2>
              <p className="text-muted-foreground">{candidateData.summary}</p>
            </div>
          </ProsfinContainer>
        </ProsfinSectionWrapper>
      )}

      {/* Skills & Experience */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-semibold">Kỹ năng & Kinh nghiệm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidateData.skillTags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Kỹ năng</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.skillTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidateData.industryTags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Ngành nghề</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.industryTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {candidateData.experienceYearsRange && (
              <div className="space-y-2">
                <h3 className="font-semibold">Kinh nghiệm</h3>
                <p className="text-muted-foreground">
                  {candidateData.experienceYearsRange} năm
                </p>
              </div>
            )}
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* Languages & Location */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ProsfinContainer>
          <div className="max-w-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidateData.languages && candidateData.languages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Ngôn ngữ</h3>
                  <p className="text-muted-foreground">
                    {candidateData.languages.join(", ")}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-semibold">Địa điểm</h3>
                <p className="text-muted-foreground">{candidateData.location}</p>
              </div>
            </div>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>

      {/* CTA */}
      <ProsfinSectionWrapper background="default" padding="lg">
        <ProsfinContainer>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold">
              Quan tâm đến ứng viên này?
            </h2>
            <p className="text-muted-foreground">
              Liên hệ ProsFIN để nhận hồ sơ chi tiết và đặt lịch trao đổi.
            </p>
            <ProsfinPrimaryButton asChild size="lg">
              <Link href={ctaHref}>Yêu cầu hồ sơ chi tiết</Link>
            </ProsfinPrimaryButton>
          </div>
        </ProsfinContainer>
      </ProsfinSectionWrapper>
    </>
  );
}

