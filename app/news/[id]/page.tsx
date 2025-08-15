import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { newsService } from "@/lib/supabase-service"

interface NewsDetailPageProps {
  params: {
    id: string
  }
}

interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  published_date: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = await newsService.getById(params.id)

  if (!article) {
    notFound()
  }

  // Get related articles
  const allNews = await newsService.getAll()
  const relatedArticles = allNews
    .filter((item: NewsArticle) => item.id !== article.id)
    .slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/news" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  News
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">{article.excerpt}</p>

              <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">By {article.author}</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p>
                  The Italian Business Association of Ghana continues to strengthen ties between Italian and Ghanaian
                  business communities through various initiatives and partnerships. This latest development represents a
                  significant milestone in our ongoing efforts to promote bilateral trade and cultural exchange.
                </p>

                <p>
                  Our association has been working tirelessly to create opportunities for both Italian companies looking
                  to expand into the West African market and Ghanaian businesses seeking partnerships with Italian
                  enterprises. The results of these efforts are becoming increasingly visible across multiple sectors.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Highlights</h2>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Enhanced collaboration between Italian and Ghanaian businesses</li>
                  <li>New partnership agreements in manufacturing and technology sectors</li>
                  <li>Cultural exchange programs promoting mutual understanding</li>
                  <li>Investment opportunities in renewable energy and infrastructure</li>
                </ul>

                <p>
                  The success of these initiatives demonstrates the strong potential for continued growth in
                  Italian-Ghanaian business relationships. We remain committed to facilitating these connections and
                  supporting our members in their international business endeavors.
                </p>

                <blockquote className="border-l-4 border-green-500 pl-6 italic text-gray-600 my-8">
                  "This partnership represents more than just business opportunities – it's about building bridges between
                  cultures and creating lasting relationships that benefit both nations."
                </blockquote>

                <p>
                  Looking ahead, IBAG will continue to organize networking events, business seminars, and cultural
                  celebrations that bring together the Italian and Ghanaian communities. Our goal is to create an
                  environment where business relationships can flourish while honoring the rich cultural heritage of both
                  nations.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles
                  .map((relatedArticle: NewsArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/news/${relatedArticle.id}`}
                      className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                    >
                      <img
                        src={relatedArticle.image_url || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedArticle.excerpt}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
