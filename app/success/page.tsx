"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Copy, ExternalLink, Download } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const dataParam = searchParams.get("data")
  const portfolioData: PortfolioData = dataParam
    ? JSON.parse(decodeURIComponent(dataParam))
    : {
        personalInfo: { name: "", jobTitle: "", bio: "", profilePhoto: "" },
        skills: [],
        projects: [],
        theme: { template: "minimal", colorScheme: "blue" },
      }

  const portfolioUrl = `${portfolioData.personalInfo.name.toLowerCase().replace(/\s+/g, "")}.portfoliobuilder.app`

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card
        className={`max-w-2xl w-full transition-all duration-700 ${showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <CardContent className="p-12 text-center space-y-6">
          {/* Success Icon with Animation */}
          <div className="flex justify-center">
            <div
              className={`transition-all duration-500 ${showAnimation ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
            >
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Your portfolio has been successfully generated!</h1>
            <p className="text-muted-foreground">Your portfolio is now live and ready to share with the world.</p>
          </div>

          {/* Portfolio URL */}
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Your Portfolio URL</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-lg font-mono bg-background px-4 py-2 rounded border text-primary">
                {portfolioUrl}
              </code>
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="bg-transparent shrink-0">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {copied && <p className="text-sm text-green-600">Copied to clipboard!</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1" asChild>
              <a href={`https://${portfolioUrl}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Portfolio
              </a>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">Deployed with Vercel</p>
            <Button variant="link" asChild>
              <Link href="/">Create Another Portfolio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}
