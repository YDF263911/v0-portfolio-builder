"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"

interface PersonalInfoFormProps {
  data: PortfolioData["personalInfo"]
  onChange: (data: Partial<PortfolioData["personalInfo"]>) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [previewUrl, setPreviewUrl] = useState(data.profilePhoto)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onChange({ profilePhoto: url })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="Full Stack Developer"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            rows={4}
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div className="flex items-center gap-4">
            {previewUrl && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                <Image src={previewUrl || "/placeholder.svg"} alt="Profile preview" fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <Input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button variant="outline" asChild className="w-full bg-transparent">
                <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </label>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
