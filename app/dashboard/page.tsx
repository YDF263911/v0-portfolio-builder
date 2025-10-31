'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { authService } from "@/lib/auth"
import { portfolioService } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Eye, Trash2, User, LogOut } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

interface PortfolioItem {
  id: string
  portfolio_data: PortfolioData
  created_at: string
  updated_at: string
}

// 模板名称映射
const templateNames: Record<string, string> = {
  minimal: "简约风格",
  "dark-mode": "暗色模式", 
  creative: "创意风格",
  professional: "专业风格",
  developer: "开发者风格",
  designer: "设计师风格"
}

// 获取模板显示名称
const getTemplateDisplayName = (templateId: string): string => {
  return templateNames[templateId] || templateId
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadPortfolios()
    }
  }, [user, authLoading, router])

  const loadPortfolios = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const userPortfolios = await portfolioService.getUserPortfolios(user.id)
      setPortfolios(userPortfolios)
    } catch (error: any) {
      setError("加载作品集失败: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      router.push("/")
    } catch (error: any) {
      setError("登出失败: " + error.message)
    }
  }

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!confirm("确定要删除这个作品集吗？此操作不可撤销。")) return
    
    if (!user) return
    
    try {
      await portfolioService.deletePortfolio(portfolioId, user.id)
      // 重新加载列表
      await loadPortfolios()
    } catch (error: any) {
      setError("删除失败: " + error.message)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // 重定向中
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            作品集构建器
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              {user.email}
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              登出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">我的作品集</h1>
          <p className="text-muted-foreground mt-2">
            管理您的所有作品集项目
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Create New Portfolio */}
        <Card className="mb-8 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">创建新作品集</h3>
                <p className="text-muted-foreground">
                  从模板开始创建您的专业作品集
                </p>
              </div>
              <Button asChild>
                <Link href="/select-template">
                  <Plus className="w-4 h-4 mr-2" />
                  创建作品集
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-3 text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">加载作品集...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Plus className="w-16 h-16 mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">还没有作品集</h3>
              <p className="text-muted-foreground mb-4">
                创建您的第一个作品集来展示您的技能和项目
              </p>
              <Button asChild>
                <Link href="/create">创建第一个作品集</Link>
              </Button>
            </div>
          ) : (
            portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {portfolio.portfolio_data.personalInfo.name || "未命名作品集"}
                      </CardTitle>
                      <CardDescription>
                        最后更新: {new Date(portfolio.updated_at).toLocaleDateString('zh-CN')}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {getTemplateDisplayName(portfolio.portfolio_data.theme.template)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {portfolio.portfolio_data.personalInfo.bio || "暂无描述"}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/preview?data=${encodeURIComponent(JSON.stringify(portfolio.portfolio_data))}`}>
                      <Eye className="w-4 h-4 mr-1" />
                      预览
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/create?edit=${portfolio.id}`}>
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeletePortfolio(portfolio.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}