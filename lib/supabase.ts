import { createClient } from '@supabase/supabase-js'

// 单例模式防止重复创建Supabase客户端
let supabaseInstance: ReturnType<typeof createClient> | null = null

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mxummcxogzsptqxsgrlm.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dW1tY3hvZ3pzcHRxeHNncmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTExNzUsImV4cCI6MjA3NjgyNzE3NX0.ImtnGwdbqn0VewURz1b0hrdigbQyZw3gb9lcboZIKI0'
  
  // 检查是否有现有的会话，如果有则启用持久化，否则禁用
  const hasExistingSession = typeof window !== 'undefined' && 
    (localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token'));
  
  // 每次都重新创建客户端以确保会话设置正确
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true, // 始终启用会话持久化
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? {
        getItem: (key: string) => window.localStorage.getItem(key),
        setItem: (key: string, value: string) => window.localStorage.setItem(key, value),
        removeItem: (key: string) => window.localStorage.removeItem(key),
      } : undefined
    }
  })
  
  return supabaseInstance
}

export const supabase = createSupabaseClient()

// 登录成功后启用会话持久化的函数
export const enableSessionPersistence = () => {
  if (supabaseInstance) {
    // 重新创建客户端以启用持久化
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mxummcxogzsptqxsgrlm.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dW1tY3hvZ3pzcHRxeHNncmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTExNzUsImV4cCI6MjA3NjgyNzE3NX0.ImtnGwdbqn0VewURz1b0hrdigbQyZw3gb9lcboZIKI0'
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true, // 启用会话持久化
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }
}

// 作品集数据表操作
export const portfolioService = {
  // 保存作品集到Supabase
  async savePortfolio(data: any, userId?: string, portfolioId?: string) {
    try {
      const portfolioData = {
        id: portfolioId || undefined, // 如果提供了ID，则更新现有记录
        user_id: userId || 'anonymous',
        portfolio_data: data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data: result, error } = await supabase
        .from('portfolios')
        .upsert(portfolioData)
        .select()

      if (error) throw error
      return result
    } catch (error) {
      console.error('保存作品集失败:', error)
      throw error
    }
  },

  // 从Supabase加载作品集
  async loadPortfolio(userId?: string) {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('user_id', userId || 'anonymous')
        .maybeSingle() // 使用maybeSingle而不是single，避免找不到记录时抛出错误

      if (error && error.code !== 'PGRST116') {
        console.error('加载作品集API错误:', error)
        throw error
      }
      return data?.portfolio_data || null
    } catch (error) {
      console.error('加载作品集失败:', error)
      return null
    }
  },

  // 获取用户的所有作品集
  async getUserPortfolios(userId: string) {
    try {
      console.log('正在获取用户作品集，用户ID:', userId)
      
      // 首先检查表是否存在
      const { data: tableCheck, error: tableError } = await supabase
        .from('portfolios')
        .select('id')
        .limit(1)

      if (tableError) {
        console.error('检查表是否存在时出错:', tableError)
        console.log('提示: portfolios表可能不存在，需要先执行数据库迁移')
        // 如果表不存在，返回空数组而不是抛出错误
        return []
      }
      
      console.log('表检查通过，开始查询用户数据')
      
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Supabase查询错误详情:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        // 如果是表不存在错误，返回空数组
        if (error.code === '42P01') { // 表不存在错误代码
          console.log('portfolios表不存在，请先执行数据库迁移')
          return []
        }
        throw error
      }
      
      console.log('获取到的作品集数据:', data)
      return data || []
    } catch (error) {
      console.error('获取用户作品集失败详情:', error)
      // 返回空数组而不是抛出错误，避免界面崩溃
      return []
    }
  },

  // 删除作品集
  async deletePortfolio(portfolioId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', portfolioId)
        .eq('user_id', userId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('删除作品集失败:', error)
      throw error
    }
  }
}

// 文件上传服务
export const fileUploadService = {
  // 上传图片到Supabase Storage
  async uploadImage(file: File, bucketName = 'portfolio-images') {
    try {
      const fileName = `${Date.now()}-${file.name}`
      
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file)

      if (error) throw error

      // 获取公开URL
      const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('图片上传失败:', error)
      throw error
    }
  },

  // 删除图片
  async deleteImage(filePath: string, bucketName = 'portfolio-images') {
    try {
      const { error } = await supabase
        .storage
        .from(bucketName)
        .remove([filePath])

      if (error) throw error
    } catch (error) {
      console.error('图片删除失败:', error)
      throw error
    }
  }
}