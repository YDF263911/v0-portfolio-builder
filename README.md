# 作品集构建器 (Portfolio Builder)

一个现代化的静态作品集构建器，使用 Next.js、TypeScript 和 Tailwind CSS 构建。

## 功能特性

### 🎨 模板系统
- 多种预设模板选择
- 实时预览功能
- 自定义颜色主题

### 📝 表单管理
- 个人信息表单（姓名、职位、简介、头像）
- 技能管理（最多20个技能）
- 项目管理（最多10个项目，支持图片和链接）
- 实时表单验证

### 💾 数据管理
- **本地存储**：自动保存到浏览器本地存储
- **云端存储**：集成 Supabase 进行数据同步
- **导入/导出**：支持 JSON 格式的数据导入导出
- **文件上传**：支持图片上传到云端存储

### 📤 导出功能
- **HTML 导出**：生成独立的 HTML 文件
- **JSON 导出**：数据备份格式
- **PDF 导出**：使用浏览器打印功能生成 PDF

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: Radix UI + 自定义组件
- **表单处理**: React Hook Form + Zod 验证
- **状态管理**: React Hooks
- **云存储**: Supabase
- **构建工具**: Turbopack

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 环境配置
复制 `.env.local.example` 为 `.env.local` 并配置您的环境变量：

```env
# Supabase 配置（可选）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 开发模式
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本
```bash
npm run build
npm run start
```

## 项目结构

```
v0-portfolio-builder/
├── app/                    # Next.js App Router
│   ├── create/            # 作品集创建页面
│   ├── preview/           # 预览页面
│   ├── success/           # 成功页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── forms/            # 表单组件
│   ├── ui/               # UI 基础组件
│   └── portfolio-preview.tsx # 作品集预览组件
├── lib/                  # 工具函数和配置
│   ├── validation.ts     # 数据验证
│   ├── export.ts         # 导出功能
│   ├── storage.ts        # 存储服务
│   └── supabase.ts       # Supabase 配置
├── types/                # TypeScript 类型定义
└── public/              # 静态资源
```

## 核心功能详解

### 数据验证
使用 Zod 进行严格的数据验证：
- 姓名：1-50个字符
- 职位：1-100个字符
- 简介：最多500个字符
- 技能：最多20个，每个最多50个字符
- 项目：最多10个

### 存储策略
采用分层存储策略：
1. **优先云端**：使用 Supabase 进行数据持久化
2. **降级本地**：云端失败时自动使用本地存储
3. **导入导出**：支持数据备份和迁移

### 导出系统
- **HTML 导出**：生成完整的静态网站
- **JSON 导出**：数据备份和迁移
- **PDF 导出**：打印友好的文档格式

## 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 其他平台
项目支持部署到任何支持 Node.js 的平台：
- Netlify
- Railway
- 自有服务器

## 开发指南

### 添加新模板
1. 在 `components/portfolio-preview.tsx` 中添加模板逻辑
2. 在 `types/portfolio.ts` 中更新类型定义
3. 在首页添加模板选择项

### 自定义验证规则
修改 `lib/validation.ts` 中的 Zod schema 来调整验证规则。

### 扩展导出格式
在 `lib/export.ts` 中添加新的导出方法。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License