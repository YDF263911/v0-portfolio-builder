import type { PortfolioData } from "@/types/portfolio"
import { portfolioService, fileUploadService } from "./supabase"

const STORAGE_KEY = 'portfolioData'

export const portfolioStorage = {
  // 保存作品集数据（支持多用户数据隔离）
  async save(data: PortfolioData, userId?: string): Promise<void> {
    try {
      // 优先尝试保存到Supabase
      await portfolioService.savePortfolio(data, userId)
      console.log('作品集已保存到云端')
      
      // 同时保存到本地存储（作为备份）
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      
      // 如果用户已登录，也保存用户特定的数据
      if (userId && userId !== 'anonymous') {
        localStorage.setItem(`portfolioData_${userId}`, JSON.stringify(data))
      }
    } catch (error) {
      console.warn('云端保存失败，使用本地存储:', error)
      // 降级到本地存储
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      if (userId && userId !== 'anonymous') {
        localStorage.setItem(`portfolioData_${userId}`, JSON.stringify(data))
      }
    }
  },

  // 加载作品集数据（支持多用户数据隔离）
  async load(userId?: string): Promise<PortfolioData | null> {
    try {
      // 优先从Supabase加载
      const cloudData = await portfolioService.loadPortfolio(userId)
      if (cloudData) {
        console.log('从云端加载作品集')
        return cloudData
      }
    } catch (error) {
      console.warn('云端加载失败，尝试本地存储:', error)
    }

    // 尝试从用户特定的本地存储加载
    if (userId && userId !== 'anonymous') {
      const userLocalData = localStorage.getItem(`portfolioData_${userId}`)
      if (userLocalData) {
        try {
          return JSON.parse(userLocalData)
        } catch (error) {
          console.error('用户本地存储数据解析失败:', error)
        }
      }
    }

    // 降级到通用本地存储
    const localData = localStorage.getItem(STORAGE_KEY)
    if (localData) {
      try {
        return JSON.parse(localData)
      } catch (error) {
        console.error('本地存储数据解析失败:', error)
      }
    }

    return null
  },

  // 获取用户的所有作品集
  async getUserPortfolios(userId: string): Promise<any[]> {
    try {
      return await portfolioService.getUserPortfolios(userId)
    } catch (error) {
      console.error('获取用户作品集失败:', error)
      return []
    }
  },

  // 删除作品集
  async deletePortfolio(portfolioId: string, userId: string): Promise<void> {
    try {
      // 这里需要实现删除逻辑
      // 暂时返回成功
      console.log(`删除作品集: ${portfolioId} (用户: ${userId})`)
    } catch (error) {
      console.error('删除作品集失败:', error)
      throw error
    }
  },

  // 清除存储的数据
  clear(userId?: string): void {
    localStorage.removeItem(STORAGE_KEY)
    if (userId && userId !== 'anonymous') {
      localStorage.removeItem(`portfolioData_${userId}`)
    }
    // 注意：这里不清除云端数据，因为可能有多个用户使用
  },

  // 检查是否有保存的数据
  hasSavedData(userId?: string): Promise<boolean> {
    return this.load(userId).then(data => data !== null)
  },

  // 导出数据到文件
  exportToFile(data: PortfolioData, filename: string = 'portfolio.json'): void {
    try {
      const jsonContent = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      
      // 添加事件监听器确保下载完成后再清理URL
      const cleanup = () => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
      
      // 使用setTimeout确保浏览器有时间处理下载
      link.click()
      setTimeout(cleanup, 1000)
    } catch (error) {
      console.error('导出文件失败:', error)
      throw new Error('导出失败，请重试')
    }
  },

  // 从文件导入数据
  importFromFile(file: File): Promise<PortfolioData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const data = JSON.parse(content)
          
          // 验证数据格式
          if (!data.personalInfo || !data.skills || !data.projects || !data.theme) {
            throw new Error('无效的作品集数据格式')
          }
          
          resolve(data)
        } catch (error) {
          reject(new Error('文件解析失败，请确保文件格式正确'))
        }
      }
      reader.onerror = () => reject(new Error('文件读取失败'))
      reader.readAsText(file)
    })
  }
}

// 图片上传工具
export const imageUploader = {
  // 上传图片并返回URL
  async upload(file: File): Promise<string> {
    try {
      // 尝试上传到Supabase Storage
      const url = await fileUploadService.uploadImage(file)
      return url
    } catch (error) {
      console.warn('云端图片上传失败，使用本地URL:', error)
      // 降级到本地URL
      return URL.createObjectURL(file)
    }
  },

  // 清理本地URL（避免内存泄漏）
  revokeLocalUrl(url: string): void {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  }
}