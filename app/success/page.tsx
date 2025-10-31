"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Copy, ExternalLink, Download, FileText, Save } from "lucide-react"
import { exportPortfolio } from "@/lib/export"
import type { PortfolioData } from "@/types/portfolio"

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

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
    // 保存到本地存储
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportHTML = async () => {
    setIsExporting(true)
    try {
      const filename = `${portfolioData.personalInfo.name || 'portfolio'}.html`
      exportPortfolio.downloadHTML(portfolioData, filename)
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportJSON = async () => {
    setIsExporting(true)
    try {
      const filename = `${portfolioData.personalInfo.name || 'portfolio'}.json`
      exportPortfolio.downloadJSON(portfolioData, filename)
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportPortfolio.toPDF(portfolioData)
    } catch (error) {
      console.error('PDF导出失败:', error)
      alert('PDF导出失败，请尝试使用HTML导出')
    } finally {
      setIsExporting(false)
    }
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
            <h1 className="text-3xl font-bold text-balance">您的作品集已成功生成！</h1>
            <p className="text-muted-foreground">您的作品集已保存到本地存储，可以随时导出分享。</p>
          </div>

          {/* Export Options */}
          <div className="bg-muted rounded-lg p-4 space-y-4">
            <p className="text-sm font-medium text-muted-foreground">导出选项</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={handleExportHTML}
                disabled={isExporting}
                className="bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                HTML
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportJSON}
                disabled={isExporting}
                className="bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              HTML: 可直接在浏览器中打开 | JSON: 数据备份 | PDF: 打印友好格式
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1" asChild>
              <Link href={`/preview?data=${encodeURIComponent(JSON.stringify(portfolioData))}`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                预览作品集
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/create">
                <Save className="w-4 h-4 mr-2" />
                创建新的
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">数据已自动保存到本地存储</p>
            <Button variant="link" asChild>
              <Link href="/">返回首页</Link>
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
