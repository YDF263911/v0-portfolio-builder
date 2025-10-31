// 清除Supabase会话数据的脚本
// 在重新运行项目前执行此脚本

if (typeof window !== 'undefined') {
  // 清除所有Supabase相关的存储数据
  localStorage.removeItem('supabase.auth.token');
  sessionStorage.removeItem('supabase.auth.token');
  
  // 清除其他可能的存储项
  Object.keys(localStorage).forEach(key => {
    if (key.includes('supabase') || key.includes('auth')) {
      localStorage.removeItem(key);
    }
  });
  
  Object.keys(sessionStorage).forEach(key => {
    if (key.includes('supabase') || key.includes('auth')) {
      sessionStorage.removeItem(key);
    }
  });
  
  console.log('Supabase会话数据已清除');
  console.log('重新运行项目后需要重新登录');
}