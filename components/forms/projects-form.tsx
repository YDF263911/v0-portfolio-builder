"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Upload, AlertCircle } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

interface ProjectsFormProps {
  projects: PortfolioData["projects"]
  onChange: (projects: PortfolioData["projects"]) => void
  errors?: Record<string, string>
}

export function ProjectsForm({ projects, onChange, errors = {} }: ProjectsFormProps) {
  const addProject = () => {
    if (projects.length >= 10) {
      alert("最多只能添加10个项目")
      return
    }
    
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      link: "",
      image: "",
    }
    onChange([...projects, newProject])
  }

  const updateProject = (id: string, updates: Partial<PortfolioData["projects"][0]>) => {
    onChange(projects.map((project) => (project.id === id ? { ...project, ...updates } : project)))
  }

  const removeProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id))
  }

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateProject(id, { image: base64Data })
      }
      reader.onerror = () => {
        console.error('图片读取失败')
        alert('图片上传失败，请重试')
      }
      reader.readAsDataURL(file)
    }
  }

  const getFieldError = (projectId: string, fieldName: string) => {
    return errors[`projects.${projectId}.${fieldName}`] || errors[`projects.${fieldName}`]
  }

  const validateUrl = (url: string) => {
    if (url && !url.match(/^https?:\/\/.+/)) {
      return "请输入有效的URL（以http://或https://开头）"
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>项目</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">项目 {index + 1}</h3>
              <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>项目标题 *</Label>
              <Input
                placeholder="我的优秀项目"
                value={project.title}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                className={getFieldError(project.id, "title") ? "border-red-500" : ""}
              />
              {getFieldError(project.id, "title") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError(project.id, "title")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>项目描述 *</Label>
              <Textarea
                placeholder="描述您的项目..."
                rows={3}
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                className={getFieldError(project.id, "description") ? "border-red-500" : ""}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{getFieldError(project.id, "description") && (
                  <span className="text-red-500">{getFieldError(project.id, "description")}</span>
                )}</span>
                <span>{project.description.length}/500</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>项目链接</Label>
              <Input
                placeholder="https://github.com/用户名/项目"
                value={project.link}
                onChange={(e) => {
                  const url = e.target.value
                  const urlError = validateUrl(url)
                  updateProject(project.id, { link: url })
                }}
                className={getFieldError(project.id, "link") ? "border-red-500" : ""}
              />
              {getFieldError(project.id, "link") && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError(project.id, "link")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>项目图片</Label>
              {project.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt="Project preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Input
                id={`project-image-${project.id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(project.id, e)}
                className="hidden"
              />
              <Button variant="outline" asChild className="w-full bg-transparent">
                <label
                  htmlFor={`project-image-${project.id}`}
                  className="cursor-pointer flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  上传图片
                </label>
              </Button>
            </div>
          </div>
        ))}

        <div className="space-y-3">
          <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            添加项目
          </Button>
          <div className="text-xs text-muted-foreground text-center">
            已添加 {projects.length}/10 个项目
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
