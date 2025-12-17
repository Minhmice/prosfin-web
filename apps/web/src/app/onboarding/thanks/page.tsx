"use client";

import * as React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/shared/page-container";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { VerifyEmailPanel } from "@/components/onboarding/verify-email-panel";
import { H2, ProsfinPrimaryButton, ProsfinSecondaryButton, Text } from "@/components/shared";
import { useLeadDraft } from "@/hooks/use-lead-draft";

export default function OnboardingThanksPage() {
  const { draft, hydrated } = useLeadDraft();
  const name = (draft?.fullName ?? "").trim();

  return (
    <section className="py-12 md:py-20">
      <PageContainer>
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <StepIndicator current={2} />

          <div className="space-y-2">
            <H2>ProsFIN đã nhận thông tin ban đầu</H2>
            <Text as="p" variant="muted">
              {hydrated && name ? (
                <>
                  Cảm ơn{" "}
                  <span className="font-medium text-foreground">{name}</span>. Trong
                  giờ làm việc, ProsFIN sẽ phản hồi cho bạn qua email.
                </>
              ) : (
                <>Trong giờ làm việc, ProsFIN sẽ phản hồi cho bạn qua email.</>
              )}
            </Text>
          </div>

          <VerifyEmailPanel />

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <Text as="p" variant="large">
              Bổ sung thông tin chi tiết (không bắt buộc)
            </Text>
            <Text as="p" variant="muted" className="mt-1">
              Giúp ProsFIN hiểu nhanh bối cảnh doanh nghiệp để chuẩn bị buổi tư vấn tốt hơn.
            </Text>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/onboarding/detail-information" className="sm:flex-1">
                <ProsfinPrimaryButton className="w-full">Điền thông tin chi tiết</ProsfinPrimaryButton>
              </Link>
              <Link href="/" className="sm:flex-1">
                <ProsfinSecondaryButton className="w-full">Về trang chủ</ProsfinSecondaryButton>
              </Link>
            </div>
          </div>

          <Text as="div" variant="muted" className="text-xs">
            Cần liên hệ gấp? Bạn có thể vào{" "}
            <Link href="/contact" className="text-primary underline underline-offset-2">
              trang liên hệ
            </Link>{" "}
            để xem các kênh hỗ trợ khác.
          </Text>
        </div>
      </PageContainer>
    </section>
  );
}


