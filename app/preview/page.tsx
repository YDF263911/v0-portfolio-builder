"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Moon, Sun } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

function PreviewPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const dataParam = searchParams.get("data")
  const portfolioData: PortfolioData = dataParam
    ? JSON.parse(decodeURIComponent(dataParam))
    : {
        personalInfo: { name: "", jobTitle: "", bio: "", profilePhoto: "" },
        skills: [],
        projects: [],
        theme: { template: "minimal", colorScheme: "blue" },
      }

  const handleGenerate = () => {
    router.push(`/success?data=${encodeURIComponent(JSON.stringify(portfolioData))}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Template: {portfolioData.theme.template}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="bg-transparent">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href={`/create?template=${portfolioData.theme.template}`}>Back to Edit</Link>
            </Button>
            <Button onClick={handleGenerate}>Generate Portfolio</Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <main className="flex-1 bg-muted">
        <div className="max-w-5xl mx-auto p-6">
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Preview Mode
            </span>
          </div>

          <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${isDarkMode ? "dark" : ""}`}>
            <PortfolioPreview data={portfolioData} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewPageContent />
    </Suspense>
  )
}
