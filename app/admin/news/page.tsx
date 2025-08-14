"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { mockNews, type NewsArticle } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react"

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNews)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((article) => article.id !== id))
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

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader />

          <main className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">News Articles</h1>
                <p className="text-gray-600">Manage your news articles and announcements</p>
              </div>
              <Button
                onClick={handleAdd}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Article</span>
              </Button>
            </div>

            {showForm ? (
              <NewsForm
                article={editingArticle}
                onSave={(article) => {
                  if (editingArticle) {
                    setArticles(articles.map((a) => (a.id === article.id ? article : a)))
                  } else {
                    setArticles([...articles, { ...article, id: Date.now().toString() }])
                  }
                  setShowForm(false)
                  setEditingArticle(null)
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingArticle(null)
                }}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Title</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Author</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Category</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-800">Status</th>
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
                            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                article.status === "published"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {article.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{article.publishedAt}</span>
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
  onSave: (article: NewsArticle) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    author: article?.author || "",
    category: article?.category || "",
    status: article?.status || "draft",
    publishedAt: article?.publishedAt || new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: article?.id || "",
      ...(formData as NewsArticle),
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{article ? "Edit Article" : "Add New Article"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
              <option value="Partnership">Partnership</option>
              <option value="Business Development">Business Development</option>
              <option value="Cultural Exchange">Cultural Exchange</option>
              <option value="Member Spotlight">Member Spotlight</option>
              <option value="Economic Report">Economic Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
          <textarea
            required
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Brief summary of the article..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea
            required
            rows={8}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Full article content..."
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
    </div>
  )
}
