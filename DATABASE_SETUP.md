# 数据库设置指南

## Supabase 数据库配置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 获取项目 URL 和 anon key
3. 更新 `.env.local` 文件中的配置：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon key
```

### 2. 数据库表结构

项目使用以下表结构：

#### portfolios 表
```sql
CREATE TABLE portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    portfolio_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 索引
- `portfolios_user_id_idx` - 按用户ID查询
- `portfolios_updated_at_idx` - 按更新时间排序

#### 安全策略
- 行级安全策略已启用
- 用户只能访问自己的数据

### 3. 存储桶配置

创建名为 `portfolio-images` 的存储桶用于图片上传：

1. 在 Supabase 控制台进入 Storage
2. 创建新存储桶 `portfolio-images`
3. 设置公共访问权限

### 4. 认证配置

Supabase Auth 已配置支持：
- 邮箱/密码注册和登录
- 密码重置功能
- 用户会话管理

## 本地开发

### 环境变量

复制 `.env.local.example` 到 `.env.local` 并填写：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 运行项目

```bash
npm install
npm run dev
```

## 生产部署

### Vercel 部署

1. 在 Vercel 中设置环境变量
2. 确保 Supabase URL 允许生产域名
3. 部署项目

### 数据库迁移

生产环境运行 SQL 迁移脚本：

```sql
-- 在 Supabase SQL 编辑器中运行
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    portfolio_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT portfolios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS portfolios_user_id_idx ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS portfolios_updated_at_idx ON portfolios(updated_at DESC);

ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "用户只能访问自己的作品集" ON portfolios
    FOR ALL USING (auth.uid() = user_id);
```

## 故障排除

### 常见问题

1. **认证错误**: 检查环境变量是否正确
2. **数据库连接错误**: 确认 Supabase 项目状态
3. **存储权限错误**: 检查存储桶配置
4. **CORS 错误**: 在 Supabase 设置中添加域名

### 测试认证

1. 访问 `/register` 注册新用户
2. 检查邮箱验证（如启用）
3. 登录并创建作品集
4. 验证数据是否保存到 Supabase