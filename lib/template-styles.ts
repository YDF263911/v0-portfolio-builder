import type { TemplateType } from "@/types/portfolio"

// 模板样式配置
export interface TemplateStyle {
  layout: {
    heroLayout: "centered" | "split" | "asymmetric" | "full-width" | "modern" | "classic"
    sectionSpacing: "compact" | "normal" | "generous" | "spacious"
    cardStyle: "flat" | "elevated" | "minimal" | "bordered" | "gradient" | "glass"
    navigation: "top" | "side" | "floating" | "hidden"
  }
  typography: {
    fontFamily: string
    headingSize: "small" | "medium" | "large" | "xlarge"
    lineHeight: "tight" | "normal" | "loose"
    fontWeight: "light" | "normal" | "bold"
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    surface: string
    border: string
  }
  animations: {
    hoverEffect: "scale" | "shadow" | "slide" | "glow" | "rotate" | "float" | "pulse"
    transitionSpeed: "fast" | "normal" | "slow"
    entranceAnimation: "fade" | "slide" | "zoom" | "bounce" | "none"
  }
  effects: {
    backgroundPattern: "none" | "dots" | "grid" | "waves" | "geometric"
    shadowIntensity: "none" | "subtle" | "medium" | "strong"
    borderRadius: "none" | "small" | "medium" | "large"
  }
}

// 获取模板样式
export const getTemplateStyles = (template: TemplateType, colorScheme: "blue" | "purple" | "dark" | "green" | "orange" | "pink"): TemplateStyle => {
  const baseColors = {
    blue: { primary: "#3B82F6", secondary: "#60A5FA", accent: "#1D4ED8", surface: "#F0F9FF", border: "#E1E8EF" },
    purple: { primary: "#9333EA", secondary: "#A855F7", accent: "#7C3AED", surface: "#FAF5FF", border: "#E9D8FD" },
    dark: { primary: "#1F2937", secondary: "#374151", accent: "#111827", surface: "#1E293B", border: "#334155" },
    green: { primary: "#10B981", secondary: "#34D399", accent: "#059669", surface: "#F0FDF4", border: "#D1FAE5" },
    orange: { primary: "#F59E0B", secondary: "#FBBF24", accent: "#D97706", surface: "#FFFBEB", border: "#FDE68A" },
    pink: { primary: "#EC4899", secondary: "#F472B6", accent: "#DB2777", surface: "#FDF2F8", border: "#FBCFE8" }
  }

  const colors = baseColors[colorScheme]

  switch (template) {
    case "minimal":
      return {
        layout: {
          heroLayout: "centered",
          sectionSpacing: "compact",
          cardStyle: "minimal",
          navigation: "top"
        },
        typography: {
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          headingSize: "medium",
          lineHeight: "normal",
          fontWeight: "normal"
        },
        colors: {
          ...colors,
          background: "#FFFFFF",
          text: "#1F2937",
          surface: "#F8FAFC",
          border: "#E2E8F0"
        },
        animations: {
          hoverEffect: "float",
          transitionSpeed: "normal",
          entranceAnimation: "fade"
        },
        effects: {
          backgroundPattern: "none",
          shadowIntensity: "subtle",
          borderRadius: "medium"
        }
      }

    case "dark-mode":
      return {
        layout: {
          heroLayout: "modern",
          sectionSpacing: "normal",
          cardStyle: "glass",
          navigation: "floating"
        },
        typography: {
          fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
          headingSize: "large",
          lineHeight: "normal",
          fontWeight: "normal"
        },
        colors: {
          ...colors,
          background: "#0A0F1C",
          text: "#F8FAFC",
          surface: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)"
        },
        animations: {
          hoverEffect: "glow",
          transitionSpeed: "normal",
          entranceAnimation: "slide"
        },
        effects: {
          backgroundPattern: "dots",
          shadowIntensity: "medium",
          borderRadius: "medium"
        }
      }

    case "creative":
      return {
        layout: {
          heroLayout: "asymmetric",
          sectionSpacing: "generous",
          cardStyle: "gradient",
          navigation: "side"
        },
        typography: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
          headingSize: "xlarge",
          lineHeight: "loose",
          fontWeight: "bold"
        },
        colors: {
          ...colors,
          background: "linear-gradient(135deg, #FEF7FF 0%, #F3E8FF 100%)",
          text: "#1F2937",
          surface: "rgba(255, 255, 255, 0.9)",
          border: "rgba(168, 85, 247, 0.2)"
        },
        animations: {
          hoverEffect: "pulse",
          transitionSpeed: "slow",
          entranceAnimation: "bounce"
        },
        effects: {
          backgroundPattern: "waves",
          shadowIntensity: "strong",
          borderRadius: "large"
        }
      }

    case "professional":
      return {
        layout: {
          heroLayout: "classic",
          sectionSpacing: "spacious",
          cardStyle: "minimal",
          navigation: "top"
        },
        typography: {
          fontFamily: "'Georgia', 'Times New Roman', 'Noto Serif', serif",
          headingSize: "medium",
          lineHeight: "tight",
          fontWeight: "normal"
        },
        colors: {
          ...colors,
          background: "#F8FAFC",
          text: "#1E293B",
          surface: "#FFFFFF",
          border: "#E2E8F0"
        },
        animations: {
          hoverEffect: "scale",
          transitionSpeed: "normal",
          entranceAnimation: "fade"
        },
        effects: {
          backgroundPattern: "grid",
          shadowIntensity: "subtle",
          borderRadius: "small"
        }
      }

    case "developer":
      return {
        layout: {
          heroLayout: "full-width",
          sectionSpacing: "compact",
          cardStyle: "flat",
          navigation: "hidden"
        },
        typography: {
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace",
          headingSize: "small",
          lineHeight: "tight",
          fontWeight: "normal"
        },
        colors: {
          ...colors,
          background: "#0A0C10",
          text: "#E6EDF3",
          surface: "#161B22",
          border: "#30363D"
        },
        animations: {
          hoverEffect: "glow",
          transitionSpeed: "normal",
          entranceAnimation: "zoom"
        },
        effects: {
          backgroundPattern: "geometric",
          shadowIntensity: "none",
          borderRadius: "small"
        }
      }

    case "designer":
      return {
        layout: {
          heroLayout: "modern",
          sectionSpacing: "spacious",
          cardStyle: "glass",
          navigation: "floating"
        },
        typography: {
          fontFamily: "'Helvetica Neue', 'SF Pro Display', 'Inter', system-ui, sans-serif",
          headingSize: "xlarge",
          lineHeight: "normal",
          fontWeight: "light"
        },
        colors: {
          ...colors,
          background: "#FFFFFF",
          text: "#111827",
          surface: "rgba(255, 255, 255, 0.95)",
          border: "rgba(0, 0, 0, 0.08)"
        },
        animations: {
          hoverEffect: "float",
          transitionSpeed: "normal",
          entranceAnimation: "slide"
        },
        effects: {
          backgroundPattern: "none",
          shadowIntensity: "subtle",
          borderRadius: "medium"
        }
      }

    default:
      return getTemplateStyles("minimal", colorScheme)
  }
}

// CSS 类名生成器
export const getTemplateClasses = (template: TemplateType, colorScheme: "blue" | "purple" | "dark"): string => {
  const styles = getTemplateStyles(template, colorScheme)
  
  const classes = [
    `template-${template}`,
    `layout-${styles.layout.heroLayout}`,
    `spacing-${styles.layout.sectionSpacing}`,
    `cards-${styles.layout.cardStyle}`,
    `typography-${styles.typography.headingSize}`,
    `animation-${styles.animations.hoverEffect}`
  ]
  
  return classes.join(" ")
}

// 获取模板的 CSS 变量
export const getTemplateCSSVariables = (template: TemplateType, colorScheme: "blue" | "purple" | "dark" | "green" | "orange" | "pink"): Record<string, string> => {
  const styles = getTemplateStyles(template, colorScheme)
  
  // 计算边框半径值
  const borderRadius = {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '16px'
  }[styles.effects.borderRadius]
  
  // 计算阴影强度
  const shadowIntensity = {
    none: '0 0 0 rgba(0,0,0,0)',
    subtle: '0 2px 8px rgba(0,0,0,0.1)',
    medium: '0 4px 16px rgba(0,0,0,0.15)',
    strong: '0 8px 32px rgba(0,0,0,0.2)'
  }[styles.effects.shadowIntensity]
  
  return {
    '--template-primary': styles.colors.primary,
    '--template-secondary': styles.colors.secondary,
    '--template-accent': styles.colors.accent,
    '--template-background': styles.colors.background,
    '--template-text': styles.colors.text,
    '--template-surface': styles.colors.surface,
    '--template-border': styles.colors.border,
    '--template-font-family': styles.typography.fontFamily,
    '--template-font-weight': styles.typography.fontWeight,
    '--template-border-radius': borderRadius,
    '--template-shadow': shadowIntensity,
    '--template-transition-speed': styles.animations.transitionSpeed === 'fast' ? '0.2s' : 
                                   styles.animations.transitionSpeed === 'slow' ? '0.5s' : '0.3s',
    '--template-pattern': styles.effects.backgroundPattern
  }
}