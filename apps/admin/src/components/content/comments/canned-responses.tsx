"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface CannedResponsesProps {
  onSelect?: (response: string) => void
}

const responses = [
  { value: "thank-you", label: "Thank you for your feedback!" },
  { value: "investigating", label: "We're looking into this. Thank you for bringing it to our attention." },
  { value: "contact-support", label: "Please contact our support team for assistance." },
  { value: "appreciate", label: "We appreciate your comment and will take it into consideration." },
]

export function CannedResponses({ onSelect }: CannedResponsesProps) {
  const [selected, setSelected] = React.useState<string>("")

  const handleSelect = (value: string) => {
    setSelected(value)
    const response = responses.find((r) => r.value === value)
    if (response && onSelect) {
      onSelect(response.label)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="canned-responses">Canned Responses</Label>
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger id="canned-responses">
          <SelectValue placeholder="Select a template..." />
        </SelectTrigger>
        <SelectContent>
          {responses.map((response) => (
            <SelectItem key={response.value} value={response.value}>
              {response.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
