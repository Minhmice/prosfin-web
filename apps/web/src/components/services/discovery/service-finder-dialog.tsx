"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { StepPersona } from "./service-finder-steps/step-persona";
import { StepOutcome } from "./service-finder-steps/step-outcome";
import { StepStage } from "./service-finder-steps/step-stage";
import { StepFormat } from "./service-finder-steps/step-format";
import type { WizardAnswers } from "@/lib/services-discovery/params";
import { wizardAnswersToFilters, buildSearchParams } from "@/lib/services-discovery/params";

interface ServiceFinderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TOTAL_STEPS = 4;

/**
 * ServiceFinderDialog - Wizard dialog for service discovery
 * 
 * 4-step wizard: persona, outcome, stage, format
 * On finish: updates URL params with rec=1 and scrolls to results
 */
export function ServiceFinderDialog({
  open,
  onOpenChange,
}: ServiceFinderDialogProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = React.useState<WizardAnswers>({});

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Convert answers to filters and build URL
    const filters = wizardAnswersToFilters(answers);
    const params = buildSearchParams(filters);
    const queryString = params.toString();

    // Update URL
    router.replace(`/services${queryString ? `?${queryString}` : ""}`);

    // Close dialog
    onOpenChange(false);

    // Reset state
    setCurrentStep(1);
    setAnswers({});

    // Scroll to results after a short delay
    setTimeout(() => {
      const resultsElement = document.getElementById("services-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleAnswerChange = (key: keyof WizardAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!answers.persona;
      case 2:
        return !!answers.outcome;
      case 3:
        return !!answers.stage;
      case 4:
        return true; // Format is optional
      default:
        return false;
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset on close
      setCurrentStep(1);
      setAnswers({});
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chọn đúng dịch vụ ProsFIN trong 60 giây</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Bước {currentStep} / {TOTAL_STEPS}
            </span>
            <span>~60 giây</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>

          {/* Step content */}
          <div className="min-h-[300px]">
            {currentStep === 1 && (
              <StepPersona
                value={answers.persona}
                onChange={(value) => handleAnswerChange("persona", value)}
              />
            )}
            {currentStep === 2 && (
              <StepOutcome
                value={answers.outcome}
                onChange={(value) => handleAnswerChange("outcome", value)}
              />
            )}
            {currentStep === 3 && (
              <StepStage
                value={answers.stage}
                onChange={(value) => handleAnswerChange("stage", value)}
              />
            )}
            {currentStep === 4 && (
              <StepFormat
                value={answers.format}
                onChange={(value) => handleAnswerChange("format", value)}
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-4">
            <ProsfinSecondaryButton
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Quay lại
            </ProsfinSecondaryButton>
            <ProsfinPrimaryButton
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === TOTAL_STEPS ? "Xem gợi ý" : "Tiếp theo"}
            </ProsfinPrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

