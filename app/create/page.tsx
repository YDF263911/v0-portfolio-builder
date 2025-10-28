"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { ThemeSettingsForm } from "@/components/forms/theme-settings-form"
import { PortfolioPreview } from "@/components/portfolio-preview"
import type { PortfolioData } from "@/types/portfolio"

function CreatePageContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "minimal"

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personalInfo: {
      name: "",
      jobTitle: "",
      bio: "",
      profilePhoto: "",
    },
    skills: [],
    projects: [],
    theme: {
      template: templateId,
      colorScheme: "blue",
    },
  })

  const updatePersonalInfo = (info: Partial<PortfolioData["personalInfo"]>) => {
    setPortfolioData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  const updateSkills = (skills: string[]) => {
    setPortfolioData((prev) => ({ ...prev, skills }))
  }

  const updateProjects = (projects: PortfolioData["projects"]) => {
    setPortfolioData((prev) => ({ ...prev, projects }))
  }

  const updateTheme = (theme: Partial<PortfolioData["theme"]>) => {
    setPortfolioData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme },
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            PortfolioBuilder
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/">Back to Templates</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Split View Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Form Area */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-8 space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Build Your Portfolio</h1>
              <p className="text-muted-foreground">Fill in your details to create your portfolio</p>
            </div>

            <PersonalInfoForm data={portfolioData.personalInfo} onChange={updatePersonalInfo} />
            <SkillsForm skills={portfolioData.skills} onChange={updateSkills} />
            <ProjectsForm projects={portfolioData.projects} onChange={updateProjects} />
            <ThemeSettingsForm theme={portfolioData.theme} onChange={updateTheme} />

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background pt-6 pb-4 border-t flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/preview?data=${encodeURIComponent(JSON.stringify(portfolioData))}`}>Preview Live</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/preview?data=${encodeURIComponent(JSON.stringify(portfolioData))}`}>Next Step</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="hidden lg:block w-1/2 bg-muted border-l sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <span className="text-sm text-muted-foreground">Updates in real-time</span>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <PortfolioPreview data={portfolioData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  )
}
