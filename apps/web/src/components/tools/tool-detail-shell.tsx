/**
 * ToolDetailShell - Main shell component for tool detail page
 * 
 * Composes input panel, results panel, and other sections.
 */

"use client";

import * as React from "react";
import type { ToolDefinition, ToolInput, ToolResult } from "@/types/tools";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ToolInputPanel } from "./tool-input-panel";
import { ToolResultsPanel } from "./tool-results-panel";
import { ToolScenarios } from "./tool-scenarios";
import { ToolRecommendedServices } from "./tool-recommended-services";
import { ToolRecommendedResearch } from "./tool-recommended-research";
import { ToolLeadMagnetCta } from "./tool-lead-magnet-cta";
import { CalendlyEmbed } from "@/components/shared/scheduling/calendly-embed";
import { computeTool } from "@/lib/tools";
import { trackToolEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";

interface ToolDetailShellProps {
  tool: ToolDefinition;
  initialInput?: ToolInput;
}

/**
 * ToolDetailShell - Main shell for tool detail
 */
export function ToolDetailShell({
  tool,
  initialInput,
}: ToolDetailShellProps) {
  const [input, setInput] = React.useState<ToolInput>(initialInput || {});
  const [result, setResult] = React.useState<ToolResult | null>(null);
  const [scenarioInput, setScenarioInput] = React.useState<ToolInput | null>(null);

  // Compute result when input changes
  React.useEffect(() => {
    const computed = computeTool(tool.slug, input);
    if (computed) {
      setResult(computed);
    }
  }, [tool.slug, input]);

  // Track tool view
  React.useEffect(() => {
    trackToolEvent(AnalyticsEvent.TOOL_VIEW, {
      toolSlug: tool.slug,
    });
  }, [tool.slug]);

  const handleInputChange = (newInput: ToolInput) => {
    setInput(newInput);
    trackToolEvent(AnalyticsEvent.TOOL_INPUT_CHANGED, {
      toolSlug: tool.slug,
    });
  };

  const handleScenarioChange = (scenarioInput: ToolInput) => {
    setScenarioInput(scenarioInput);
    trackToolEvent(AnalyticsEvent.TOOL_SCENARIO_APPLIED, {
      toolSlug: tool.slug,
    });
  };

  const currentResult = scenarioInput
    ? computeTool(tool.slug, scenarioInput)
    : result;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div className="container mx-auto max-w-6xl">
          <ProsfinSectionHeading
            title={tool.title}
            subtitle={tool.description}
            align="center"
            titleSize="xl"
          />
        </div>
      </ProsfinSectionWrapper>

      {/* Input & Results Panels */}
      <ProsfinSectionWrapper>
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <div>
              <ToolInputPanel
                tool={tool}
                initialInput={initialInput}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Results Panel */}
            <div>
              {currentResult && (
                <ToolResultsPanel result={currentResult} tool={tool} />
              )}
            </div>
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Scenarios */}
      {result && (
        <ProsfinSectionWrapper background="muted">
          <div className="container mx-auto max-w-6xl">
            <ToolScenarios
              tool={tool}
              baseInput={input}
              baseResult={result}
              onScenarioChange={handleScenarioChange}
            />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Recommended Services */}
      {currentResult && currentResult.recommendedServiceSlugs.length > 0 && (
        <ProsfinSectionWrapper>
          <div className="container mx-auto max-w-6xl">
            <ToolRecommendedServices result={currentResult} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Recommended Research */}
      {currentResult && currentResult.recommendedPostIds.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <div className="container mx-auto max-w-6xl">
            <ToolRecommendedResearch result={currentResult} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Lead Magnet CTA */}
      {currentResult && (
        <ProsfinSectionWrapper>
          <div className="container mx-auto max-w-6xl">
            <ToolLeadMagnetCta tool={tool} result={currentResult} input={input} />
          </div>
        </ProsfinSectionWrapper>
      )}

      {/* Book a Call */}
      <ProsfinSectionWrapper background="muted">
        <div className="container mx-auto max-w-6xl text-center">
          <ProsfinSectionHeading
            title="Muốn tư vấn chuyên sâu?"
            subtitle="Đặt lịch 15 phút để trao đổi về kết quả và giải pháp phù hợp"
            align="center"
            titleSize="lg"
          />
          <div className="mt-8">
            <CalendlyEmbed
              url="https://calendly.com/prosfin/15min"
              mode="popup-text"
              text="Đặt lịch tư vấn miễn phí"
            />
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

