// Mock data for content management - can be replaced with database calls later

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  publishedAt: string
  status: "draft" | "published"
  image?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: string
  status: "upcoming" | "past"
  image?: string
}

export interface Member {
  id: string
  name: string
  company: string
  category: string
  location: string
  email: string
  phone: string
  membershipType: "corporate" | "individual" | "associate"
  joinedAt: string
  status: "active" | "inactive"
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  url: string
  category: string
  uploadedAt: string
}

// Mock data
export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "IBAG Signs Historic Partnership Agreement with Ghana Investment Promotion Centre",
    excerpt: "This landmark agreement will facilitate increased Italian investment in Ghana's key sectors.",
    content: "The Italian Business Association of Ghana has entered into a strategic partnership...",
    author: "IBAG Communications",
    category: "Partnership",
    publishedAt: "2024-02-15",
    status: "published",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "2",
    title: "Italian Delegation Visits Ghana to Explore Renewable Energy Opportunities",
    excerpt: "A high-level delegation from Italy's renewable energy sector met with Ghanaian counterparts.",
    content: "A delegation of Italian renewable energy companies visited Ghana...",
    author: "Marco Rossi",
    category: "Business Development",
    publishedAt: "2024-02-10",
    status: "published",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Business Gala",
    description: "Join us for an evening of networking, awards, and celebration.",
    date: "2024-03-15",
    time: "7:00 PM",
    location: "Kempinski Hotel, Accra",
    attendees: "200+ expected",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Trade Mission to Italy",
    description: "Exclusive business delegation to explore opportunities in Italian markets.",
    date: "2024-04-20",
    time: "Full Week",
    location: "Milan & Rome, Italy",
    attendees: "30 delegates",
    status: "upcoming",
  },
]

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Marco Rossi",
    company: "Rossi Import & Export",
    category: "Import/Export",
    location: "Accra",
    email: "marco@rossiexport.com",
    phone: "+233 24 123 4567",
    membershipType: "corporate",
    joinedAt: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Giulia Bianchi",
    company: "Milano Construction Ghana",
    category: "Construction",
    location: "Kumasi",
    email: "giulia@milanoconstruction.gh",
    phone: "+233 24 234 5678",
    membershipType: "corporate",
    joinedAt: "2023-03-20",
    status: "active",
  },
]

export const mockGallery: GalleryImage[] = [
  {
    id: "1",
    title: "Italian Food Festival 2023",
    description: "Celebrated Italian cuisine with local chefs",
    url: "/italian-food-festival.png",
    category: "Cultural Events",
    uploadedAt: "2023-12-15",
  },
  {
    id: "2",
    title: "Business Summit 2023",
    description: "Two-day summit focusing on Italy-Ghana trade opportunities",
    url: "/placeholder.svg?height=300&width=400",
    category: "Business Events",
    uploadedAt: "2023-10-20",
  },
]
