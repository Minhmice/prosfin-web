/**
 * Document Templates Registry
 * 
 * Template registry for document automation (JSON → PDF/Doc).
 */

export interface DocumentTemplate {
  id: string;
  kind: "assessment_pack" | "scope" | "data_request_list" | "reporting_pack" | "handover_kit";
  version: string;
  sections: DocumentSection[];
  placeholders: Record<string, string>;
}

export interface DocumentSection {
  id: string;
  type: "header" | "paragraph" | "list" | "table" | "callout";
  content: string | string[] | Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

/**
 * Assessment Pack Template
 */
export const assessmentPackTemplate: DocumentTemplate = {
  id: "assessment_pack_v1",
  kind: "assessment_pack",
  version: "1.0",
  sections: [
    {
      id: "header",
      type: "header",
      content: "Assessment Pack - OneLedger™",
    },
    {
      id: "executive_brief",
      type: "callout",
      content: {
        title: "Executive Brief",
        problem: "{{problem}}",
        priority: "{{priority}}",
        riskLevel: "{{riskLevel}}",
        nextStep: "{{nextStep}}",
      },
    },
    {
      id: "recommended_modules",
      type: "list",
      content: "{{recommendedModules}}",
    },
    {
      id: "acceptance_gates",
      type: "list",
      content: "{{acceptanceGatesRoadmap}}",
    },
    {
      id: "engagement_rules",
      type: "list",
      content: "{{engagementRules}}",
    },
  ],
  placeholders: {
    problem: "",
    priority: "",
    riskLevel: "",
    nextStep: "",
    recommendedModules: "",
    acceptanceGatesRoadmap: "",
    engagementRules: "",
  },
};

/**
 * Scope Template
 */
export const scopeTemplate: DocumentTemplate = {
  id: "scope_v1",
  kind: "scope",
  version: "1.0",
  sections: [
    {
      id: "header",
      type: "header",
      content: "Scope & Acceptance Gates - OneLedger™",
    },
    {
      id: "overview",
      type: "paragraph",
      content: "{{overview}}",
    },
    {
      id: "gates",
      type: "list",
      content: "{{gates}}",
    },
    {
      id: "deliverables",
      type: "list",
      content: "{{deliverables}}",
    },
  ],
  placeholders: {
    overview: "",
    gates: "",
    deliverables: "",
  },
};

/**
 * Get template by kind and version
 */
export function getTemplate(kind: string, version: string = "1.0"): DocumentTemplate | null {
  switch (kind) {
    case "assessment_pack":
      return assessmentPackTemplate;
    case "scope":
      return scopeTemplate;
    default:
      return null;
  }
}

/**
 * Render template with data
 */
export function renderTemplate(
  template: DocumentTemplate,
  data: Record<string, unknown>
): DocumentSection[] {
  return template.sections.map((section) => {
    if (typeof section.content === "string") {
      // Replace placeholders
      let rendered = section.content;
      Object.entries(data).forEach(([key, value]) => {
        rendered = rendered.replace(`{{${key}}}`, String(value));
      });
      return { ...section, content: rendered };
    } else if (Array.isArray(section.content)) {
      // Replace placeholders in array
      return {
        ...section,
        content: section.content.map((item) => {
          if (typeof item === "string") {
            let rendered = item;
            Object.entries(data).forEach(([key, value]) => {
              rendered = rendered.replace(`{{${key}}}`, String(value));
            });
            return rendered;
          }
          return item;
        }),
      };
    } else {
      // Replace placeholders in object
      const rendered: Record<string, unknown> = {};
      Object.entries(section.content).forEach(([key, value]) => {
        if (typeof value === "string") {
          let renderedValue = value;
          Object.entries(data).forEach(([dataKey, dataValue]) => {
            renderedValue = renderedValue.replace(`{{${dataKey}}}`, String(dataValue));
          });
          rendered[key] = renderedValue;
        } else {
          rendered[key] = value;
        }
      });
      return { ...section, content: rendered };
    }
  });
}

