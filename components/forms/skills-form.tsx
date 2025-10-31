"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, AlertCircle } from "lucide-react"

interface SkillsFormProps {
  skills: string[]
  onChange: (skills: string[]) => void
  errors?: Record<string, string>
}

export function SkillsForm({ skills, onChange, errors = {} }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim()) {
      // 验证技能长度
      if (newSkill.trim().length > 50) {
        alert("技能名称不能超过50个字符")
        return
      }
      
      // 验证是否重复
      if (skills.includes(newSkill.trim())) {
        alert("该技能已存在")
        return
      }
      
      // 验证技能数量
      if (skills.length >= 20) {
        alert("最多只能添加20个技能")
        return
      }
      
      onChange([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const getFieldError = (fieldName: string) => {
    return errors[fieldName]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>技能</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="添加技能 (例如：React, TypeScript)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className={getFieldError("skills") ? "border-red-500" : ""}
            />
            <Button onClick={addSkill} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {getFieldError("skills") && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("skills")}
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              已添加 {skills.length}/20 个技能
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
