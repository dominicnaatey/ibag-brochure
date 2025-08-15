import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { eventsService, galleryService } from "@/lib/supabase-service"

export default async function EventsGalleryPage() {
  const allEvents = await eventsService.getAll()
  const upcomingEvents = allEvents.filter((event) => new Date(event.date) > new Date()).slice(0, 3)

  const pastEventsGallery = await galleryService.getAll()
  const galleryImages = pastEventsGallery.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Events & Gallery</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our vibrant community through networking events, cultural celebrations, and business
                gatherings.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us at our upcoming events and be part of the IBAG community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{event.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-600 text-sm">
                        {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-600 text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-600 text-sm">200+ expected</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{event.description}</p>

                  <div className="space-y-2">
                    <Link href={`/events/${event.id}`}>
                      <Button className="w-full bg-gray-800 hover:bg-purple-600 text-white">View Details</Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent">
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Past Events Gallery</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take a look at some of our memorable events and celebrations from the past year.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((galleryItem) => (
                <Link key={galleryItem.id} href={`/gallery/${galleryItem.id}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <img
                      src={galleryItem.image_url || "/placeholder.svg"}
                      alt={galleryItem.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{galleryItem.title}</h3>
                      <p className="text-purple-600 text-sm font-medium mb-3">
                        {new Date(galleryItem.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">{galleryItem.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="bg-transparent">
                View All Gallery Images
              </Button>
            </div>
          </div>
        </section>

        {/* Event Hosting CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gray-800 rounded-lg p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                IBAG members can propose and host events for the community. Let's create memorable experiences together.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Propose an Event
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
