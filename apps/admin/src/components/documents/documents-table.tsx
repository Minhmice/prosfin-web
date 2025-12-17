"use client";

import * as React from "react";
import { Card } from "@prosfin/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@prosfin/ui";
import { Button } from "@prosfin/ui";
import { Badge } from "@prosfin/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@prosfin/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@prosfin/ui";
import { Columns, Plus, GripVertical, Loader2, CheckCircle2, MoreVertical } from "lucide-react";
import { cn } from "@prosfin/ui";

interface DocumentRow {
  id: string;
  header: string;
  sectionType: string;
  status: "done" | "in_process";
  target: number;
  limit: number;
  reviewer: string;
}

const mockData: DocumentRow[] = [
  {
    id: "1",
    header: "Cover page",
    sectionType: "Cover page",
    status: "in_process",
    target: 18,
    limit: 5,
    reviewer: "Eddie Lake",
  },
  {
    id: "2",
    header: "Table of contents",
    sectionType: "Table of contents",
    status: "done",
    target: 29,
    limit: 24,
    reviewer: "Eddie Lake",
  },
  {
    id: "3",
    header: "Executive summary",
    sectionType: "Narrative",
    status: "done",
    target: 10,
    limit: 13,
    reviewer: "Eddie Lake",
  },
];

export function DocumentsTable() {
  const [activeTab, setActiveTab] = React.useState("outline");

  return (
    <Card>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-4 lg:px-6 pt-6">
            <div className="flex items-center gap-2">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-fit md:hidden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="past-performance">Past Performance</SelectItem>
                  <SelectItem value="key-personnel">Key Personnel</SelectItem>
                  <SelectItem value="focus-documents">Focus Documents</SelectItem>
                </SelectContent>
              </Select>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="outline">Outline</TabsTrigger>
                <TabsTrigger value="past-performance">
                  Past Performance
                  <Badge variant="secondary" className="ml-1.5">
                    3
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="key-personnel">
                  Key Personnel
                  <Badge variant="secondary" className="ml-1.5">
                    2
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Columns className="mr-2 size-4" />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 size-4" />
                <span className="hidden lg:inline">Add Section</span>
              </Button>
            </div>
          </div>
          <TabsContent value="outline" className="mt-0">
            <div className="overflow-hidden rounded-lg border">
              <div className="relative w-full overflow-x-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-muted">
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead className="w-12">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="size-4 rounded border"
                            aria-label="Select all"
                          />
                        </div>
                      </TableHead>
                      <TableHead>Header</TableHead>
                      <TableHead>Section Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">Limit</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="size-7">
                            <GripVertical className="size-3 text-muted-foreground" />
                            <span className="sr-only">Drag to reorder</span>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="size-4 rounded border"
                              aria-label="Select row"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="link" className="h-9 px-0 text-left">
                            {row.header}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="w-32">
                            {row.sectionType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "flex items-center gap-1",
                              row.status === "done" && "text-green-600"
                            )}
                          >
                            {row.status === "done" ? (
                              <CheckCircle2 className="size-3 fill-green-500 text-green-500" />
                            ) : (
                              <Loader2 className="size-3 animate-spin" />
                            )}
                            {row.status === "done" ? "Done" : "In Process"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <input
                            type="number"
                            value={row.target}
                            className="h-8 w-16 rounded-md border border-transparent bg-transparent text-right text-sm shadow-none focus:border focus-visible:border"
                            readOnly
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <input
                            type="number"
                            value={row.limit}
                            className="h-8 w-16 rounded-md border border-transparent bg-transparent text-right text-sm shadow-none focus:border focus-visible:border"
                            readOnly
                          />
                        </TableCell>
                        <TableCell>{row.reviewer}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="past-performance" className="mt-0">
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Past Performance content
            </div>
          </TabsContent>
          <TabsContent value="key-personnel" className="mt-0">
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Key Personnel content
            </div>
          </TabsContent>
          <TabsContent value="focus-documents" className="mt-0">
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Focus Documents content
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}

