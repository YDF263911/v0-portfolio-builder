# 会话管理说明

## 新的会话管理逻辑

### 设计目标
- **重新运行项目后需要重新登录** - 确保每次重新启动项目时用户需要重新认证
- **登录成功后刷新页面保持登录状态** - 提供良好的用户体验

### 实现机制

#### 1. 初始会话检查
```javascript
// 检查是否有现有的会话
const hasExistingSession = typeof window !== 'undefined' && 
  (localStorage.getItem('supabase.auth.token') || sessionStorage.getItem('supabase.auth.token'));

// 根据检查结果配置Supabase客户端
persistSession: hasExistingSession  // 有会话时启用持久化，否则禁用
```

#### 2. 登录流程
1. 用户输入用户名密码登录
2. 登录成功后调用 `enableSessionPersistence()`
3. 重新创建Supabase客户端，启用 `persistSession: true`
4. 后续刷新页面会保持登录状态

#### 3. 重新运行项目
- 清除浏览器存储中的会话数据
- 项目启动时检测不到现有会话
- 用户需要重新登录

### 使用方法

#### 清除会话数据（重新运行项目前）
```javascript
// 在浏览器控制台中运行
localStorage.removeItem('supabase.auth.token');
sessionStorage.removeItem('supabase.auth.token');
location.reload();
```

或者使用提供的脚本：
```bash
# 在项目目录下运行
node clear-session.js
```

### 文件修改说明

1. **lib/supabase.ts** - 添加了动态会话检测和持久化启用功能
2. **lib/auth.ts** - 添加了登录成功后启用持久化的逻辑
3. **components/auth-provider.tsx** - 在认证状态变化时启用持久化
4. **clear-session.js** - 提供清除会话数据的工具脚本

### 预期行为

| 场景 | 行为 |
|------|------|
| 重新运行项目 | 需要重新登录 |
| 登录成功后刷新页面 | 保持登录状态 |
| 关闭浏览器重新打开 | 保持登录状态（在会话有效期内） |
| 清除浏览器数据后访问 | 需要重新登录 |

这个设计既保证了安全性（重新运行项目需要重新认证），又提供了良好的用户体验（登录后无需频繁重新登录）。