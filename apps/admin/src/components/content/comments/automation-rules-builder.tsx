"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

interface AutomationRule {
  id: string
  keyword: string
  action: "hide" | "tag" | "assign"
  value?: string
}

export function AutomationRulesBuilder() {
  const [rules, setRules] = React.useState<AutomationRule[]>([])

  const handleAddRule = () => {
    setRules([
      ...rules,
      {
        id: `rule-${Date.now()}`,
        keyword: "",
        action: "hide",
      },
    ])
  }

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
  }

  const handleUpdateRule = (id: string, updates: Partial<AutomationRule>) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, ...updates } : r)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Rules</CardTitle>
        <CardDescription>
          Automatically moderate comments based on keywords (UI-only, mock)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No automation rules. Click "Add Rule" to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Keyword</Label>
                    <Input
                      value={rule.keyword}
                      onChange={(e) =>
                        handleUpdateRule(rule.id, { keyword: e.target.value })
                      }
                      placeholder="spam, offensive..."
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Action</Label>
                    <Select
                      value={rule.action}
                      onValueChange={(value: AutomationRule["action"]) =>
                        handleUpdateRule(rule.id, { action: value })
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hide">Auto Hide</SelectItem>
                        <SelectItem value="tag">Auto Tag</SelectItem>
                        <SelectItem value="assign">Auto Assign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {rule.action !== "hide" && (
                    <div>
                      <Label className="text-xs">Value</Label>
                      <Input
                        value={rule.value || ""}
                        onChange={(e) =>
                          handleUpdateRule(rule.id, { value: e.target.value })
                        }
                        placeholder={rule.action === "tag" ? "tag name" : "assignee"}
                        className="h-8"
                      />
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRule(rule.id)}
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button variant="outline" onClick={handleAddRule} className="w-full">
          <IconPlus className="mr-2 size-4" />
          Add Rule
        </Button>
      </CardContent>
    </Card>
  )
}
