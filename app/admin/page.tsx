"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { supabase } from "@/lib/supabase"
import { FileText, Calendar, Users, ImageIcon, TrendingUp, Eye, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [contactsCount, setContactsCount] = useState(0)
  const [newContactsCount, setNewContactsCount] = useState(0)

  useEffect(() => {
    fetchContactStats()
  }, [])

  const fetchContactStats = async () => {
    try {
      const { data: allContacts, error: allError } = await supabase
        .from('contact_submissions')
        .select('id, status')

      if (!allError && allContacts) {
        setContactsCount(allContacts.length)
        setNewContactsCount(allContacts.filter(c => c.status === 'new').length)
      }
    } catch (error) {
      console.error('Error fetching contact stats:', error)
    }
  }

  const stats = [
    { name: "News Articles", value: "12", icon: FileText, color: "bg-blue-500", trend: "+2 this month" },
    { name: "Upcoming Events", value: "3", icon: Calendar, color: "bg-green-500", trend: "Next: March 15" },
    { name: "Total Members", value: "156", icon: Users, color: "bg-purple-500", trend: "+8 this month" },
    { name: "Contact Messages", value: contactsCount.toString(), icon: Mail, color: "bg-indigo-500", trend: newContactsCount > 0 ? `${newContactsCount} new` : "No new messages" },
    { name: "Gallery Images", value: "48", icon: ImageIcon, color: "bg-orange-500", trend: "+12 this week" },
  ]

  const recentActivity = [
    { action: "New member registered", time: "2 hours ago", type: "member" },
    { action: "Event 'Business Gala' updated", time: "4 hours ago", type: "event" },
    { action: "News article published", time: "1 day ago", type: "news" },
    { action: "Gallery updated with new images", time: "2 days ago", type: "gallery" },
  ]

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome to the IBAG content management system</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:scale-105">
                    <FileText className="h-6 w-6 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-800">Add News</p>
                    <p className="text-xs text-gray-500">Create new article</p>
                  </button>

                  <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:scale-105">
                    <Calendar className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-800">Add Event</p>
                    <p className="text-xs text-gray-500">Schedule new event</p>
                  </button>

                  <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:scale-105">
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-800">Manage Members</p>
                    <p className="text-xs text-gray-500">View member list</p>
                  </button>

                  <Link href="/admin/contacts" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:scale-105 block">
                    <Mail className="h-6 w-6 text-indigo-600 mb-2" />
                    <p className="font-medium text-gray-800">View Contacts</p>
                    <p className="text-xs text-gray-500">Manage submissions</p>
                  </Link>

                  <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:scale-105">
                    <Eye className="h-6 w-6 text-orange-600 mb-2" />
                    <p className="font-medium text-gray-800">View Website</p>
                    <p className="text-xs text-gray-500">Preview public site</p>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
