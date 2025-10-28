"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Upload } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

interface ProjectsFormProps {
  projects: PortfolioData["projects"]
  onChange: (projects: PortfolioData["projects"]) => void
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
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
      const url = URL.createObjectURL(file)
      updateProject(id, { image: url })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Project {index + 1}</h3>
              <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                placeholder="My Awesome Project"
                value={project.title}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your project..."
                rows={3}
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                placeholder="https://github.com/username/project"
                value={project.link}
                onChange={(e) => updateProject(project.id, { link: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Project Image</Label>
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
                  Upload Image
                </label>
              </Button>
            </div>
          </div>
        ))}

        <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  )
}
