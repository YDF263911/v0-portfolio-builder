"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Template {
  id: string
  name: string
  description: string
  image: string
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
          <p className="text-muted-foreground">{template.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPreview(true)}>
            Preview
          </Button>
          <Button className="flex-1" asChild>
            <Link href={`/create?template=${template.id}`}>Use Template</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{template.name} Template Preview</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={template.image || "/placeholder.svg"}
              alt={`${template.name} preview`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button asChild>
              <Link href={`/create?template=${template.id}`}>Use This Template</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
