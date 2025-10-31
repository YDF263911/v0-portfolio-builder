'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useCallback, useEffect } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Animation Component
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Carousel Component
function TemplateCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const templates = [
    {
      id: 1,
      name: "简约风格",
      description: "极简主义设计，专注内容本身",
      gradient: "from-gray-200 to-gray-300",
      textColor: "text-gray-700"
    },
    {
      id: 2,
      name: "暗色模式",
      description: "现代暗色主题，保护眼睛舒适度",
      gradient: "from-gray-800 to-gray-900",
      textColor: "text-gray-300"
    },
    {
      id: 3,
      name: "创意风格",
      description: "色彩丰富，展现个性与创意",
      gradient: "from-purple-400 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 4,
      name: "专业商务",
      description: "正式专业，适合商务场合",
      gradient: "from-blue-400 to-cyan-500",
      textColor: "text-white"
    },
    {
      id: 5,
      name: "清新文艺",
      description: "清新自然，文艺气息浓厚",
      gradient: "from-green-400 to-teal-500",
      textColor: "text-white"
    }
  ]

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Auto scroll functionality
  useEffect(() => {
    if (!emblaApi) return
    
    const autoScroll = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000) // Auto scroll every 5 seconds
    
    return () => clearInterval(autoScroll)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {templates.map((template) => (
            <div key={template.id} className="flex-[0_0_100%] min-w-0">
              <div className={`aspect-video bg-gradient-to-br ${template.gradient} relative overflow-hidden flex items-center justify-center p-8`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className={`text-3xl font-bold mb-2 ${template.textColor}`}>{template.name}</h3>
                  <p className={`text-xl ${template.textColor} opacity-90`}>{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 z-10"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 z-10"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {templates.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { user, isLoading: authLoading } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            作品集构建器
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              首页
            </Link>
            <Link href="/select-template" className="text-gray-700 hover:text-primary transition-colors font-medium">
              模板
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">我的作品集</Link>
                </Button>
                <Button asChild>
                  <Link href="/create">创建作品集</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/login">登录</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">注册</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            打造令人心动的
            <span className="block">专业作品集</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            3分钟内创建您的个人在线作品集，无需代码基础，多种专业模板任您选择
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="/create">免费开始创建</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-primary hover:text-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="/select-template">浏览模板</Link>
            </Button>
          </div>
          
          {/* Template Carousel */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2 text-gray-800">专业模板展示区</h3>
              <p className="text-lg text-gray-600">浏览我们精心设计的作品集模板</p>
            </div>
            <TemplateCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">为何选择我们？</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                我们致力于为您提供最简单、最专业的作品集创建体验
              </p>
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: 多种专业模板 */}
            <AnimatedSection delay={0.1}>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 000 2h8a1 1 0 100-2H6zm0 4a1 1 0 000 2h8a1 1 0 100-2H6zm0 4a1 1 0 000 2h4a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">多种专业模板</h3>
                <p className="text-gray-600 leading-relaxed">
                  提供6种精心设计的专业模板，涵盖简约、创意、专业等多种风格，
                  满足不同行业和个人需求，让您的作品集脱颖而出。
                </p>
              </div>
            </AnimatedSection>

            {/* Feature 2: 极致简单 */}
            <AnimatedSection delay={0.2}>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-cyan-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">极致简单</h3>
                <p className="text-gray-600 leading-relaxed">
                  无需任何代码基础，可视化编辑界面让您轻松上手。
                  3分钟内即可完成作品集创建，专注于内容而非技术细节。
                </p>
              </div>
            </AnimatedSection>

            {/* Feature 3: 一键发布 */}
            <AnimatedSection delay={0.3}>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">一键发布</h3>
                <p className="text-gray-600 leading-relaxed">
                  支持HTML、PDF、JSON多种格式导出，一键分享到社交媒体或直接部署上线。
                  让您的作品集快速触达目标受众。
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">探索精美模板</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                精心设计的专业模板，每个都经过美学优化，帮助您快速创建令人印象深刻的个人作品集
              </p>
            </div>
          </AnimatedSection>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Template 1: 简约风格 */}
            <AnimatedSection delay={0.1}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                {/* Template Preview with Pattern Background */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {/* Subtle Grid Pattern - Simple Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">📄</div>
                    <h3 className="text-2xl font-bold text-gray-700">简约风格</h3>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">简约风格</h3>
                  <p className="text-gray-600">极简主义设计，专注内容本身</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Template 2: 暗色模式 */}
            <AnimatedSection delay={0.2}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  {/* Star Pattern - Simple Stars */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">🌙</div>
                    <h3 className="text-2xl font-bold text-gray-300">暗色模式</h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">暗色模式</h3>
                  <p className="text-gray-600">现代暗色主题，保护眼睛舒适度</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Template 3: 创意风格 */}
            <AnimatedSection delay={0.3}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  {/* Paint Splatter Pattern - Simple Circles */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10px_10px,rgba(255,255,255,0.2)_3px,transparent_0),radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.2)_2px,transparent_0)] bg-[length:40px_40px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold text-white">创意风格</h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">创意风格</h3>
                  <p className="text-gray-600">大胆多彩的设计，展现独特个性</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Template 4: 专业风格 */}
            <AnimatedSection delay={0.4}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  {/* Line Pattern - Simple Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">💼</div>
                    <h3 className="text-2xl font-bold text-white">专业风格</h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">专业风格</h3>
                  <p className="text-gray-600">商务精致风格，适合企业展示</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Template 5: 开发者风格 */}
            <AnimatedSection delay={0.5}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                  {/* Code Pattern - Simple Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-2xl font-bold text-white">开发者风格</h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">开发者风格</h3>
                  <p className="text-gray-600">代码导向布局，展现技术实力</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Template 6: 设计师风格 */}
            <AnimatedSection delay={0.6}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  {/* Geometric Pattern - Simple Circles */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_5px,transparent_0),radial-gradient(circle_at_15px_15px,rgba(255,255,255,0.05)_2px,transparent_0),radial-gradient(circle_at_45px_45px,rgba(255,255,255,0.05)_2px,transparent_0)] bg-[length:60px_60px]"></div>
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold text-white">设计师风格</h3>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center z-20">
                    <Button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 z-30" asChild>
                      <Link href="/select-template">预览</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">设计师风格</h3>
                  <p className="text-gray-600">视觉展示风格，突出设计美感</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* View All Templates Button */}
          <AnimatedSection delay={0.7}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-primary hover:text-primary">
                <Link href="/select-template">查看全部模板</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">用户见证</h2>
              <p className="text-xl text-gray-600">听听我们的用户怎么说</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-lg border border-white/50">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* User Avatar */}
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">张</span>
                </div>
                
                {/* Testimonial Content */}
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 leading-relaxed">
                    "这个作品集生成器简直太棒了！我作为一个设计师，
                    在5分钟内就创建了一个专业的作品集，
                    现在我的客户对我的印象大大提升了。"
                  </blockquote>
                  
                  <div className="text-gray-600">
                    <p className="font-semibold">张设计师</p>
                    <p className="text-sm">UI/UX 设计师，上海</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              立即开始创建
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                您的专业作品集
              </span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              无需代码基础，3分钟内即可拥有专业的在线作品集。
              选择您喜欢的模板，开始展示您的才华吧！
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-white">
                <Link href="/create">免费开始创建</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link href="/select-template">浏览模板</Link>
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.6}>
            <div className="mt-8 flex justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>无需代码</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>3分钟完成</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>专业模板</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">3分钟内创建您的个人在线作品集。</p>
        </div>
      </footer>
    </div>
  )
}
