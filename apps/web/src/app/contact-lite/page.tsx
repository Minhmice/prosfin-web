"use client";

import * as React from "react";
import { MiniLeadForm } from "@/components/landing/hero/components/mini-lead-form/mini-lead-form";
import { PageContainer } from "@/components/shared/page-container";

export default function ContactLitePage() {
  return (
    <section className="py-12 md:py-20">
      <PageContainer>
        <MiniLeadForm mode="page" />
      </PageContainer>
    </section>
  );
}


