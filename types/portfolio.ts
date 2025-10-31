// 模板类型定义
export type TemplateType = "minimal" | "dark-mode" | "creative" | "professional" | "developer" | "designer"

export interface PortfolioData {
  personalInfo: {
    name: string
    jobTitle: string
    bio: string
    profilePhoto: string
  }
  skills: string[]
  projects: Array<{
    id: string
    title: string
    description: string
    link: string
    image: string
  }>
  theme: {
    template: TemplateType
    colorScheme: "blue" | "purple" | "dark"
  }
}

// 模板配置接口
export interface TemplateConfig {
  id: TemplateType
  name: string
  description: string
  layout: "simple" | "modern" | "grid" | "split" | "card" | "showcase"
  features: string[]
  recommendedFor: string[]
}
