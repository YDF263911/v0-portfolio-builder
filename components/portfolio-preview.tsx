import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PortfolioData } from "@/types/portfolio"

interface PortfolioPreviewProps {
  data: PortfolioData
}

export function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const { personalInfo, skills, projects, theme } = data

  const getThemeColors = () => {
    switch (theme.colorScheme) {
      case "purple":
        return { primary: "#9333EA", secondary: "#A855F7" }
      case "dark":
        return { primary: "#1F2937", secondary: "#374151" }
      default:
        return { primary: "#3B82F6", secondary: "#60A5FA" }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="min-h-[600px] bg-background">
      {/* Hero Section */}
      <div className="p-8 text-center" style={{ backgroundColor: colors.primary }}>
        {personalInfo.profilePhoto && (
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={personalInfo.profilePhoto || "/placeholder.svg"}
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-2">{personalInfo.name || "Your Name"}</h1>
        <p className="text-xl text-white/90 mb-4">{personalInfo.jobTitle || "Your Job Title"}</p>
        <p className="text-white/80 max-w-2xl mx-auto">{personalInfo.bio || "Your bio will appear here..."}</p>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  {project.image && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{project.title || "Project Title"}</h3>
                  <p className="text-muted-foreground mb-2">{project.description || "Project description..."}</p>
                  {project.link && (
                    <a href={project.link} className="text-primary hover:underline text-sm">
                      View Project →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!personalInfo.name && skills.length === 0 && projects.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <p>Start filling out the form to see your portfolio preview</p>
        </div>
      )}
    </div>
  )
}
