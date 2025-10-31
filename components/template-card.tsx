"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Template {
  id: string
  name: string
  description: string
  image: string
  features?: string[]
  recommendedFor?: string[]
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)
  const pathname = usePathname()
  
  // 根据当前页面决定跳转链接
  const getCreateLink = () => {
    if (pathname === "/select-template") {
      // 在模板选择页面，跳转到创建页面
      return `/create?template=${template.id}`
    } else {
      // 在首页，直接跳转到创建页面并带上模板参数
      return `/create?template=${template.id}`
    }
  }
  
  const getButtonText = () => {
    if (pathname === "/select-template") {
      return "开始创建"
    } else {
      return "使用模板"
    }
  }

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-0 shadow-md overflow-hidden">
        <CardHeader className="p-0 relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image 
              src={template.image || "/placeholder.svg"} 
              alt={template.name} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black font-medium">
                {template.id === "minimal" && "简约"}
                {template.id === "dark-mode" && "暗色"}
                {template.id === "creative" && "创意"}
                {template.id === "professional" && "专业"}
                {template.id === "developer" && "开发"}
                {template.id === "designer" && "设计"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <CardTitle className="text-xl font-bold mb-2 text-gray-900">{template.name}</CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
          </div>
          
          {template.features && template.features.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">特色功能</p>
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
                    {feature}
                  </Badge>
                ))}
                {template.features.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-600">
                    +{template.features.length - 3}更多
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {template.recommendedFor && template.recommendedFor.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">推荐人群</p>
              <div className="flex flex-wrap gap-1">
                {template.recommendedFor.slice(0, 2).map((group, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-green-50 text-green-700">
                    {group}
                  </Badge>
                ))}
                {template.recommendedFor.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600">
                    +{template.recommendedFor.length - 2}更多
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent border-gray-300 hover:bg-gray-50" onClick={() => setShowPreview(true)}>
            预览模板
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" asChild>
            <Link href={getCreateLink()}>{getButtonText()}</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Enhanced Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            {/* Live Template Preview - 占据3/5宽度 */}
            <div className="lg:col-span-3 relative h-96 lg:h-full bg-gradient-to-br from-slate-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-4xl h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white transform scale-90 lg:scale-100 transition-transform duration-500">
                  {/* Live Template Preview Content */}
                  <div className="h-full flex flex-col">
                    {/* Template Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold">P</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{template.name} 模板预览</h3>
                            <p className="text-blue-100 text-sm">实时布局效果展示</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Template Body - 根据模板类型展示不同的布局 */}
                    <div className="flex-1 p-6 overflow-y-auto">
                      {template.id === "minimal" && (
                        <div className="h-full flex flex-col bg-white">
                          {/* 极致简约导航栏 */}
                          <div className="border-b border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-medium text-gray-900">Portfolio</div>
                              <div className="flex gap-8 text-sm text-gray-600">
                                <span>关于</span>
                                <span>作品</span>
                                <span>联系</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 极致简约内容区域 */}
                          <div className="flex-1 flex flex-col justify-center p-12">
                            <div className="text-center space-y-12">
                              {/* 超大标题区域 - 极致简约 */}
                              <div>
                                <h3 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">简约作品集</h3>
                                <p className="text-xl text-gray-600">专注内容，回归本质</p>
                              </div>
                              
                              {/* 简约分隔线 */}
                              <div className="w-24 h-px bg-gray-200 mx-auto"></div>
                              
                              {/* 极简特性展示 */}
                              <div className="flex justify-center gap-12 text-sm text-gray-600">
                                <div className="text-center">
                                  <div className="text-2xl font-light text-gray-900">3</div>
                                  <div className="mt-1">项目</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-light text-gray-900">5</div>
                                  <div className="mt-1">技能</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-light text-gray-900">∞</div>
                                  <div className="mt-1">潜力</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 极致简约页脚 */}
                          <div className="border-t border-gray-100 p-6 text-center">
                            <p className="text-sm text-gray-500">简约设计 · 专注内容</p>
                          </div>
                        </div>
                      )}
                      
                      {template.id === "dark-mode" && (
                        <div className="h-full flex flex-col bg-gray-900">
                          {/* 暗色导航栏 */}
                          <div className="border-b border-gray-800 p-6 bg-gray-900">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-semibold text-gray-100">Portfolio</div>
                              <div className="flex gap-6 text-sm text-gray-400">
                                <span className="hover:text-cyan-400 transition-colors">关于</span>
                                <span className="hover:text-cyan-400 transition-colors">作品</span>
                                <span className="hover:text-cyan-400 transition-colors">联系</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 暗色内容区域 */}
                          <div className="flex-1 flex flex-col justify-center p-8">
                            <div className="text-center space-y-8">
                              {/* 头像区域 */}
                              <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center border-4 border-gray-700">
                                <span className="text-2xl font-bold text-cyan-400">D</span>
                              </div>
                              
                              {/* 标题区域 */}
                              <div>
                                <h3 className="text-3xl font-bold text-gray-100 mb-2">暗色作品集</h3>
                                <p className="text-gray-400 text-lg">现代精致，护眼设计</p>
                              </div>
                              
                              {/* 暗色分隔线 */}
                              <div className="w-20 h-px bg-gray-700 mx-auto"></div>
                              
                              {/* 暗色特性展示 */}
                              <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-cyan-400">3</div>
                                  <div className="text-sm text-gray-400 mt-1">项目</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-green-400">5</div>
                                  <div className="text-sm text-gray-400 mt-1">技能</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-purple-400">∞</div>
                                  <div className="text-sm text-gray-400 mt-1">潜力</div>
                                </div>
                              </div>
                              
                              {/* 暗色卡片预览 */}
                              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                                  <div className="text-cyan-400 text-sm font-medium">React</div>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                                  <div className="text-green-400 text-sm font-medium">TypeScript</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 暗色页脚 */}
                          <div className="border-t border-gray-800 p-4 text-center">
                            <p className="text-xs text-gray-500">暗色主题 · 现代设计</p>
                          </div>
                        </div>
                      )}
                      
                      {template.id === "creative" && (
                        <div className="h-full flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
                          {/* 创意导航栏 */}
                          <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-6">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Portfolio
                              </div>
                              <div className="flex gap-4 text-sm font-medium text-gray-700">
                                <span>关于</span>
                                <span>作品</span>
                                <span>联系</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 创意内容区域 - 非对称布局 */}
                          <div className="flex-1 flex items-center justify-center p-6">
                            <div className="grid grid-cols-5 gap-4 w-full max-w-md">
                              {/* 左侧内容 - 占据3列 */}
                              <div className="col-span-3 space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                                  创意
                                  <br />
                                  作品集
                                </h3>
                                <p className="text-sm text-gray-600">打破常规，展示个性</p>
                                
                                {/* 创意按钮 */}
                                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full font-medium">
                                  探索作品
                                </button>
                              </div>
                              
                              {/* 右侧装饰 - 占据2列 */}
                              <div className="col-span-2 flex items-center justify-center">
                                <div className="relative">
                                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl transform rotate-3"></div>
                                  <div className="absolute inset-0 w-16 h-16 bg-white rounded-xl border-4 border-white transform -rotate-2 shadow-lg flex items-center justify-center">
                                    <span className="text-2xl">✨</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 创意技能展示 */}
                          <div className="p-4">
                            <div className="grid grid-cols-3 gap-2">
                              {["设计", "创意", "动画"].map((skill, index) => (
                                <div 
                                  key={skill}
                                  className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center text-xs font-medium transition-all duration-300 hover:scale-105"
                                  style={{
                                    transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                                    backgroundColor: index === 0 ? '#f3e8ff' : 
                                                    index === 1 ? '#ffe4e6' : '#ffedd5',
                                    color: index === 0 ? '#7c3aed' : 
                                           index === 1 ? '#ec4899' : '#f59e0b'
                                  }}
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* 创意页脚 */}
                          <div className="border-t border-white/20 p-4 text-center">
                            <p className="text-xs text-gray-600">创意无限 · 个性展示</p>
                          </div>
                        </div>
                      )}
                      
                      {template.id === "professional" && (
                        <div className="h-full flex flex-col bg-white">
                          {/* 专业导航栏 */}
                          <div className="border-b border-gray-200 p-6 bg-white">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-serif font-semibold text-gray-900">Portfolio</div>
                              <div className="flex gap-6 text-sm text-gray-600">
                                <span>首页</span>
                                <span>经历</span>
                                <span>联系</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 专业内容区域 - 左右分栏布局 */}
                          <div className="flex-1 grid grid-cols-4">
                            {/* 左侧栏 - 深蓝色背景 */}
                            <div className="col-span-1 bg-blue-900 text-white p-4">
                              <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 border-2 border-blue-700 flex items-center justify-center">
                                  <span className="text-blue-900 font-bold text-lg">P</span>
                                </div>
                                <div className="font-serif font-semibold text-sm">专业简历</div>
                                <div className="text-blue-200 text-xs">高级职位</div>
                              </div>
                              
                              {/* 联系信息 */}
                              <div className="space-y-2 text-xs">
                                <div>contact@email.com</div>
                                <div>+86 138 0000 0000</div>
                              </div>
                            </div>
                            
                            {/* 右侧栏 - 白色背景 */}
                            <div className="col-span-3 p-4">
                              <div className="space-y-4">
                                {/* 个人简介 */}
                                <div>
                                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">个人简介</h3>
                                  <p className="text-gray-600 text-sm leading-relaxed">资深专业人士，卓越的专业能力。</p>
                                </div>
                                
                                {/* 工作经历时间线 */}
                                <div className="space-y-3">
                                  <div className="border-l-2 border-blue-600 pl-3 relative">
                                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <div className="text-xs text-gray-500">2020 - 至今</div>
                                    <div className="text-sm font-medium text-gray-900">高级项目经理</div>
                                  </div>
                                  
                                  <div className="border-l-2 border-gray-300 pl-3 relative">
                                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-gray-300 rounded-full"></div>
                                    <div className="text-xs text-gray-500">2018 - 2020</div>
                                    <div className="text-sm font-medium text-gray-900">项目顾问</div>
                                  </div>
                                </div>
                                
                                {/* 教育背景 */}
                                <div>
                                  <h4 className="font-serif text-sm font-semibold text-gray-900 mb-1">教育背景</h4>
                                  <div className="text-xs text-gray-600">工商管理硕士 · 清华大学</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 专业页脚 */}
                          <div className="border-t border-gray-200 p-4 text-center">
                            <p className="text-xs text-gray-500">专业严谨 · 值得信赖</p>
                          </div>
                        </div>
                      )}
                      
                      {template.id === "developer" && (
                        <div className="h-full flex flex-col bg-gray-900">
                          {/* IDE风格导航栏 */}
                          <div className="bg-gray-800 border-b border-gray-700 p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-xs text-gray-300">portfolio.tsx</span>
                              </div>
                              <div className="flex gap-3 text-xs text-gray-500">
                                <span>about()</span>
                                <span>projects()</span>
                                <span>contact()</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 代码编辑器风格内容 */}
                          <div className="flex-1 p-4">
                            <div className="space-y-3 text-xs font-mono">
                              <div>
                                <span className="text-purple-400">const</span>
                                <span className="text-gray-300"> </span>
                                <span className="text-yellow-300">developer</span>
                                <span className="text-gray-300"> = </span>
                                <span className="text-purple-400">{'{'}</span>
                              </div>
                              
                              <div className="ml-4 space-y-2">
                                <div>
                                  <span className="text-green-400">name</span>
                                  <span className="text-gray-300">: </span>
                                  <span className="text-cyan-400">"开发者风格"</span>
                                  <span className="text-gray-300">,</span>
                                </div>
                                <div>
                                  <span className="text-green-400">techStack</span>
                                  <span className="text-gray-300">: </span>
                                  <span className="text-purple-400">[</span>
                                  <span className="text-blue-400">"React"</span>
                                  <span className="text-gray-300">, </span>
                                  <span className="text-blue-400">"TypeScript"</span>
                                  <span className="text-gray-300">, </span>
                                  <span className="text-blue-400">"Tailwind"</span>
                                  <span className="text-purple-400">]</span>
                                  <span className="text-gray-300">,</span>
                                </div>
                                <div>
                                  <span className="text-green-400">theme</span>
                                  <span className="text-gray-300">: </span>
                                  <span className="text-cyan-400">"VS Code Dark"</span>
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-purple-400">{'}'}</span>
                                <span className="text-gray-300">;</span>
                              </div>
                              
                              <div className="text-gray-500">
                                <span>// 由开发者，为开发者</span>
                              </div>
                            </div>
                            
                            {/* 技能标签预览 */}
                            <div className="mt-4 flex flex-wrap gap-1">
                              {["React", "TS", "Node", "Git"].map((tech, index) => (
                                <span 
                                  key={tech}
                                  className="px-2 py-1 text-xs rounded border ${
                                    index === 0 ? 'bg-blue-900/30 text-blue-400 border-blue-700' :
                                    index === 1 ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' :
                                    index === 2 ? 'bg-green-900/30 text-green-400 border-green-700' :
                                    'bg-purple-900/30 text-purple-400 border-purple-700'
                                  }"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* 终端风格页脚 */}
                          <div className="border-t border-gray-700 p-3 bg-gray-800">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="text-green-400">$</span>
                              <span>npm run dev</span>
                              <span className="text-green-400 ml-2">✓</span>
                              <span className="text-gray-500">开发服务器已启动</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {template.id === "designer" && (
                        <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
                          {/* 简约导航栏 */}
                          <div className="bg-white border-b border-gray-100 p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gray-900">Design Portfolio</div>
                              <div className="flex gap-3 text-xs text-gray-600">
                                <span>Work</span>
                                <span>About</span>
                                <span>Contact</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* 瀑布流网格预览 */}
                          <div className="flex-1 p-4">
                            <div className="grid grid-cols-2 gap-2">
                              {/* 项目卡片1 */}
                              <div className="group relative aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <h4 className="text-white text-xs font-semibold truncate">Mobile App</h4>
                                    <p className="text-gray-200 text-xs truncate">UI/UX Design</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* 项目卡片2 */}
                              <div className="group relative aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <h4 className="text-white text-xs font-semibold truncate">Web Design</h4>
                                    <p className="text-gray-200 text-xs truncate">Brand Identity</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* 项目卡片3 */}
                              <div className="group relative aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg overflow-hidden col-span-2">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <h4 className="text-white text-xs font-semibold truncate">Brand Campaign</h4>
                                    <p className="text-gray-200 text-xs truncate">Creative Direction</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* 设计理念标签 */}
                            <div className="flex flex-wrap gap-1 mt-3 justify-center">
                              {["Minimal", "User-Centered", "Innovative"].map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* 设计师页脚 */}
                          <div className="border-t border-gray-100 p-3 bg-white">
                            <div className="text-center text-xs text-gray-500">
                              Visual Design · Attention to Detail
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Template Details - 占据2/5宽度 */}
            <div className="lg:col-span-2 p-8 space-y-8 overflow-y-auto bg-white/80 backdrop-blur-sm">
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    template.id === "minimal" ? "bg-gradient-to-r from-blue-500 to-blue-600" :
                    template.id === "dark-mode" ? "bg-gradient-to-r from-gray-800 to-gray-900" :
                    template.id === "creative" ? "bg-gradient-to-r from-green-500 to-blue-500" :
                    template.id === "professional" ? "bg-gradient-to-r from-gray-600 to-gray-700" :
                    template.id === "developer" ? "bg-gradient-to-r from-indigo-500 to-purple-500" :
                    "bg-gradient-to-r from-pink-500 to-orange-500"
                  }`}>
                    {template.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {template.name}
                    </DialogTitle>
                    <p className="text-gray-600 mt-2 text-lg leading-relaxed">{template.description}</p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* 模板特色 */}
                {template.features && template.features.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      模板特色
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-white/80 rounded-xl border border-blue-100">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 推荐人群 */}
                {template.recommendedFor && template.recommendedFor.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      推荐人群
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {template.recommendedFor.map((group, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/90 backdrop-blur-sm text-green-700 border-green-200 px-4 py-2 rounded-full font-medium">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 布局预览说明 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    布局预览
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    左侧展示了{template.name}模板的实际布局效果。您可以看到导航栏、内容区域、色彩搭配等设计元素的实际呈现。
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-300" 
                  onClick={() => setShowPreview(false)}
                >
                  关闭预览
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300" 
                  asChild
                >
                  <Link href={getCreateLink()}>{getButtonText()}</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
