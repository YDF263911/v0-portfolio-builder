import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TemplateCard } from "@/components/template-card"

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design",
    image: "/minimal-portfolio-template-clean-white-background.jpg",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Modern dark theme",
    image: "/dark-mode-portfolio-template-black-background.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and colorful",
    image: "/creative-portfolio-template-colorful-design.jpg",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate and polished",
    image: "/professional-portfolio-template-business-style.jpg",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Code-focused layout",
    image: "/developer-portfolio-template-code-theme.jpg",
  },
  {
    id: "designer",
    name: "Designer",
    description: "Visual showcase",
    image: "/designer-portfolio-template-visual-showcase.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            PortfolioBuilder
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/create">Create Portfolio</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Choose Your Template</h1>
          <p className="text-lg text-muted-foreground">Select a template to start building your portfolio</p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">Create your personal online portfolio in 3 minutes.</p>
        </div>
      </footer>
    </div>
  )
}
