import { z } from "zod"

export const portfolioSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "姓名不能为空").max(50, "姓名不能超过50个字符"),
    jobTitle: z.string().min(1, "职位不能为空").max(100, "职位不能超过100个字符"),
    bio: z.string().max(500, "个人简介不能超过500个字符").optional(),
    profilePhoto: z.string().optional(),
  }),
  skills: z.array(z.string().min(1, "技能不能为空")).max(20, "最多只能添加20个技能"),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "项目标题不能为空").max(100, "项目标题不能超过100个字符"),
      description: z.string().min(1, "项目描述不能为空").max(500, "项目描述不能超过500个字符"),
      link: z.string().url("请输入有效的URL").optional(),
      image: z.string().optional(),
    })
  ).max(10, "最多只能添加10个项目"),
  theme: z.object({
    template: z.string(),
    colorScheme: z.enum(["blue", "purple", "dark"]),
  }),
})

export type PortfolioValidation = z.infer<typeof portfolioSchema>

export const validatePortfolio = (data: any) => {
  try {
    portfolioSchema.parse(data)
    return { success: true, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        const path = err.path.join(".")
        acc[path] = err.message
        return acc
      }, {} as Record<string, string>)
      return { success: false, errors }
    }
    return { success: false, errors: { general: "验证失败" } }
  }
}