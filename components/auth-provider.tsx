'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '@/lib/auth'

interface User {
  id: string
  email: string
  user_metadata?: {
    name?: string
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  error: null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    // 获取初始用户状态
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        // 只有当用户有有效的email时才认为是已登录状态
        // 避免匿名用户或无效用户被识别为已登录
        const isValidUser = user && user.email && user.email !== 'anonymous'
        
        // 如果有有效用户，确保会话持久化已启用
        if (isValidUser) {
          try {
            await authService.enablePersistence()
          } catch (error) {
            console.warn('启用会话持久化失败:', error)
          }
        }
        
        setAuthState({
          user: isValidUser ? (user as User) : null,
          isLoading: false,
          error: null
        })
      } catch (error) {
        console.error('初始化认证状态失败:', error)
        setAuthState({
          user: null,
          isLoading: false,
          error: '初始化认证状态失败'
        })
      }
    }

    initializeAuth()

    // 监听认证状态变化
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session && session.user) {
          // 验证用户信息有效性
          const isValidUser = session.user.email && session.user.email !== 'anonymous'
          
          // 登录成功后启用会话持久化
          if (isValidUser) {
            try {
              await authService.enablePersistence()
            } catch (error) {
              console.warn('启用会话持久化失败:', error)
            }
          }
          
          setAuthState({
            user: isValidUser ? (session.user as User) : null,
            isLoading: false,
            error: null
          })
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isLoading: false,
            error: null
          })
        } else if (event === 'TOKEN_REFRESHED') {
          // 令牌刷新时重新检查用户状态
          try {
            const user = await authService.getCurrentUser()
            const isValidUser = user && user.email && user.email !== 'anonymous'
            setAuthState({
              user: isValidUser ? (user as User) : null,
              isLoading: false,
              error: null
            })
          } catch (error) {
            console.error('令牌刷新后获取用户失败:', error)
          }
        }
      }
    )

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}