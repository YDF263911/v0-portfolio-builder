# 数据库迁移指南

## 问题描述
部署到 Vercel 后，登录账号查看作品集时，作品不能正常加载。这是因为 Supabase 数据库中的 `portfolios` 表可能不存在。

## 解决方案

### 方法一：在 Supabase 控制台执行 SQL

1. **登录 Supabase 控制台**
   - 访问 https://supabase.com/dashboard
   - 选择你的项目 `mxummcxogzsptqxsgrlm`

2. **执行 SQL 迁移**
   - 进入 SQL Editor
   - 复制并执行以下 SQL 代码：

```sql
-- 创建作品集数据表
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    portfolio_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 添加索引以提高查询性能
    CONSTRAINT portfolios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 为常用查询字段创建索引
CREATE INDEX IF NOT EXISTS portfolios_user_id_idx ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS portfolios_updated_at_idx ON portfolios(updated_at DESC);

-- 启用行级安全策略
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- 创建安全策略：用户只能访问自己的数据
CREATE POLICY "用户只能访问自己的作品集" ON portfolios
    FOR ALL USING (auth.uid() = user_id);

-- 创建更新时间的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 方法二：使用 Supabase CLI（推荐）

1. **安装 Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **登录 Supabase**
   ```bash
   supabase login
   ```

3. **链接项目**
   ```bash
   cd v0-portfolio-builder
   supabase link --project-ref mxummcxogzsptqxsgrlm
   ```

4. **执行迁移**
   ```bash
   supabase db push
   ```

## 验证迁移是否成功

1. 重新登录应用
2. 检查仪表板是否显示正确的错误信息
3. 如果看到 "数据库表未初始化，请先执行数据库迁移"，说明迁移成功
4. 创建新的作品集测试功能

## 故障排除

### 如果迁移后仍然有问题

1. **检查表是否存在**
   - 在 Supabase 控制台的 Table Editor 中查看是否有 `portfolios` 表

2. **检查行级安全策略**
   - 确保 RLS（Row Level Security）已启用
   - 检查策略是否正确配置

3. **检查外键约束**
   - 确保 `user_id` 字段正确引用 `auth.users` 表

### 联系支持

如果以上步骤都无法解决问题，请联系项目维护者获取帮助。