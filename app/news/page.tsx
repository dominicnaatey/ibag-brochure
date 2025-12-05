import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import { newsService } from "@/lib/supabase-service"

export default async function NewsPage() {
  // Fetch news from Supabase
  let allNews: any[] = []
  let featuredNews: any = null
  let recentNews: any[] = []

  try {
    allNews = await newsService.getAll()
    if (allNews.length > 0) {
      featuredNews = allNews[0] // Use the most recent news as featured
      recentNews = allNews.slice(1, 7) // Skip first item to avoid duplication with featured
    }
  } catch (error) {
    console.error("Failed to fetch news:", error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">IBAG News</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Stay updated with the latest news, developments, and insights from the Italian Business Association of
                Ghana.
              </p>

              <div className="max-w-md mx-auto">
                <SearchBar
                  placeholder="Search news articles..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={featuredNews?.image_url || "/placeholder.svg"}
                  alt={featuredNews?.title || "News Article"}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredNews ? new Date(featuredNews.published_date).toLocaleDateString() : ''}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredNews?.author || 'IBAG Team'}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{featuredNews?.title || 'No Featured News'}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{featuredNews?.excerpt || 'No excerpt available'}</p>
                  {featuredNews && (
                    <Link href={`/news/${featuredNews.id}`}>
                    <button className="bg-gray-800 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                      Read Full Article
                    </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent News */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent News</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Catch up on the latest updates and announcements from IBAG and our community.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentNews.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                        News
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.published_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Link href={`/news/${article.id}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-purple-600 cursor-pointer transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                      <Link
                        href={`/news/${article.id}`}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gray-800 rounded-lg p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and never miss important updates from the IBAG community.
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
