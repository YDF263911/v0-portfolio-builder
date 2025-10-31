import React, { useState } from 'react'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PortfolioData } from "@/types/portfolio"
import { getTemplateStyles, getTemplateCSSVariables } from "@/lib/template-styles"
import "@/styles/template-styles.css"

interface TemplateLayoutProps {
  data: PortfolioData
}

// 极致简约风格布局 - "少即是多"设计理念
export const MinimalLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 简约导航 */}
      <nav className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-gray-900">
              {personalInfo.name || "Portfolio"}
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <span>关于</span>
              <span>作品</span>
              <span>联系</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-4xl mx-auto px-6">
        {/* 个人简介区域 - 极致简约 */}
        <section className="py-32">
          <div className="text-center space-y-12">
            {/* 头像区域 */}
            {personalInfo.profilePhoto && (
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
                  <Image
                    src={personalInfo.profilePhoto}
                    alt={personalInfo.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* 姓名标题 - 超大字体 */}
            <div>
              <h1 className="text-6xl font-light text-gray-900 mb-4 tracking-tight">
                {personalInfo.name || "您的姓名"}
              </h1>
              <p className="text-xl text-gray-600">
                {personalInfo.jobTitle || "您的职位"}
              </p>
            </div>
            
            {/* 个人简介 - 纯粹文案 */}
            {personalInfo.bio && (
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            )}
            
            {/* 简约分隔线 */}
            <div className="w-24 h-px bg-gray-200 mx-auto"></div>
          </div>
        </section>

        {/* 技能区域 - 极简展示 */}
        {skills.length > 0 && (
          <section className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">技能</h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-4 py-2 text-gray-700 border border-gray-200 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 项目区域 - 极简列表 */}
        {projects.length > 0 && (
          <section className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">项目</h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>
            
            <div className="space-y-16 max-w-3xl mx-auto">
              {projects.map((project) => (
                <div key={project.id} className="space-y-6">
                  {/* 项目标题和描述 */}
                  <div>
                    <h3 className="text-2xl font-normal text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* 项目图片 */}
                  {project.image && (
                    <div className="border border-gray-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  {/* 项目链接 */}
                  {project.link && (
                    <div>
                      <a 
                        href={project.link} 
                        className="text-gray-600 hover:text-gray-900 text-sm underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        查看项目 →
                      </a>
                    </div>
                  )}
                  
                  {/* 项目分隔线 */}
                  <div className="w-full h-px bg-gray-100"></div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 联系区域 - 极简联系方式 */}
        <section className="py-24">
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-4">联系</h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-gray-600 mb-8">如有合作意向，欢迎联系</p>
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <span>邮箱: example@email.com</span>
              <span>电话: +86 138 0000 0000</span>
            </div>
          </div>
        </section>
      </main>
      
      {/* 简约页脚 */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 {personalInfo.name || "Portfolio"}. 简约设计 · 专注内容
          </p>
        </div>
      </footer>
    </div>
  )
}

// 暗色模式布局 - 现代、精致且护眼
export const DarkModeLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans transition-all duration-300">
      {/* 简约导航栏 */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-100">
              {personalInfo.name || "Portfolio"}
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <span className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">关于</span>
              <span className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">作品</span>
              <span className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">联系</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* 个人简介区域 */}
        <section className="py-24 text-center">
          <div className="space-y-8">
            {/* 头像区域 */}
            {personalInfo.profilePhoto && (
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl">
                  <Image
                    src={personalInfo.profilePhoto}
                    alt={personalInfo.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* 姓名和职位 */}
            <div>
              <h1 className="text-5xl font-bold text-gray-100 mb-4 tracking-tight">
                {personalInfo.name || "您的姓名"}
              </h1>
              <p className="text-xl text-gray-400">
                {personalInfo.jobTitle || "您的职位"}
              </p>
            </div>
            
            {/* 个人简介 */}
            {personalInfo.bio && (
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            )}
            
            {/* 简约分隔线 */}
            <div className="w-24 h-px bg-gray-700 mx-auto"></div>
            
            {/* 联系按钮 */}
            <div className="flex justify-center gap-6">
              <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                联系我
              </button>
              <button className="px-8 py-3 border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 rounded-lg font-medium transition-all duration-300">
                查看作品
              </button>
            </div>
          </div>
        </section>

        {/* 技能区域 - 卡片式布局 */}
        {skills.length > 0 && (
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">技能专长</h2>
              <div className="w-16 h-px bg-cyan-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={skill}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-gray-700 hover:border-cyan-400/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-100">{skill}</h3>
                      <p className="text-sm text-gray-400 mt-1">熟练程度</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 项目区域 - 分块式布局 */}
        {projects.length > 0 && (
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">项目作品</h2>
              <div className="w-16 h-px bg-green-500 mx-auto"></div>
            </div>
            
            <div className="space-y-12">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:border-green-400/30 transition-all duration-300">
                  {/* 项目图片 */}
                  {project.image && (
                    <div className="relative h-64 bg-gray-900 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* 项目内容 */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">{project.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{project.description}</p>
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          查看项目
                        </a>
                      )}
                    </div>
                    
                    {/* 技术栈标签 */}
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind", "Next.js"].slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-gray-700 text-cyan-400 text-sm rounded-full border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 联系区域 */}
        <section className="py-20 text-center">
          <div className="bg-gray-800 rounded-2xl p-12 shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">联系合作</h2>
            <div className="w-16 h-px bg-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              如有合作意向或项目需求，欢迎随时联系我
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white">✉️</span>
                </div>
                <span>example@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white">📱</span>
                </div>
                <span>+86 138 0000 0000</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className="border-t border-gray-800 py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 {personalInfo.name || "Portfolio"}. 暗色主题 · 现代设计
          </p>
        </div>
      </footer>
    </div>
  )
}

// 创意风格布局 - 打破常规，展示个性
export const CreativeLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 font-sans overflow-hidden">
      {/* 创意导航栏 - 非对称布局 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {personalInfo.name || "Portfolio"}
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <span className="text-gray-700 hover:text-purple-600 transition-colors duration-300 cursor-pointer">关于</span>
              <span className="text-gray-700 hover:text-pink-600 transition-colors duration-300 cursor-pointer">作品</span>
              <span className="text-gray-700 hover:text-orange-600 transition-colors duration-300 cursor-pointer">联系</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 - 非对称网格布局 */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* 个人简介区域 - 创意布局 */}
        <section className="py-24 relative">
          {/* 背景装饰元素 */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-20 blur-xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
            {/* 左侧内容 - 占据3列 */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {personalInfo.name || "您的姓名"}
                </h1>
                <p className="text-2xl text-gray-600 font-light">
                  {personalInfo.jobTitle || "您的职位"}
                </p>
              </div>
              
              {personalInfo.bio && (
                <div className="max-w-2xl">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>
              )}
              
              {/* 创意按钮组 */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  查看作品
                </button>
                <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium transition-all duration-300 hover:bg-purple-600 hover:text-white">
                  联系合作
                </button>
              </div>
            </div>
            
            {/* 右侧装饰 - 占据2列 */}
            <div className="lg:col-span-2 flex items-center justify-center">
              {personalInfo.profilePhoto ? (
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl transform rotate-6"></div>
                  <div className="absolute inset-0 w-48 h-48 bg-white rounded-2xl overflow-hidden border-8 border-white transform -rotate-3 shadow-2xl">
                    <Image
                      src={personalInfo.profilePhoto}
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center transform rotate-6 shadow-2xl">
                  <span className="text-white text-4xl font-bold">✨</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 技能区域 - 网格重叠效果 */}
        {skills.length > 0 && (
          <section className="py-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">技能专长</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
              {skills.map((skill, index) => (
                <div 
                  key={skill}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-500 transform-gpu"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                  }}
                >
                  <div className="text-center space-y-3">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold ${
                      index % 4 === 0 ? 'bg-purple-100 text-purple-600' :
                      index % 4 === 1 ? 'bg-pink-100 text-pink-600' :
                      index % 4 === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {skill.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-gray-900">{skill}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          index % 4 === 0 ? 'bg-purple-500' :
                          index % 4 === 1 ? 'bg-pink-500' :
                          index % 4 === 2 ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, 70 + index * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 项目区域 - 不规则网格布局 */}
        {projects.length > 0 && (
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">创意项目</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 transform-gpu group"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? 0.5 : -0.5}deg)`,
                  }}
                >
                  {/* 项目图片 */}
                  {project.image && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-600 rounded-full text-sm font-medium">
                          新项目
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* 项目内容 */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    
                    {/* 技术栈标签 - 创意排列 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["React", "创意设计", "UI/UX", "动画"].map((tech, techIndex) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: techIndex % 3 === 0 ? '#f3e8ff' : 
                                            techIndex % 3 === 1 ? '#ffe4e6' : '#ffedd5',
                            color: techIndex % 3 === 0 ? '#7c3aed' : 
                                   techIndex % 3 === 1 ? '#ec4899' : '#f59e0b',
                            transform: `rotate(${techIndex % 2 === 0 ? 1 : -1}deg)`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* 项目链接 */}
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        查看详情
                        <span className="text-lg">→</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 联系区域 - 创意布局 */}
        <section className="py-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">创意合作</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full mb-8"></div>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              让我们一起创造令人惊叹的作品
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✉️</span>
                </div>
                <span>hello@creative.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📱</span>
                </div>
                <span>+86 138 0000 0000</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 创意页脚 */}
      <footer className="border-t border-white/20 py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2024 {personalInfo.name || "Portfolio"}. 创意无限 · 个性展示
          </p>
        </div>
      </footer>
    </div>
  )
}

// 专业风格布局 - 可靠、可信、严谨
export const ProfessionalLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 专业导航栏 */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-serif font-semibold text-gray-900">
              {personalInfo.name || "Portfolio"}
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <span className="hover:text-blue-700 transition-colors duration-200 cursor-pointer">首页</span>
              <span className="hover:text-blue-700 transition-colors duration-200 cursor-pointer">经历</span>
              <span className="hover:text-blue-700 transition-colors duration-200 cursor-pointer">联系</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 - 经典左右分栏布局 */}
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* 左侧栏 - 个人信息和技能 */}
          <div className="lg:col-span-1 bg-blue-900 text-white p-8">
            {/* 个人信息 */}
            <div className="text-center mb-8">
              {personalInfo.profilePhoto && (
                <div className="w-32 h-32 bg-white rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-700">
                  <Image
                    src={personalInfo.profilePhoto}
                    alt={personalInfo.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-2xl font-serif font-bold mb-2">{personalInfo.name || "您的姓名"}</h1>
              <p className="text-blue-200 text-sm">{personalInfo.jobTitle || "您的职位"}</p>
            </div>
            
            {/* 联系信息 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
                  <span className="text-xs">✉️</span>
                </div>
                <span>contact@professional.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </div>
                <span>+86 138 0000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </div>
                <span>北京市朝阳区</span>
              </div>
            </div>
            
            {/* 技能专长 */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif font-semibold text-lg mb-4 border-b border-blue-700 pb-2">技能专长</h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm text-blue-200">{skill}</span>
                      <div className="w-16 bg-blue-700 rounded-full h-2">
                        <div className="h-2 bg-white rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 语言能力 */}
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4 border-b border-blue-700 pb-2">语言能力</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">中文</span>
                  <span className="text-xs text-blue-300">母语</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">英语</span>
                  <span className="text-xs text-blue-300">流利</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧栏 - 工作经历和项目 */}
          <div className="lg:col-span-3 p-8">
            {/* 个人简介 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">个人简介</h2>
              {personalInfo.bio ? (
                <p className="text-gray-700 leading-relaxed">{personalInfo.bio}</p>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  资深专业人士，拥有丰富的行业经验和卓越的专业能力。致力于为客户提供高质量的服务和解决方案。
                </p>
              )}
            </section>
            
            {/* 工作经历 - 时间线形式 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">工作经历</h2>
              <div className="space-y-8">
                {/* 示例工作经历 */}
                <div className="border-l-2 border-blue-600 pl-6 relative">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-semibold text-gray-900">高级项目经理</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2020 - 至今</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">某知名科技公司</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    负责大型项目的规划、执行和交付，带领跨职能团队完成复杂的技术项目。
                  </p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-6 relative">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-semibold text-gray-900">项目顾问</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2018 - 2020</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">国际咨询公司</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    为多家 Fortune 500 企业提供战略咨询和数字化转型服务。
                  </p>
                </div>
              </div>
            </section>
            
            {/* 教育背景 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">教育背景</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900">工商管理硕士</h3>
                    <p className="text-blue-600 font-medium">清华大学经济管理学院</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2016 - 2018</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900">计算机科学学士</h3>
                    <p className="text-blue-600 font-medium">北京大学</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2012 - 2016</span>
                </div>
              </div>
            </section>
            
            {/* 项目作品 */}
            {projects.length > 0 && (
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">项目作品</h2>
                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-serif text-xl font-semibold text-gray-900">{project.title}</h3>
                        {project.link && (
                          <a 
                            href={project.link} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            查看详情 →
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                      
                      {/* 技术栈 */}
                      <div className="flex flex-wrap gap-2">
                        {["战略规划", "项目管理", "团队领导", "客户关系"].map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      
      {/* 专业页脚 */}
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 {personalInfo.name || "Portfolio"}. 专业严谨 · 值得信赖
          </p>
        </div>
      </footer>
    </div>
  )
}

// 开发者风格布局 - "由开发者，为开发者"
export const DeveloperLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      {/* IDE风格的导航栏 */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* IDE标签页样式 */}
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-gray-900 text-blue-400 rounded-t border-b-2 border-blue-400">
                  index.tsx
                </div>
                <div className="px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer">
                  portfolio.ts
                </div>
                <div className="px-4 py-2 text-gray-500 hover:text-gray-300 cursor-pointer">
                  skills.json
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="hover:text-green-400 transition-colors cursor-pointer">about()</span>
              <span className="hover:text-yellow-400 transition-colors cursor-pointer">projects()</span>
              <span className="hover:text-purple-400 transition-colors cursor-pointer">contact()</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 - 模仿代码编辑器 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 代码编辑器风格的头部 */}
        <div className="bg-gray-800 rounded-lg mb-8 overflow-hidden">
          {/* 编辑器标题栏 */}
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-300">portfolio.tsx - {personalInfo.name || "Developer"}</span>
            </div>
            <div className="text-xs text-gray-500">TypeScript React</div>
          </div>
          
          {/* 代码内容区域 */}
          <div className="p-6">
            {/* 导入语句 */}
            <div className="mb-6">
              <span className="text-purple-400">import</span>
              <span className="text-gray-300"> </span>
              <span className="text-blue-400">React</span>
              <span className="text-gray-300"> </span>
              <span className="text-purple-400">from</span>
              <span className="text-gray-300"> </span>
              <span className="text-green-400">'react'</span>
              <span className="text-gray-300">;</span>
            </div>
            
            {/* 组件定义 */}
            <div className="mb-4">
              <span className="text-purple-400">const</span>
              <span className="text-gray-300"> </span>
              <span className="text-yellow-300">Portfolio</span>
              <span className="text-gray-300">: </span>
              <span className="text-blue-400">React</span>
              <span className="text-gray-300">.</span>
              <span className="text-blue-400">FC</span>
              <span className="text-gray-300"> = </span>
              <span className="text-purple-400">()</span>
              <span className="text-gray-300"> </span>
              <span className="text-purple-400">=&gt;</span>
              <span className="text-gray-300"> </span>
              <span className="text-purple-400">{'{'}</span>
            </div>
            
            {/* 返回语句 */}
            <div className="ml-4 mb-4">
              <span className="text-purple-400">return</span>
              <span className="text-gray-300"> </span>
              <span className="text-purple-400">(</span>
            </div>
            
            {/* JSX内容 */}
            <div className="ml-8 space-y-4">
              {/* 个人简介注释 */}
              <div>
                <span className="text-gray-500">// </span>
                <span className="text-gray-500">个人简介</span>
              </div>
              
              {/* 姓名展示 */}
              <div>
                <span className="text-blue-400">&lt;h1</span>
                <span className="text-gray-300"> </span>
                <span className="text-green-400">className</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"text-4xl font-bold"</span>
                <span className="text-blue-400">&gt;</span>
                <span className="text-gray-300">{personalInfo.name || "Developer Name"}</span>
                <span className="text-blue-400">&lt;/h1&gt;</span>
              </div>
              
              {/* 职位展示 */}
              <div>
                <span className="text-blue-400">&lt;p</span>
                <span className="text-gray-300"> </span>
                <span className="text-green-400">className</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"text-xl text-blue-400"</span>
                <span className="text-blue-400">&gt;</span>
                <span className="text-gray-300">{personalInfo.jobTitle || "Full Stack Developer"}</span>
                <span className="text-blue-400">&lt;/p&gt;</span>
              </div>
              
              {/* 个人简介 */}
              {personalInfo.bio && (
                <div>
                  <span className="text-blue-400">&lt;p</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-green-400">className</span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">"text-gray-300 mt-4"</span>
                  <span className="text-blue-400">&gt;</span>
                  <span className="text-gray-300">{personalInfo.bio}</span>
                  <span className="text-blue-400">&lt;/p&gt;</span>
                </div>
              )}
            </div>
            
            <div className="ml-4">
              <span className="text-purple-400">)</span>
              <span className="text-gray-300">;</span>
            </div>
            <div>
              <span className="text-purple-400">{'}'}</span>
              <span className="text-gray-300">;</span>
            </div>
            
            <div className="mt-4 text-gray-500 text-sm">
              <span>// </span>
              <span>export default Portfolio;</span>
            </div>
          </div>
        </div>

        {/* 技能展示区域 - 代码标签样式 */}
        {skills.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-400 text-lg">//</span>
              <h2 className="text-2xl font-bold text-gray-100">技术栈</h2>
              <span className="text-gray-500 text-sm">skills.json</span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <span className="text-purple-400">{'{'}</span>
                <span className="text-gray-300"> </span>
                <span className="text-green-400">"skills"</span>
                <span className="text-gray-300">: </span>
                <span className="text-purple-400">[</span>
              </div>
              
              <div className="ml-4 space-y-2">
                {skills.map((skill, index) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="text-green-400">"</span>
                    <span 
                      className={`${
                        index % 4 === 0 ? 'text-blue-400' :
                        index % 4 === 1 ? 'text-yellow-400' :
                        index % 4 === 2 ? 'text-purple-400' : 'text-cyan-400'
                      } font-medium`}
                    >
                      {skill}
                    </span>
                    <span className="text-green-400">"</span>
                    {index < skills.length - 1 && <span className="text-gray-300">,</span>}
                  </div>
                ))}
              </div>
              
              <div>
                <span className="text-purple-400">]</span>
              </div>
              <div>
                <span className="text-purple-400">{'}'}</span>
              </div>
            </div>
          </section>
        )}

        {/* 项目展示区域 - GitHub风格 */}
        {projects.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-yellow-400 text-lg">//</span>
              <h2 className="text-2xl font-bold text-gray-100">项目作品</h2>
              <span className="text-gray-500 text-sm">projects.ts</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                  {/* 项目头部 - GitHub仓库样式 */}
                  <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-semibold">{project.title}</span>
                      <span className="text-gray-500 text-sm">public</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  </div>
                  
                  {/* 项目内容 */}
                  <div className="p-4">
                    {/* 技术栈标签 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["TypeScript", "React", "Node.js", "Tailwind"].slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs rounded border ${
                            techIndex === 0 ? 'bg-blue-900/30 text-blue-400 border-blue-700' :
                            techIndex === 1 ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700' :
                            'bg-green-900/30 text-green-400 border-green-700'
                          }"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* 项目链接 */}
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>🔗</span>
                        <span>查看代码</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* 联系区域 - 终端命令样式 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-400 text-lg">$</span>
            <h2 className="text-2xl font-bold text-gray-100">联系我</h2>
            <span className="text-gray-500 text-sm">terminal</span>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">email</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"</span>
                <span className="text-cyan-400">hello@developer.com</span>
                <span className="text-green-400">"</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">phone</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"</span>
                <span className="text-cyan-400">+86 138 0000 0000</span>
                <span className="text-green-400">"</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">github</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"</span>
                <span className="text-cyan-400">github.com/username</span>
                <span className="text-green-400">"</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-gray-300">npm run contact</span>
                </div>
                <div className="text-green-400 ml-4 mt-1">
                  &gt; 正在建立连接...
                </div>
                <div className="text-blue-400 ml-4">
                  &gt; 连接成功！随时可以开始合作
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 开发者页脚 */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 {personalInfo.name || "Developer"}. Built with 💻 and ☕
          </p>
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 设计师风格布局 - 视觉驱动，美学至上
export const DesignerLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { personalInfo, skills, projects, theme } = data
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
      {/* 简约设计导航栏 */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {personalInfo.name || "Design Portfolio"}
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-600">
              <span className="hover:text-pink-600 transition-colors duration-300 cursor-pointer">Work</span>
              <span className="hover:text-purple-600 transition-colors duration-300 cursor-pointer">About</span>
              <span className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 个人简介区域 - 简约优雅 */}
        <section className="text-center py-20 mb-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* 头像区域 */}
            {personalInfo.profilePhoto && (
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <Image
                    src={personalInfo.profilePhoto}
                    alt={personalInfo.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* 姓名和职位 */}
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-none">
                {personalInfo.name || "Your Name"}
              </h1>
              <p className="text-2xl text-gray-600 font-light">
                {personalInfo.jobTitle || "UI/UX Designer & Creative Director"}
              </p>
            </div>
            
            {/* 个人简介 */}
            {personalInfo.bio && (
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
            )}
            
            {/* 设计理念标签 */}
            <div className="flex justify-center gap-4">
              {["Minimalism", "User-Centered", "Innovation", "Detail-Oriented"].map((concept) => (
                <span 
                  key={concept}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-pink-300 transition-colors duration-300"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 技能专长区域 - 视觉化展示 */}
        {skills.length > 0 && (
          <section className="py-16 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Expertise</h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div 
                  key={skill}
                  className="text-center group cursor-pointer"
                >
                  {/* 技能图标 */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 transform-gpu ${
                    index % 6 === 0 ? 'bg-pink-100' :
                    index % 6 === 1 ? 'bg-purple-100' :
                    index % 6 === 2 ? 'bg-blue-100' :
                    index % 6 === 3 ? 'bg-green-100' :
                    index % 6 === 4 ? 'bg-orange-100' : 'bg-yellow-100'
                  }"
                  >
                    <span className={`text-2xl ${
                      index % 6 === 0 ? 'text-pink-600' :
                      index % 6 === 1 ? 'text-purple-600' :
                      index % 6 === 2 ? 'text-blue-600' :
                      index % 6 === 3 ? 'text-green-600' :
                      index % 6 === 4 ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {skill.includes('UI') ? '🎨' : 
                       skill.includes('UX') ? '🧠' : 
                       skill.includes('Web') ? '🌐' : 
                       skill.includes('Mobile') ? '📱' : 
                       skill.includes('Brand') ? '🏷️' : '✨'}
                    </span>
                  </div>
                  
                  {/* 技能名称 */}
                  <h3 className="font-semibold text-gray-900 mb-2">{skill}</h3>
                  
                  {/* 技能进度条 */}
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        index % 6 === 0 ? 'bg-pink-500' :
                        index % 6 === 1 ? 'bg-purple-500' :
                        index % 6 === 2 ? 'bg-blue-500' :
                        index % 6 === 3 ? 'bg-green-500' :
                        index % 6 === 4 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(100, 80 + index * 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 项目作品区域 - 瀑布流网格布局 */}
        {projects.length > 0 && (
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A curated selection of design work that showcases creativity and attention to detail
              </p>
            </div>
            
            {/* 瀑布流网格布局 */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="break-inside-avoid group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu"
                >
                  {/* 项目图片 */}
                  {project.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* 悬停遮罩层 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-200 text-sm leading-relaxed">{project.description}</p>
                          
                          {/* 项目标签 */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {["UI Design", "UX Research", "Branding"].slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* 查看按钮 */}
                          {project.link && (
                            <a 
                              href={project.link} 
                              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Project
                              <span className="text-lg">→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 项目信息（悬停时隐藏） */}
                  <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                    
                    {/* 项目类型标签 */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Mobile App", "Web Design", "Brand Identity"].slice(0, 2).map((type) => (
                        <span 
                          key={type}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 加载更多指示器 */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:text-gray-900 transition-all duration-300">
                Load More Work
              </button>
            </div>
          </section>
        )}
        
        {/* 联系区域 - 简约优雅 */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Let's Create Something Amazing</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ready to bring your ideas to life? Let's collaborate on your next design project.
            </p>
            
            {/* 联系信息网格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-pink-600 text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm">hello@designer.com</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 text-xl">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-sm">+86 138 0000 0000</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Portfolio</h3>
                  <p className="text-gray-600 text-sm">behance.net/designer</p>
                </div>
              </div>
            </div>
            
            {/* 联系按钮 */}
            <div className="mt-8">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start a Project
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* 设计师页脚 */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2024 {personalInfo.name || "Design Portfolio"}. Crafted with attention to detail
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
            <span>UI/UX Design</span>
            <span>•</span>
            <span>Brand Identity</span>
            <span>•</span>
            <span>Creative Direction</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 模板选择器
export const TemplateLayout: React.FC<TemplateLayoutProps> = ({ data }) => {
  const { theme } = data

  switch (theme.template) {
    case "minimal":
      return <MinimalLayout data={data} />
    case "dark-mode":
      return <DarkModeLayout data={data} />
    case "creative":
      return <CreativeLayout data={data} />
    case "professional":
      return <ProfessionalLayout data={data} />
    case "developer":
      return <DeveloperLayout data={data} />
    case "designer":
      return <DesignerLayout data={data} />
    default:
      return <MinimalLayout data={data} />
  }
}