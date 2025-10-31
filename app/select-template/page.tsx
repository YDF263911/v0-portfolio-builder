'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TemplateCard } from "@/components/template-card"
import { useAuth } from "@/components/auth-provider"

const templates = [
  {
    id: "minimal",
    name: "简约风格",
    description: "极简主义设计，专注内容本身，适合追求简洁的用户",
    image: "/minimal-portfolio-template-clean-white-background.jpg",
    features: ["极简布局", "快速加载", "响应式设计", "易于定制", "现代美学"],
    recommendedFor: ["开发者", "技术人员", "简约爱好者", "内容创作者"]
  },
  {
    id: "dark-mode",
    name: "暗色模式",
    description: "赛博朋克风格暗色主题，保护眼睛的同时展现科技感",
    image: "/dark-mode-portfolio-template-black-background.jpg",
    features: ["暗色主题", "现代设计", "视觉舒适", "专业感强", "玻璃拟态"],
    recommendedFor: ["设计师", "创意工作者", "夜间用户", "科技爱好者"]
  },
  {
    id: "creative",
    name: "创意风格",
    description: "大胆多彩的设计，展现独特的创意个性和艺术感",
    image: "/creative-portfolio-template-colorful-design.jpg",
    features: ["多彩设计", "创意布局", "动画效果", "个性展示", "视觉冲击"],
    recommendedFor: ["艺术家", "设计师", "创意人才", "品牌策划"]
  },
  {
    id: "professional",
    name: "专业风格",
    description: "商务精致风格，适合企业展示和专业服务，展现专业形象",
    image: "/professional-portfolio-template-business-style.jpg",
    features: ["商务设计", "专业布局", "企业级", "可信赖", "优雅排版"],
    recommendedFor: ["企业主", "专业人士", "商务人士", "咨询顾问"]
  },
  {
    id: "developer",
    name: "开发者风格",
    description: "代码导向布局，展现技术实力和编程思维，适合技术展示",
    image: "/developer-portfolio-template-code-theme.jpg",
    features: ["代码风格", "技术展示", "功能导向", "开发者友好", "终端界面"],
    recommendedFor: ["程序员", "工程师", "技术专家", "开源贡献者"]
  },
  {
    id: "designer",
    name: "设计师风格",
    description: "视觉展示风格，突出设计感和美学追求，适合创意展示",
    image: "/designer-portfolio-template-visual-showcase.jpg",
    features: ["视觉设计", "美学布局", "作品展示", "创意表达", "画廊效果"],
    recommendedFor: ["设计师", "艺术家", "视觉创作者", "摄影爱好者"]
  },
]

export default function SelectTemplatePage() {
  const { user, isLoading: authLoading } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            作品集构建器
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">我的作品集</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">返回首页</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/login">登录</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">返回首页</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <main className="flex-1 w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-blue-700 font-medium shadow-lg">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
              <span className="text-lg">6种专业模板可选</span>
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              选择您的专属模板
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              精心设计的专业模板，每个都经过美学优化，帮助您快速创建令人印象深刻的个人作品集
            </p>
            
            {/* Interactive Stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">6+</div>
                <div className="text-sm text-gray-500">专业模板</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-gray-500">响应式设计</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">3min</div>
                <div className="text-sm text-gray-500">快速创建</div>
              </div>
            </div>
          </div>

          {/* Enhanced Template Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {["全部模板", "简约风格", "专业风格", "创意风格", "开发者风格", "设计师风格"].map((filter, index) => (
              <button 
                key={filter}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  index === 0 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0" 
                    : "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Enhanced Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {templates.map((template) => (
              <div key={template.id} className="transform hover:scale-105 transition-transform duration-500">
                <TemplateCard template={template} />
              </div>
            ))}
          </div>

          {/* Enhanced Action Section */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-xl opacity-30"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-xl opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">准备好开始了吗？</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                选择一个模板后，点击"开始创建"按钮进入编辑界面，3分钟内即可完成您的个人作品集
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">无需代码基础</div>
                    <div className="text-sm text-gray-600">可视化编辑</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📱</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">响应式设计</div>
                    <div className="text-sm text-gray-600">多设备适配</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🚀</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">一键导出分享</div>
                    <div className="text-sm text-gray-600">多种格式支持</div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 flex items-center justify-center gap-6">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  实时预览效果
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  专业设计模板
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  快速部署上线
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">3分钟内创建您的个人在线作品集。</p>
        </div>
      </footer>
    </div>
  )
}