/**
 * Client Portal Tabs
 * 
 * Tabs component for client portal:
 * - Overview
 * - Gates Timeline
 * - Upload Center
 * - Q&A / Messages
 * - Deliverables Vault
 */

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Progress component not available, using custom div instead
import { Upload, MessageSquare, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { LeadNormalized } from "@/server/leads/lead.schema";
import type { Engagement } from "@/server/delivery/engagement.schema";
import type { GateInstance } from "@/server/delivery/gate-instance.schema";
import type { Artifact } from "@/server/delivery/artifact.schema";
import type { DataRequestItem } from "@/content/services/oneledger/data-request-list";

interface ClientPortalTabsProps {
  token: string;
  lead: LeadNormalized;
  engagement?: Engagement;
  gateInstances: GateInstance[];
  artifacts: Artifact[];
  dataRequestList: DataRequestItem[];
  recommendedGateId?: string;
}

export function ClientPortalTabs({
  token,
  lead,
  engagement,
  gateInstances,
  artifacts,
  dataRequestList,
  recommendedGateId,
}: ClientPortalTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Get current gate
  const currentGate = gateInstances.find((g) => g.status === "in_progress" || g.status === "submitted");
  const nextGate = gateInstances.find((g) => g.status === "not_started");

  // Get top 3 tasks (placeholder)
  const topTasks = [
    { id: "1", title: "Upload BCTC gần nhất", dueAt: "2024-01-15" },
    { id: "2", title: "Cung cấp sơ đồ tổ chức", dueAt: "2024-01-16" },
    { id: "3", title: "Danh sách hệ thống kế toán", dueAt: "2024-01-17" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="gates">Gates Timeline</TabsTrigger>
        <TabsTrigger value="upload">Upload Center</TabsTrigger>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
        <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Status</CardTitle>
            <CardDescription>
              {engagement?.status || "Chưa tạo engagement"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {engagement?.ownerId && (
              <p className="text-sm text-muted-foreground">
                Owner: {engagement.ownerId}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recommended Path */}
        <Card>
          <CardHeader>
            <CardTitle>Lộ trình đề xuất</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentGate && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Gate hiện tại: {currentGate.gateId}</span>
              </div>
            )}
            {nextGate && (
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span>Gate tiếp theo: {nextGate.gateId}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* What we need from you this week */}
        <Card>
          <CardHeader>
            <CardTitle>Những gì chúng tôi cần từ bạn tuần này</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <span>{task.title}</span>
                  <Badge variant="outline">{task.dueAt}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Gates Timeline Tab */}
      <TabsContent value="gates" className="space-y-4">
        {gateInstances.length > 0 ? (
          gateInstances.map((gate) => (
            <Card key={gate.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{gate.gateId}</CardTitle>
                  <Badge
                    variant={
                      gate.status === "approved"
                        ? "default"
                        : gate.status === "submitted"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {gate.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Acceptance Criteria */}
                <div>
                  <h4 className="font-semibold mb-2">Acceptance Criteria</h4>
                  <ul className="space-y-1">
                    {gate.acceptanceCriteria.map((criteria) => (
                      <li key={criteria.id} className="flex items-center gap-2">
                        {criteria.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={criteria.completed ? "line-through text-muted-foreground" : ""}>
                          {criteria.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {gate.status === "in_progress" && (
                    <Button
                      onClick={() => {
                        // TODO: Implement submit gate
                        console.log("Submit gate", gate.id);
                      }}
                    >
                      Submit Gate for Review
                    </Button>
                  )}
                  {gate.status === "approved" && (
                    <Button variant="outline" asChild>
                      <a href={`/api/artifacts/download?gateId=${gate.gateId}`}>
                        View Published Artifacts
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Chưa có gates. Engagement sẽ được tạo khi lead được qualified.
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Upload Center Tab */}
      <TabsContent value="upload" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upload Required Files</CardTitle>
            <CardDescription>
              Upload tài liệu theo yêu cầu cho gate hiện tại
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Data Request Checklist */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Checklist</h3>
              <ul className="space-y-2">
                {dataRequestList.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      className="mt-1"
                      disabled // Read-only for now
                    />
                    <label htmlFor={item.id} className="flex-1">
                      <span className={item.required ? "font-medium" : ""}>
                        {item.label}
                        {item.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Kéo thả tài liệu vào đây hoặc click để chọn file
              </p>
              <Button
                onClick={() => {
                  // TODO: Implement file upload
                  console.log("Upload file");
                }}
              >
                Chọn File
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Hỗ trợ: PDF, Excel, Word, CSV (tối đa 10MB/file)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Q&A Tab */}
      <TabsContent value="qa" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Q&A / Messages</CardTitle>
            <CardDescription>
              Gửi câu hỏi hoặc xem tin nhắn từ team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Chưa có tin nhắn nào. Bạn có thể gửi câu hỏi bằng cách click nút bên dưới.
                </p>
              </div>
              <Button
                onClick={() => {
                  // TODO: Implement new message
                  console.log("New message");
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Gửi tin nhắn
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Deliverables Vault Tab */}
      <TabsContent value="deliverables" className="space-y-4">
        {artifacts.length > 0 ? (
          artifacts
            .filter((a) => a.status === "published")
            .map((artifact) => (
              <Card key={artifact.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{artifact.title}</CardTitle>
                    <Badge variant="outline">{artifact.version}</Badge>
                  </div>
                  <CardDescription>{artifact.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <a href={`/api/artifacts/download?artifactId=${artifact.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                    {artifact.publishedAt && (
                      <p className="text-xs text-muted-foreground self-center">
                        Published: {new Date(artifact.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Chưa có deliverables được publish.
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}

