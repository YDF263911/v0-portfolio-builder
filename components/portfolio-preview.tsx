import { TemplateLayout } from "@/components/template-layouts"
import type { PortfolioData } from "@/types/portfolio"

interface PortfolioPreviewProps {
  data: PortfolioData
}

export function PortfolioPreview({ data }: PortfolioPreviewProps) {
  return <TemplateLayout data={data} />
}
