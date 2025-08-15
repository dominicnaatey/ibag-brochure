import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { eventsService } from "@/lib/supabase-service"

interface EventDetailPageProps {
  params: {
    id: string
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await eventsService.getById(params.id)

  if (!event) {
    notFound()
  }

  const isUpcoming = new Date(event.date) > new Date()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/events-gallery" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Events & Gallery
          </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant={isUpcoming ? "default" : "secondary"}
                    className={isUpcoming ? "bg-green-600" : "bg-gray-500"}
                  >
                    {isUpcoming ? "Upcoming" : "Past Event"}
                  </Badge>
                  <Badge variant="outline">{event.category}</Badge>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{event.title}</h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-6">{event.description}</p>
              </div>

              {/* Event Image */}
              <div className="mb-8">
                <img
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Event Details */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>

                <div className="text-gray-700 leading-relaxed space-y-6">
                  <p>
                    Join us for an exceptional gathering that celebrates the vibrant partnership between Italian and
                    Ghanaian business communities. This event promises to be an enriching experience filled with
                    networking opportunities, cultural exchange, and meaningful connections.
                  </p>

                  <p>
                    Our carefully curated program includes presentations from industry leaders, interactive workshops,
                    and plenty of time for informal networking. Whether you're an established business owner or an
                    emerging entrepreneur, this event offers valuable insights and opportunities to expand your
                    professional network.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Event Highlights</h3>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Keynote presentations from Italian and Ghanaian business leaders</li>
                    <li>Panel discussions on emerging market opportunities</li>
                    <li>Networking sessions with refreshments and authentic cuisine</li>
                    <li>Cultural performances celebrating Italian-Ghanaian heritage</li>
                    <li>Exhibition showcasing products and services from member companies</li>
                  </ul>

                  <p>
                    This event is designed to foster meaningful connections and create lasting partnerships between
                    attendees. We encourage all participants to come prepared to share their experiences and learn from
                    others in our diverse business community.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Who Should Attend</h3>

                  <p>
                    This event is perfect for business owners, entrepreneurs, investors, and professionals interested in
                    Italian-Ghanaian trade relationships. Whether you're looking to expand your business internationally
                    or seeking new partnership opportunities, you'll find valuable connections and insights at this
                    gathering.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Event Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(event.event_date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-gray-600">{event.event_time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Expected Attendance</p>
                        <p className="text-gray-600">150+ professionals</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">4 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {isUpcoming ? (
                      <div className="space-y-3">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Register Now</Button>
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                          <ExternalLink className="w-4 h-4" />
                          Add to Calendar
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">This event has concluded</p>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Event Photos
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <p className="text-sm text-gray-600">For questions about this event, please contact us at:</p>
                    <p className="text-sm text-green-600 font-medium mt-2">events@ibag-ghana.org</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
