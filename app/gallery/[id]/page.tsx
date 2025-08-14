import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Download, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockGallery } from "@/lib/mock-data"

interface GalleryDetailPageProps {
  params: {
    id: string
  }
}

export default function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const image = mockGallery.find((item) => item.id === Number.parseInt(params.id))

  if (!image) {
    notFound()
  }

  // Get related images from the same event
  const relatedImages = mockGallery.filter((item) => item.event === image.event && item.id !== image.id).slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/events-gallery" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-auto max-h-[600px] object-contain"
                />
              </div>

              {/* Image Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">1,234 views</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 mb-3">
                    {image.category}
                  </Badge>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{image.title}</h1>
                  <p className="text-gray-600 mb-4">{image.description}</p>
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Event</p>
                    <p className="text-sm text-gray-600">{image.event}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">Date</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(image.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">Photographer</p>
                    <p className="text-sm text-gray-600">IBAG Photography Team</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">Dimensions</p>
                    <p className="text-sm text-gray-600">1920 × 1280 pixels</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      networking
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      business
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      italian
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ghana
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Images */}
          {relatedImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">More from {image.event}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedImages.map((relatedImage) => (
                  <Link
                    key={relatedImage.id}
                    href={`/gallery/${relatedImage.id}`}
                    className="group block aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={relatedImage.image || "/placeholder.svg"}
                      alt={relatedImage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
