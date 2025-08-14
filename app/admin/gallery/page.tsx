"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { mockGallery, type GalleryImage } from "@/lib/mock-data"
import { Trash2, Upload, Calendar } from "lucide-react"

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(mockGallery)
  const [showUploadForm, setShowUploadForm] = useState(false)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((image) => image.id !== id))
    }
  }

  const handleUpload = (imageData: Partial<GalleryImage>) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString().split("T")[0],
      ...(imageData as GalleryImage),
    }
    setImages([newImage, ...images])
    setShowUploadForm(false)
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader />

          <main className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Gallery</h1>
                <p className="text-gray-600">Manage your image gallery and media</p>
              </div>
              <Button
                onClick={() => setShowUploadForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Images</span>
              </Button>
            </div>

            {showUploadForm && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload New Images</h2>
                <UploadForm onUpload={handleUpload} onCancel={() => setShowUploadForm(false)} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                        {image.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{image.uploadedAt}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      className="w-full text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No images yet</h3>
                <p className="text-gray-600 mb-4">Upload your first images to get started</p>
                <Button
                  onClick={() => setShowUploadForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Upload Images
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function UploadForm({
  onUpload,
  onCancel,
}: {
  onUpload: (image: Partial<GalleryImage>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpload(formData)
    setFormData({ title: "", description: "", category: "", url: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="">Select Category</option>
            <option value="Cultural Events">Cultural Events</option>
            <option value="Business Events">Business Events</option>
            <option value="Networking">Networking</option>
            <option value="Community">Community</option>
            <option value="Awards">Awards</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Brief description of the image..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
          Upload Image
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
