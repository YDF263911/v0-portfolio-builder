"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PortfolioData } from "@/types/portfolio"

interface ThemeSettingsFormProps {
  theme: PortfolioData["theme"]
  onChange: (theme: Partial<PortfolioData["theme"]>) => void
}

export function ThemeSettingsForm({ theme, onChange }: ThemeSettingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>主题设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>配色方案</Label>
          <Select value={theme.colorScheme} onValueChange={(value) => onChange({ colorScheme: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">蓝色</SelectItem>
              <SelectItem value="purple">紫色</SelectItem>
              <SelectItem value="dark">暗色</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
