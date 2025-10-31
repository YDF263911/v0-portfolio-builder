import { supabase } from './supabase';

export const authService = {
  // 用户注册
  signUp: async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  // 用户登录
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    // 登录成功后启用会话持久化
    if (data.session) {
      // 重新创建Supabase客户端以启用持久化
      const { enableSessionPersistence } = await import('./supabase');
      enableSessionPersistence();
    }
    
    return data;
  },

  // 用户登出
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 获取当前用户
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // 监听认证状态变化
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // 启用会话持久化
  enablePersistence: async () => {
    // 重新创建Supabase客户端以启用持久化
    const { enableSessionPersistence } = await import('./supabase');
    enableSessionPersistence();
  },

  // 获取会话信息
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // 重置密码
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  },

  // 更新密码
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return data;
  },

  // 获取用户信息（包含元数据）
  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};

export { supabase };