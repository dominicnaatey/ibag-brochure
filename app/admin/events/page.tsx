"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { eventsService } from "@/lib/supabase-service"
import type { Database } from "@/lib/supabase"
import { Plus, Edit, Trash2, Calendar, MapPin, Users, Clock } from "lucide-react"

type Event = Database['public']['Tables']['events']['Row']

// Extended Event type for admin functionality
type ExtendedEvent = Event & {
  status?: 'upcoming' | 'past'
  time?: string
  attendees?: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsService.getAll()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await eventsService.delete(id)
        setEvents(events.filter((event) => event.id !== id))
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleSave = async (eventData: ExtendedEvent) => {
    try {
      // Only save properties that exist in the database schema
      const dbEventData: Partial<Event> = {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        image_url: eventData.image_url
      }

      if (editingEvent) {
        await eventsService.update(editingEvent.id, dbEventData)
        setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...dbEventData } : e))
      } else {
        const newEvent = await eventsService.create(dbEventData)
        setEvents([...events, newEvent])
      }
      setShowForm(false)
      setEditingEvent(null)
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  // Helper function to determine event status
  const getEventStatus = (event: Event): 'upcoming' | 'past' => {
    return new Date(event.date) > new Date() ? 'upcoming' : 'past'
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>
                  <p className="text-gray-600 mt-2">Manage your events and track attendance</p>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Event
                </Button>
              </div>

              {showForm && (
                <div className="mb-8">
                  <EventForm
                    event={editingEvent}
                    onSave={handleSave}
                    onCancel={() => {
                      setShowForm(false)
                      setEditingEvent(null)
                    }}
                  />
                </div>
              )}

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading events...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => {
                    const status = getEventStatus(event)
                    return (
                      <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === "upcoming" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {status}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span>TBD</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span>TBD</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function EventForm({
  event,
  onSave,
  onCancel,
}: {
  event: Event | null
  onSave: (event: ExtendedEvent) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<ExtendedEvent>>({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: "", // This will be handled separately since it's not in the DB
    location: event?.location || "",
    attendees: "", // This will be handled separately since it's not in the DB
    status: event ? (new Date(event.date) > new Date() ? "upcoming" : "past") : "upcoming",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: event?.id || "",
      title: formData.title || "",
      description: formData.description || "",
      date: formData.date || "",
      location: formData.location || "",
      image_url: event?.image_url || null,
      created_at: event?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      time: formData.time,
      attendees: formData.attendees,
      status: formData.status,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{event ? "Edit Event" : "Add New Event"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time (Display Only)</label>
            <input
              type="text"
              value={formData.time || ""}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., 7:00 PM or Full Day"
            />
            <p className="text-xs text-gray-500 mt-1">Note: This is for display purposes only and won't be saved to the database.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Attendees (Display Only)</label>
            <input
              type="text"
              value={formData.attendees || ""}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., 200+ expected"
            />
            <p className="text-xs text-gray-500 mt-1">Note: This is for display purposes only and won't be saved to the database.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status (Auto-calculated)</label>
            <select
              disabled
              value={formData.status}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Status is automatically determined based on the event date.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            {event ? "Update Event" : "Create Event"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
