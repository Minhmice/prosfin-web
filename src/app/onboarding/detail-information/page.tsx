"use client";

import * as React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/shared/page-container";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { DetailInformationForm } from "@/components/onboarding/detail-information-form";
import { H2, ProsfinSecondaryButton, Text } from "@/components/shared";

export default function DetailInformationPage() {
  return (
    <section className="py-12 md:py-20">
      <PageContainer>
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <StepIndicator current={3} />

          <div className="space-y-2">
            <H2>Thông tin chi tiết</H2>
            <Text as="p" variant="muted">
              Không bắt buộc, nhưng sẽ giúp ProsFIN chuẩn bị buổi tư vấn sát nhu cầu hơn.
            </Text>
          </div>

          <DetailInformationForm />

          <div className="pt-2">
            <Link href="/onboarding/thanks">
              <ProsfinSecondaryButton className="w-full">Quay lại</ProsfinSecondaryButton>
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}


