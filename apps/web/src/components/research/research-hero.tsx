import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";

/**
 * ResearchHero - Hero section for /research page
 * 
 * Finance-focused hero with CTA to browse collections or start reading
 */
export function ResearchHero() {
  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title="ProsFIN Research"
        subtitle="Nghiên cứu và insights về tài chính doanh nghiệp. Từ briefs nhanh đến playbooks chi tiết, ProsFIN Research giúp bạn nắm vững kiến thức tài chính cần thiết."
        align="center"
        titleSize="xl"
      />
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ProsfinPrimaryButton href="#collections" size="lg">
          Xem Collections
        </ProsfinPrimaryButton>
        <ProsfinPrimaryButton href="#results" variant="secondary" size="lg">
          Bắt đầu đọc
        </ProsfinPrimaryButton>
      </div>
    </div>
  );
}

