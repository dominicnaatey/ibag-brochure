import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Download, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { galleryService } from "@/lib/supabase-service"

interface GalleryDetailPageProps {
  params: {
    id: string
  }
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const image = await galleryService.getById(params.id)

  if (!image) {
    notFound()
  }

  // Get related images from the same event
  const relatedImages = image.event_id 
    ? await galleryService.getByEvent(image.event_id)
    : []
  const filteredRelatedImages = relatedImages.filter(item => item.id !== image.id).slice(0, 6)

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
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-auto max-h-[600px] object-contain"
                />
              </div>

              {/* Image Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">View Count</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{image.title}</h1>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Description</h3>
                    <p className="text-gray-700">{image.description || 'No description available'}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Upload Date</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(image.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Images */}
          {filteredRelatedImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredRelatedImages.map((relatedImage) => (
                  <Link
                    key={relatedImage.id}
                    href={`/gallery/${relatedImage.id}`}
                    className="group block aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={relatedImage.image_url || "/placeholder.svg"}
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
