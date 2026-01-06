import * as React from "react";
import { H2, Text } from "@/components/shared";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";
import { ProcessTimelineScroll } from "@/components/shared/animation/process-timeline-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/accordion/accordion";

type StepDetail = {
  id: string;
  order: number;
  title: string;
  whatToPrepare: string[];
  whatProsfinDoes: string[];
  whatYouGet: string[];
};

export function StepDetailsSection({ stepDetails }: { stepDetails: StepDetail[] }) {
  const detailBlocks = stepDetails.map((step) => ({
    id: step.id,
    title: step.title,
    whatToPrepare: step.whatToPrepare,
    whatProsfinDoes: step.whatProsfinDoes,
    whatYouGet: step.whatYouGet,
  }));

  return (
    <RevealOnScroll direction="up" delay={0}>
      <div>
        <H2 className="mb-8">Chi tiết từng bước trong quy trình</H2>
        <ProcessTimelineScroll
          steps={stepDetails.map((step) => ({
            id: step.id,
            order: step.order,
            title: step.title,
            description: `${step.whatToPrepare.length} mục cần chuẩn bị. ProsFIN sẽ ${step.whatProsfinDoes
              .join(", ")
              .toLowerCase()}. Bạn nhận được ${step.whatYouGet.length} deliverable.`,
          }))}
        />

        <div className="mt-8">
          <Accordion type="single" collapsible>
            {detailBlocks.map((step) => (
              <AccordionItem key={step.id} value={step.id} className="mb-2">
                <AccordionTrigger>{step.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Text as="p" variant="small">
                        Bạn cần chuẩn bị:
                      </Text>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        {step.whatToPrepare.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Text as="p" variant="small">
                        ProsFIN làm gì:
                      </Text>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        {step.whatProsfinDoes.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Text as="p" variant="small">
                        Bạn nhận được:
                      </Text>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        {step.whatYouGet.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </RevealOnScroll>
  );
}


