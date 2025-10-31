"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, AlertCircle } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

interface PersonalInfoFormProps {
  data: PortfolioData["personalInfo"]
  onChange: (data: Partial<PortfolioData["personalInfo"]>) => void
  errors?: Record<string, string>
}

export function PersonalInfoForm({ data, onChange, errors = {} }: PersonalInfoFormProps) {
  const [previewUrl, setPreviewUrl] = useState(data.profilePhoto)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 验证文件大小（最大5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert("文件大小不能超过5MB")
        return
      }
      
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert("请上传图片文件")
        return
      }
      
      // 使用 FileReader 将图片转换为 Base64 数据，避免 Blob URL 失效问题
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64Data = event.target?.result as string
        setPreviewUrl(base64Data)
        onChange({ profilePhoto: base64Data })
      }
      reader.onerror = () => {
        console.error('图片读取失败')
        alert('图片上传失败，请重试')
      }
      reader.readAsDataURL(file)
    }
  }

  const getFieldError = (fieldName: string) => {
    return errors[`personalInfo.${fieldName}`]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">姓名 *</Label>
          <Input
            id="name"
            placeholder="张三"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={getFieldError("name") ? "border-red-500" : ""}
          />
          {getFieldError("name") && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("name")}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">职位 *</Label>
          <Input
            id="jobTitle"
            placeholder="全栈开发工程师"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
            className={getFieldError("jobTitle") ? "border-red-500" : ""}
          />
          {getFieldError("jobTitle") && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("jobTitle")}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">个人简介</Label>
          <Textarea
            id="bio"
            placeholder="介绍一下您自己..."
            rows={4}
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            className={getFieldError("bio") ? "border-red-500" : ""}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{getFieldError("bio") && (
              <span className="text-red-500">{getFieldError("bio")}</span>
            )}</span>
            <span>{data.bio.length}/500</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>头像照片</Label>
          <div className="flex items-center gap-4">
            {previewUrl && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                <Image src={previewUrl || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <Input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button variant="outline" asChild className="w-full bg-transparent">
                <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  上传照片
                </label>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
