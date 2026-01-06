/**
 * Assessment Pack Generator
 * 
 * GET /api/packs/oneledger?leadId=...
 * 
 * Generates Assessment Pack (JSON) từ config + scan result.
 * Pack gồm: Executive brief, Recommended modules, Acceptance gates roadmap, Data request list.
 */

import { NextRequest, NextResponse } from "next/server";
import { oneledgerConfig } from "@/content/services/oneledger/config";
import type { LeadNormalized } from "@/server/leads/lead.schema";

/**
 * Get lead by ID (template - implement with actual DB query)
 */
async function getLeadById(leadId: string): Promise<LeadNormalized | null> {
  // TODO: Implement with actual database query
  // Example:
  // return await prisma.lead.findUnique({ where: { id: leadId } });
  return null;
}

/**
 * Generate Assessment Pack
 */
function generateAssessmentPack(lead: LeadNormalized) {
  const scan = (lead.extras as any)?.oneledgerScan || (lead.meta as any)?.extras?.oneledgerScan;
  const riskLevel = scan?.riskLevel as string | undefined;
  const topRisks = scan?.topRisks as string[] || [];
  const recommendedModuleIds = scan?.recommendedModuleIds as string[] || [];
  const recommendedGateId = scan?.recommendedGateId as string | undefined;
  const bundleId = (lead.intent as any)?.bundleId as string | undefined;

  // Get recommended modules from config
  const recommendedModules = recommendedModuleIds
    .map((id) => oneledgerConfig.modules?.find((m) => m.id === id))
    .filter(Boolean)
    .slice(0, 4);

  // Get recommended gate
  const recommendedGate = recommendedGateId
    ? oneledgerConfig.gates?.find((g) => g.id === recommendedGateId)
    : undefined;

  // Get bundle if selected
  const bundle = bundleId
    ? oneledgerConfig.bundles?.find((b) => b.id === bundleId)
    : undefined;

  // Executive brief
  const executiveBrief = {
    problem: topRisks.length > 0
      ? `Các rủi ro chính: ${topRisks.slice(0, 3).join(", ")}`
      : "Cần đánh giá hệ thống kế toán hiện tại",
    priority: lead.priority || "P2",
    riskLevel: riskLevel || "medium",
    nextStep: recommendedGate
      ? `Bắt đầu với ${recommendedGate.title}`
      : "Khảo sát ban đầu",
  };

  // Recommended modules
  const modulesSection = recommendedModules.map((module) => ({
    id: module?.id,
    name: module?.name,
    promise: module?.promise,
    deliverables: module?.deliverables || [],
  }));

  // Acceptance gates roadmap
  const gatesRoadmap = oneledgerConfig.gates
    ?.filter((g) => {
      // Show gates up to recommended gate, or first 5 gates
      if (recommendedGateId) {
        const gateIndex = oneledgerConfig.gates?.findIndex((g) => g.id === recommendedGateId) || 0;
        return oneledgerConfig.gates?.indexOf(g) <= gateIndex + 1;
      }
      return oneledgerConfig.gates?.indexOf(g) < 5;
    })
    .map((gate) => ({
      id: gate.id,
      title: gate.title,
      description: gate.description,
      deliverables: gate.deliverables || [],
      successDefinition: gate.successDefinition || "Hoàn thành các deliverables",
    }));

  // Data request list (from gates/modules)
  const dataRequestList: Array<{ gateId?: string; moduleId?: string; items: string[] }> = [];
  
  if (recommendedGate) {
    dataRequestList.push({
      gateId: recommendedGate.id,
      items: [
        "Bảng cân đối kế toán (nếu có)",
        "Báo cáo kết quả kinh doanh",
        "Sơ đồ tổ chức phòng kế toán",
        "Danh sách hệ thống kế toán đang dùng",
      ],
    });
  }

  recommendedModules.forEach((module) => {
    if (module) {
      dataRequestList.push({
        moduleId: module.id,
        items: [
          "Tài liệu liên quan đến module",
          "Chứng từ mẫu (nếu có)",
        ],
      });
    }
  });

  // Engagement rules
  const engagementRules = [
    "Không làm thay kế toán",
    "Không ghi sổ hộ",
    "Không chạy báo cáo 'đối phó'",
    "Tập trung vào chuẩn hoá quy trình và hệ thống",
  ];

  return {
    leadId: lead.id,
    contact: {
      fullName: lead.contact.fullName,
      email: lead.contact.email,
      company: lead.company?.name,
    },
    executiveBrief,
    recommendedModules: modulesSection,
    bundle: bundle ? {
      id: bundle.id,
      name: bundle.name,
      moduleIds: bundle.moduleIds,
      outcomes: bundle.outcomes,
      timeframe: bundle.timeframe,
    } : undefined,
    acceptanceGatesRoadmap: gatesRoadmap,
    dataRequestList,
    engagementRules,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * GET /api/packs/oneledger
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId parameter" },
        { status: 400 }
      );
    }

    // Get lead
    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Verify lead is for OneLedger
    if (!lead.intent?.serviceSlugs?.includes("oneledger")) {
      return NextResponse.json(
        { error: "Lead is not for OneLedger service" },
        { status: 400 }
      );
    }

    // Generate pack
    const pack = generateAssessmentPack(lead);

    return NextResponse.json(pack, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[Assessment Pack] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

