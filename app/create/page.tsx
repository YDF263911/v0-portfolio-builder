"use client"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { ThemeSettingsForm } from "@/components/forms/theme-settings-form"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { validatePortfolio } from "@/lib/validation"
import { portfolioStorage } from "@/lib/storage"
import { useAuth } from "@/components/auth-provider"
import { authService } from "@/lib/auth"
import { portfolioService } from "@/lib/supabase"
import { AlertCircle, CheckCircle, Upload, Download, User, LogOut } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

function CreatePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const templateId = searchParams.get("template") || "minimal"
  const editPortfolioId = searchParams.get("edit")

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
  
  const [isEditing, setIsEditing] = useState(false)
  const [currentPortfolioId, setCurrentPortfolioId] = useState<string | null>(null)

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 加载用户保存的数据
  useEffect(() => {
    if (!authLoading) {
      // 如果是创建新作品集（没有edit参数），使用空白模板
      if (!editPortfolioId) {
        const newPortfolioData: PortfolioData = {
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
        }
        setPortfolioData(newPortfolioData)
        validateForm(newPortfolioData)
      } else if (user) {
        // 用户已登录，加载云端数据（编辑模式）
        loadUserData()
      } else {
        // 用户未登录，加载本地数据
        loadLocalData()
      }
    }
  }, [user, authLoading, editPortfolioId, templateId])

  const loadUserData = async () => {
    setIsLoading(true)
    try {
      // 如果是编辑模式，加载特定的作品集
      if (editPortfolioId && user) {
        setIsEditing(true)
        setCurrentPortfolioId(editPortfolioId)
        
        // 从Supabase加载特定的作品集
        const userPortfolios = await portfolioService.getUserPortfolios(user.id)
        const portfolioToEdit = userPortfolios.find(p => p.id === editPortfolioId)
        
        if (portfolioToEdit && portfolioToEdit.portfolio_data) {
          const fixedData = fixImageUrls(portfolioToEdit.portfolio_data)
          // 保持当前选择的模板
          fixedData.theme.template = templateId
          setPortfolioData(fixedData)
          validateForm(fixedData)
          console.log('加载编辑作品集成功:', portfolioToEdit.id)
        }
      } else {
        // 正常加载用户保存的数据 - 优先加载最新的作品集
        const userPortfolios = await portfolioService.getUserPortfolios(user.id)
        console.log('用户作品集列表:', userPortfolios)
        
        if (userPortfolios.length > 0) {
          // 加载最新的作品集
          const latestPortfolio = userPortfolios[0]
          const fixedData = fixImageUrls(latestPortfolio.portfolio_data)
          // 保持当前选择的模板
          fixedData.theme.template = templateId
          setPortfolioData(fixedData)
          setCurrentPortfolioId(latestPortfolio.id)
          validateForm(fixedData)
          console.log('自动加载最新作品集:', latestPortfolio.id)
        } else {
          // 没有作品集，加载本地数据作为备份
          const savedData = await portfolioStorage.load()
          if (savedData) {
            const fixedData = fixImageUrls(savedData)
            // 保持当前选择的模板
            fixedData.theme.template = templateId
            setPortfolioData(fixedData)
            validateForm(fixedData)
            console.log('加载本地备份数据')
          }
        }
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
      // 降级到本地存储
      const savedData = await portfolioStorage.load()
      if (savedData) {
        const fixedData = fixImageUrls(savedData)
        // 保持当前选择的模板
        fixedData.theme.template = templateId
        setPortfolioData(fixedData)
        validateForm(fixedData)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadLocalData = async () => {
    setIsLoading(true)
    try {
      const savedData = await portfolioStorage.load()
      if (savedData) {
        const fixedData = fixImageUrls(savedData)
        // 保持当前选择的模板
        fixedData.theme.template = templateId
        setPortfolioData(fixedData)
        validateForm(fixedData)
      }
    } catch (error) {
      console.error('加载本地数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 修复图片URL（处理blob URL失效问题）
  const fixImageUrls = (data: PortfolioData): PortfolioData => {
    const fixedData = { ...data }
    
    // 修复头像URL
    if (fixedData.personalInfo.profilePhoto && 
        fixedData.personalInfo.profilePhoto.startsWith('blob:')) {
      fixedData.personalInfo.profilePhoto = ''
    }
    
    // 修复项目图片URL
    fixedData.projects = fixedData.projects.map(project => ({
      ...project,
      image: project.image && project.image.startsWith('blob:') ? '' : project.image
    }))
    
    return fixedData
  }

  const updatePersonalInfo = (info: Partial<PortfolioData["personalInfo"]>) => {
    const newData = {
      ...portfolioData,
      personalInfo: { ...portfolioData.personalInfo, ...info },
    }
    setPortfolioData(newData)
    validateForm(newData)
  }

  const updateSkills = (skills: string[]) => {
    const newData = { ...portfolioData, skills }
    setPortfolioData(newData)
    validateForm(newData)
  }

  const updateProjects = (projects: PortfolioData["projects"]) => {
    const newData = { ...portfolioData, projects }
    setPortfolioData(newData)
    validateForm(newData)
  }

  const updateTheme = (theme: Partial<PortfolioData["theme"]>) => {
    const newData = {
      ...portfolioData,
      theme: { ...portfolioData.theme, ...theme },
    }
    setPortfolioData(newData)
    validateForm(newData)
  }

  const validateForm = (data: PortfolioData) => {
    const result = validatePortfolio(data)
    setValidationErrors(result.errors || {})
    setIsValid(result.success)
  }

  const handlePreview = async () => {
    const result = validatePortfolio(portfolioData)
    if (!result.success) {
      setValidationErrors(result.errors || {})
      alert("请先完善必填信息")
      return
    }
    
    // 保存数据（支持多用户）
    try {
      if (isEditing && currentPortfolioId && user) {
        // 编辑模式：更新现有的作品集
        await portfolioService.savePortfolio(portfolioData, user.id, currentPortfolioId)
      } else {
        // 创建模式：保存到本地存储
        await portfolioStorage.save(portfolioData, user?.id)
      }
      window.location.href = `/preview?data=${encodeURIComponent(JSON.stringify(portfolioData))}`
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    }
  }

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const importedData = await portfolioStorage.importFromFile(file)
      setPortfolioData(importedData)
      validateForm(importedData)
      alert('数据导入成功！')
    } catch (error) {
      alert('导入失败：' + (error instanceof Error ? error.message : '未知错误'))
    } finally {
      setIsLoading(false)
      // 重置文件输入
      event.target.value = ''
    }
  }

  const handleExportData = () => {
    portfolioStorage.exportToFile(portfolioData, `${portfolioData.personalInfo.name || 'portfolio'}.json`)
  }

  const handleLoadFromStorage = async () => {
    setIsLoading(true)
    try {
      const savedData = await portfolioStorage.load(user?.id)
      if (savedData) {
        setPortfolioData(savedData)
        validateForm(savedData)
        alert('已加载保存的数据')
      } else {
        alert('没有找到保存的数据')
      }
    } catch (error) {
      alert('加载失败：' + (error instanceof Error ? error.message : '未知错误'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      router.push("/")
    } catch (error) {
      console.error('登出失败:', error)
      alert('登出失败，请重试')
    }
  }

  const handleGoToDashboard = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            作品集构建器
          </Link>
          <div className="flex items-center gap-3">
            {/* 数据管理按钮 */}
            <div className="flex items-center gap-2">
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                disabled={isLoading}
                className="bg-transparent"
              >
                <label htmlFor="import-file" className="cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {isLoading ? '导入中...' : '导入'}
                </label>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportData}
                disabled={isLoading}
                className="bg-transparent"
              >
                <Download className="w-4 h-4" />
                导出
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoadFromStorage}
                disabled={isLoading}
                className="bg-transparent"
              >
                {isLoading ? '加载中...' : '加载'}
              </Button>
            </div>
            
            {/* 用户认证相关按钮 */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGoToDashboard}
                  className="bg-transparent"
                >
                  我的作品集
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="bg-transparent"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <Link href="/login">登录</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/register">注册</Link>
                </Button>
              </div>
            )}
            
            <Button variant="outline" asChild>
              <Link href="/">返回模板</Link>
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
              <h1 className="text-3xl font-bold mb-2">构建您的作品集</h1>
              <p className="text-muted-foreground">填写您的详细信息来创建作品集</p>
              
              {/* Validation Status */}
              <div className={`flex items-center gap-2 mt-2 text-sm ${isValid ? 'text-green-600' : 'text-amber-600'}`}>
                {isValid ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>所有必填信息已完善</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>请完善必填信息</span>
                  </>
                )}
              </div>
            </div>

            <PersonalInfoForm 
              data={portfolioData.personalInfo} 
              onChange={updatePersonalInfo}
              errors={validationErrors}
            />
            <SkillsForm 
              skills={portfolioData.skills} 
              onChange={updateSkills}
              errors={validationErrors}
            />
            <ProjectsForm 
              projects={portfolioData.projects} 
              onChange={updateProjects}
              errors={validationErrors}
            />
            <ThemeSettingsForm 
              theme={portfolioData.theme} 
              onChange={updateTheme}
            />

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background pt-6 pb-4 border-t flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent" 
                onClick={handlePreview}
                disabled={!isValid}
              >
                预览效果
              </Button>
              <Button 
                className="flex-1" 
                onClick={handlePreview}
                disabled={!isValid}
              >
                下一步
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="hidden lg:block w-1/2 bg-muted border-l sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">实时预览</h2>
              <span className="text-sm text-muted-foreground">实时更新</span>
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
