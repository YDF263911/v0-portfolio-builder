import type { PortfolioData } from "@/types/portfolio"
import type { TemplateType } from "@/types/portfolio"

// 模板特定的CSS样式
export const getTemplateCSS = (template: TemplateType): string => {
  const baseCSS = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .section { margin-bottom: 3rem; }
    .skill-tag { display: inline-block; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; margin: 0.25rem; }
    .project-card { border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem; }
    .project-image { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
    @media (max-width: 768px) { .container { padding: 1rem; } }
  `

  const templateCSS = {
    'minimal': `
      body { background: white; color: #333; }
      .header { text-align: center; margin-bottom: 3rem; }
      .header h1 { font-size: 3rem; font-weight: 300; margin-bottom: 0.5rem; }
      .header h2 { font-size: 1.5rem; color: #666; }
      .skill-tag { background: #f5f5f5; color: #333; border: 1px solid #ddd; }
      .project-card { border: 1px solid #eee; background: white; }
    `,
    'dark-mode': `
      body { background: #0f172a; color: #f1f5f9; }
      .header { text-align: center; margin-bottom: 3rem; }
      .header h1 { font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; }
      .header h2 { font-size: 1.5rem; color: #94a3b8; }
      .skill-tag { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; }
      .project-card { background: #1e293b; border: 1px solid #334155; }
    `,
    'creative': `
      body { background: linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 100%); color: #1f2937; }
      .header { text-align: center; margin-bottom: 3rem; }
      .header h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .header h2 { font-size: 1.5rem; color: #6b7280; }
      .skill-tag { background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); color: #7c3aed; border: 1px solid rgba(124,58,237,0.2); }
      .project-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); }
    `,
    'professional': `
      body { background: #f8fafc; color: #1e293b; font-family: 'Georgia', serif; }
      .header { text-align: center; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem; }
      .header h1 { font-size: 2.5rem; font-weight: 600; margin-bottom: 0.5rem; }
      .header h2 { font-size: 1.3rem; color: #64748b; font-style: italic; }
      .skill-tag { background: #e2e8f0; color: #475569; font-family: 'Inter', sans-serif; }
      .project-card { background: white; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    `,
    'developer': `
      body { background: #1a1b26; color: #c0caf5; font-family: 'JetBrains Mono', monospace; }
      .header { background: #16161e; padding: 2rem; border-bottom: 1px solid #24283b; margin-bottom: 3rem; }
      .header h1 { font-size: 2rem; font-weight: 600; color: #7aa2f7; }
      .header h2 { font-size: 1.2rem; color: #9aa5ce; }
      .skill-tag { background: #24283b; color: #7aa2f7; border: 1px solid #414868; }
      .project-card { background: #1f2335; border: 1px solid #414868; }
      .code-block { background: #16161e; padding: 1rem; border-radius: 4px; margin: 1rem 0; }
    `,
    'designer': `
      body { background: #fafafa; color: #2d3748; }
      .header { text-align: center; margin-bottom: 3rem; }
      .header h1 { font-size: 3rem; font-weight: 300; letter-spacing: -0.5px; margin-bottom: 0.5rem; }
      .header h2 { font-size: 1.4rem; color: #718096; font-weight: 400; }
      .skill-tag { background: #edf2f7; color: #4a5568; border: 1px solid #e2e8f0; }
      .project-card { background: white; border: 1px solid #e2e8f0; transition: all 0.3s ease; }
      .project-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    `
  }

  return baseCSS + (templateCSS[template] || templateCSS['minimal'])
}

// 生成简约模板HTML
const generateMinimalHTML = (data: PortfolioData): string => {
  return `
    <div class="container">
      <header class="header">
        <h1>${data.personalInfo.name}</h1>
        <h2>${data.personalInfo.jobTitle}</h2>
      </header>
      
      ${data.personalInfo.bio ? `
        <section class="section">
          <p style="text-align: center; font-size: 1.2rem; color: #666; max-width: 600px; margin: 0 auto;">
            ${data.personalInfo.bio}
          </p>
        </section>
      ` : ''}
      
      ${data.skills.length > 0 ? `
        <section class="section">
          <h2 style="text-align: center; margin-bottom: 2rem;">技能</h2>
          <div style="text-align: center;">
            ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </section>
      ` : ''}
      
      ${data.projects.length > 0 ? `
        <section class="section">
          <h2 style="text-align: center; margin-bottom: 2rem;">项目作品</h2>
          <div>
            ${data.projects.map(project => `
              <div class="project-card">
                <h3 style="margin-bottom: 1rem;">${project.title}</h3>
                <p style="margin-bottom: 1rem; color: #666;">${project.description}</p>
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                ${project.link ? `<a href="${project.link}" style="color: #007acc; text-decoration: none;">查看项目 →</a>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
      
      <footer style="text-align: center; margin-top: 4rem; color: #999; font-size: 0.9rem;">
        <p>使用作品集构建器生成 - ${data.theme.template}模板</p>
      </footer>
    </div>
  `
}

// 生成暗色模式模板HTML
const generateDarkModeHTML = (data: PortfolioData): string => {
  return `
    <div class="container">
      <header class="header">
        <h1>${data.personalInfo.name}</h1>
        <h2>${data.personalInfo.jobTitle}</h2>
      </header>
      
      ${data.personalInfo.bio ? `
        <section class="section">
          <p style="text-align: center; font-size: 1.2rem; color: #cbd5e1; max-width: 600px; margin: 0 auto;">
            ${data.personalInfo.bio}
          </p>
        </section>
      ` : ''}
      
      ${data.skills.length > 0 ? `
        <section class="section">
          <h2 style="text-align: center; margin-bottom: 2rem; color: #e2e8f0;">技能专长</h2>
          <div style="text-align: center;">
            ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </section>
      ` : ''}
      
      ${data.projects.length > 0 ? `
        <section class="section">
          <h2 style="text-align: center; margin-bottom: 2rem; color: #e2e8f0;">项目作品</h2>
          <div>
            ${data.projects.map(project => `
              <div class="project-card">
                <h3 style="margin-bottom: 1rem; color: #f1f5f9;">${project.title}</h3>
                <p style="margin-bottom: 1rem; color: #94a3b8;">${project.description}</p>
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                ${project.link ? `<a href="${project.link}" style="color: #60a5fa; text-decoration: none;">查看项目 →</a>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
      
      <footer style="text-align: center; margin-top: 4rem; color: #64748b; font-size: 0.9rem;">
        <p>使用作品集构建器生成 - ${data.theme.template}模板</p>
      </footer>
    </div>
  `
}

// 其他模板的HTML生成函数（简化版，实际使用时需要完整实现）
const generateCreativeHTML = (data: PortfolioData): string => generateMinimalHTML(data)
const generateProfessionalHTML = (data: PortfolioData): string => generateMinimalHTML(data)
const generateDeveloperHTML = (data: PortfolioData): string => generateMinimalHTML(data)
const generateDesignerHTML = (data: PortfolioData): string => generateMinimalHTML(data)

export const exportPortfolio = {
  // 生成模板特定的HTML内容，保持原模板样式
  toTemplateHTML: (data: PortfolioData): string => {
    const template = data.theme.template as TemplateType
    
    // 根据模板类型生成对应的HTML结构
    const generateTemplateHTML = () => {
      switch (template) {
        case 'minimal':
          return generateMinimalHTML(data)
        case 'dark-mode':
          return generateDarkModeHTML(data)
        case 'creative':
          return generateCreativeHTML(data)
        case 'professional':
          return generateProfessionalHTML(data)
        case 'developer':
          return generateDeveloperHTML(data)
        case 'designer':
          return generateDesignerHTML(data)
        default:
          return generateMinimalHTML(data)
      }
    }
    
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - 作品集 (${template}模板)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        ${getTemplateCSS(template)}
    </style>
</head>
<body class="template-${template}">
    ${generateTemplateHTML()}
</body>
</html>`
    
    return html
  },

  // 导出为HTML文件（保持模板样式）
  toHTML: (data: PortfolioData): string => {
    return exportPortfolio.toTemplateHTML(data)
  },

  // 下载HTML文件（增强版，保持模板样式）
  downloadHTML: (data: PortfolioData, filename: string = 'portfolio.html') => {
    const htmlContent = exportPortfolio.toTemplateHTML(data)
    const blob = new Blob([htmlContent], { type: 'text/html' })
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
  },

  // 导出为JSON文件（用于备份）
  downloadJSON: (data: PortfolioData, filename: string = 'portfolio.json') => {
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
  },

  // 增强版PDF导出功能
  toPDF: async (data: PortfolioData): Promise<void> => {
    try {
      // 使用增强的HTML内容生成PDF
      const htmlContent = exportPortfolio.toTemplateHTML(data)
      const printWindow = window.open('', '_blank')
      
      if (printWindow) {
        // 写入完整的HTML文档
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${data.personalInfo.name} - 作品集</title>
            <style>
              @media print {
                body { margin: 0; padding: 20px; }
                .container { max-width: 100% !important; }
                .project-card { break-inside: avoid; }
              }
            </style>
          </head>
          <body>${htmlContent}</body>
          </html>
        `)
        
        printWindow.document.close()
        
        // 等待内容完全加载
        printWindow.onload = () => {
          // 添加打印前的延迟以确保样式加载完成
          setTimeout(() => {
            printWindow.print()
            // 延迟关闭窗口，确保打印对话框已打开
            setTimeout(() => {
              if (!printWindow.closed) {
                printWindow.close()
              }
            }, 2000)
          }, 500)
        }
      }
    } catch (error) {
      console.error('PDF导出失败:', error)
      // 提供更详细的错误信息
      if (error instanceof Error) {
        alert(`PDF导出失败: ${error.message}`)
      } else {
        alert('PDF导出失败，请尝试使用HTML导出或检查浏览器打印设置')
      }
    }
  },

  // 新增：导出预览功能
  previewHTML: (data: PortfolioData): void => {
    const htmlContent = exportPortfolio.toTemplateHTML(data)
    const previewWindow = window.open('', '_blank')
    
    if (previewWindow) {
      previewWindow.document.write(htmlContent)
      previewWindow.document.close()
      previewWindow.focus()
    }
  }
}