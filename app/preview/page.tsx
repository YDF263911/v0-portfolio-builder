"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Moon, Sun, Download, FileText, Save, Eye } from "lucide-react"
import { exportPortfolio } from "@/lib/export"
import type { PortfolioData } from "@/types/portfolio"

function PreviewPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const dataParam = searchParams.get("data")
  
  // 安全解析URL参数
  const getPortfolioData = (): PortfolioData => {
    if (!dataParam) {
      return {
        personalInfo: { name: "", jobTitle: "", bio: "", profilePhoto: "" },
        skills: [],
        projects: [],
        theme: { template: "minimal", colorScheme: "blue" },
      }
    }

    try {
      // 先解码URI组件
      const decodedParam = decodeURIComponent(dataParam)
      // 然后解析JSON
      return JSON.parse(decodedParam)
    } catch (error) {
      console.error('解析作品集数据失败:', error)
      console.log('原始参数:', dataParam)
      
      // 返回默认数据
      return {
        personalInfo: { name: "", jobTitle: "", bio: "", profilePhoto: "" },
        skills: [],
        projects: [],
        theme: { template: "minimal", colorScheme: "blue" },
      }
    }
  }

  const portfolioData: PortfolioData = getPortfolioData()

  const handleGenerate = () => {
    // 保存到本地存储
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
    router.push(`/success?data=${encodeURIComponent(JSON.stringify(portfolioData))}`)
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

  // 新增：导出预览功能
  const handlePreviewExport = () => {
    try {
      exportPortfolio.previewHTML(portfolioData)
    } catch (error) {
      console.error('预览导出失败:', error)
      alert('预览功能暂时不可用')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">模板: {portfolioData.theme.template}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="bg-transparent">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            {/* 导出菜单 */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreviewExport}
                disabled={isExporting}
                className="bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                预览导出
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportHTML}
                disabled={isExporting}
                className="bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                HTML
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportJSON}
                disabled={isExporting}
                className="bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
            
            <Button variant="outline" asChild className="bg-transparent">
              <Link href={`/create?template=${portfolioData.theme.template}`}>返回编辑</Link>
            </Button>
            <Button onClick={handleGenerate} disabled={isExporting}>
              <Save className="w-4 h-4 mr-2" />
              生成作品集
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Preview Area */}
      <main className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto p-8 relative z-10">
          {/* Enhanced Preview Header */}
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-blue-700 font-medium shadow-lg">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
              <span className="text-lg font-semibold">实时预览模式</span>
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
            </div>
          </div>

          {/* Enhanced Preview Container */}
          <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white transform hover:scale-[1.01] transition-transform duration-500 ${isDarkMode ? "dark" : ""}`}>
            <div className="relative">
              {/* Preview Browser Bar */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-b border-gray-300">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 font-mono">
                    {portfolioData.personalInfo.name || "您的作品集"} - {portfolioData.theme.template} 模板
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {isDarkMode ? "🌙 暗色模式" : "☀️ 亮色模式"}
                  </div>
                </div>
              </div>
              
              {/* Portfolio Preview Content */}
              <div className="max-h-[70vh] overflow-y-auto">
                <PortfolioPreview data={portfolioData} />
              </div>
            </div>
          </div>
          
          {/* Enhanced Export Section */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">导出您的作品集</h3>
              <p className="text-gray-600 mb-6">选择您喜欢的格式导出作品集，支持多种分享方式</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg font-bold">H</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">HTML格式</h4>
                  <p className="text-sm text-gray-600">完整的网页文件，可直接部署</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg font-bold">J</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">JSON格式</h4>
                  <p className="text-sm text-gray-600">数据备份，便于后续编辑</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg font-bold">P</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">PDF格式</h4>
                  <p className="text-sm text-gray-600">打印友好，便于分享</p>
                </div>
              </div>
            </div>
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
