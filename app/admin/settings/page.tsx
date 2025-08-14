"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Save, Settings, Globe, Mail, Phone, MapPin } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Italian Business Association of Ghana",
    siteDescription: "Connecting Italian Heritage to Ghana's Business Landscape",
    contactEmail: "info@ibag-ghana.org",
    contactPhone: "+233 30 276 8945",
    contactAddress: "IBAG House, 123 Liberation Road, Ridge, Accra, Ghana",
    socialFacebook: "https://facebook.com/ibag-ghana",
    socialTwitter: "https://twitter.com/ibag_ghana",
    socialLinkedin: "https://linkedin.com/company/ibag-ghana",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to database
    alert("Settings saved successfully!")
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your website settings and configuration</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings Categories</h2>
                  <nav className="space-y-2">
                    <a
                      href="#general"
                      className="flex items-center space-x-3 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg"
                    >
                      <Settings className="h-4 w-4" />
                      <span>General</span>
                    </a>
                    <a
                      href="#contact"
                      className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Contact Info</span>
                    </a>
                    <a
                      href="#social"
                      className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Social Media</span>
                    </a>
                  </nav>
                </div>
              </div>

              {/* Settings Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSave} className="space-y-8">
                  {/* General Settings */}
                  <div id="general" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">General Settings</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                        <textarea
                          rows={3}
                          value={settings.siteDescription}
                          onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="maintenance"
                            checked={settings.maintenanceMode}
                            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
                          />
                          <label htmlFor="maintenance" className="text-sm text-gray-700">
                            Enable maintenance mode
                          </label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="registrations"
                            checked={settings.allowRegistrations}
                            onChange={(e) => setSettings({ ...settings, allowRegistrations: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
                          />
                          <label htmlFor="registrations" className="text-sm text-gray-700">
                            Allow new member registrations
                          </label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="notifications"
                            checked={settings.emailNotifications}
                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
                          />
                          <label htmlFor="notifications" className="text-sm text-gray-700">
                            Enable email notifications
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div id="contact" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="inline h-4 w-4 mr-2" />
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="inline h-4 w-4 mr-2" />
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={settings.contactPhone}
                          onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline h-4 w-4 mr-2" />
                          Contact Address
                        </label>
                        <textarea
                          rows={3}
                          value={settings.contactAddress}
                          onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div id="social" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Social Media Links</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                        <input
                          type="url"
                          value={settings.socialFacebook}
                          onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                        <input
                          type="url"
                          value={settings.socialTwitter}
                          onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                        <input
                          type="url"
                          value={settings.socialLinkedin}
                          onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Settings</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
