"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { newsService } from "@/lib/supabase-service"
import type { Database } from "@/lib/supabase"
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react"

type NewsArticle = Database['public']['Tables']['news']['Row']
type NewsInsert = Database['public']['Tables']['news']['Insert']
type NewsUpdate = Database['public']['Tables']['news']['Update']

// Extended type for UI-specific properties
type ExtendedNewsArticle = NewsArticle & {
  category?: string
  status?: 'draft' | 'published'
  publishedAt?: string
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await newsService.getAll()
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await newsService.delete(id)
        setArticles(articles.filter((article) => article.id !== id))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Failed to delete article')
      }
    }
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingArticle(null)
    setShowForm(true)
  }

  const handleSave = async (articleData: ExtendedNewsArticle) => {
    try {
      // Only save properties that exist in the database schema
      const dbArticleData: NewsInsert = {
        title: articleData.title || "",
        content: articleData.content || "",
        excerpt: articleData.excerpt || "",
        author: articleData.author || "",
        published_date: articleData.published_date || new Date().toISOString(),
        image_url: articleData.image_url || null
      }

      if (editingArticle) {
        // For updates
        const updateData: NewsUpdate = {
          title: articleData.title,
          content: articleData.content,
          excerpt: articleData.excerpt,
          author: articleData.author,
          published_date: articleData.published_date,
          image_url: articleData.image_url
        }
        await newsService.update(editingArticle.id, updateData)
        setArticles(articles.map(a => a.id === editingArticle.id ? { ...a, ...updateData } : a))
      } else {
        const newArticle = await newsService.create(dbArticleData)
        setArticles([...articles, newArticle])
      }
      setShowForm(false)
      setEditingArticle(null)
    } catch (error) {
      console.error('Error saving article:', error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
            <p className="mt-2 text-gray-600">Manage news articles and announcements</p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Article
            </button>
          </div>

          <main>
            {showForm ? (
              <NewsForm
                article={editingArticle}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false)
                  setEditingArticle(null)
                }}
              />
            ) : loading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">Loading articles...</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Title</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Author</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Published</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <h3 className="font-medium text-gray-800 mb-1">{article.title}</h3>
                              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{article.author}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{new Date(article.published_date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function NewsForm({
  article,
  onSave,
  onCancel,
}: {
  article: NewsArticle | null
  onSave: (article: ExtendedNewsArticle) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<ExtendedNewsArticle>>({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    author: article?.author || "",
    category: "General", // Default category since it's not in database
    status: "draft", // Default status since it's not in database
    published_date: article?.published_date || new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create extended article with UI properties
    const extendedArticle: ExtendedNewsArticle = {
      id: article?.id || "",
      title: formData.title || "",
      content: formData.content || "",
      excerpt: formData.excerpt || "",
      author: formData.author || "",
      published_date: formData.published_date || new Date().toISOString(),
      image_url: article?.image_url || null,
      created_at: article?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // UI-only properties
      category: formData.category,
      status: formData.status
    }
    
    onSave(extendedArticle)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
          <input
            type="text"
            required
            value={formData.author || ""}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category (Display Only)</label>
          <select
            value={formData.category || "General"}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-50"
            disabled
          >
            <option value="General">General</option>
            <option value="Partnership">Partnership</option>
            <option value="Business Development">Business Development</option>
            <option value="Cultural Exchange">Cultural Exchange</option>
            <option value="Member Spotlight">Member Spotlight</option>
            <option value="Economic Report">Economic Report</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Note: Category is for display only and not stored in database</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status (Display Only)</label>
          <select
            value={formData.status || "draft"}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-50"
            disabled
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Note: Status is for display only and not stored in database</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
        <textarea
          rows={3}
          required
          value={formData.excerpt || ""}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Brief summary of the article..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
        <textarea
          rows={8}
          required
          value={formData.content || ""}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Full article content..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Published Date *</label>
        <input
          type="date"
          required
          value={formData.published_date?.split('T')[0] || ""}
          onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
          {article ? "Update Article" : "Create Article"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
