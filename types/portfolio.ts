export interface PortfolioData {
  personalInfo: {
    name: string
    jobTitle: string
    bio: string
    profilePhoto: string
  }
  skills: string[]
  projects: Array<{
    id: string
    title: string
    description: string
    link: string
    image: string
  }>
  theme: {
    template: string
    colorScheme: "blue" | "purple" | "dark"
  }
}
