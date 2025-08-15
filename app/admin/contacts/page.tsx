"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { supabase } from "@/lib/supabase"
import { Mail, Phone, Calendar, User, MessageSquare, Eye, Trash2, CheckCircle } from "lucide-react"

interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject: string
  message: string
  submitted_at: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error('Error fetching contacts:', error)
        return
      }

      setContacts(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)

      if (error) {
        console.error('Error updating status:', error)
        return
      }

      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting contact:', error)
        return
      }

      setContacts(contacts.filter(contact => contact.id !== id))
      setSelectedContact(null)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true
    return contact.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'replied': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <div className="flex-1">
          <AdminHeader />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Submissions</h1>
              <p className="text-gray-600">Manage contact form submissions from your website</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Contacts</p>
                    <p className="text-2xl font-bold text-gray-800">{contacts.length}</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New</p>
                    <p className="text-2xl font-bold text-blue-600">{contacts.filter(c => c.status === 'new').length}</p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Read</p>
                    <p className="text-2xl font-bold text-yellow-600">{contacts.filter(c => c.status === 'read').length}</p>
                  </div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Replied</p>
                    <p className="text-2xl font-bold text-green-600">{contacts.filter(c => c.status === 'replied').length}</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {['all', 'new', 'read', 'replied'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status as any)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        filter === status
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {status} ({status === 'all' ? contacts.length : contacts.filter(c => c.status === status).length})
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contacts List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Contact List</h2>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading contacts...</p>
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="p-8 text-center">
                      <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No contact submissions found</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => setSelectedContact(contact)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedContact?.id === contact.id ? 'bg-purple-50 border-r-4 border-purple-500' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {contact.first_name} {contact.last_name}
                              </h3>
                              <p className="text-sm text-gray-600">{contact.email}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-medium mb-1">{contact.subject}</p>
                          <p className="text-xs text-gray-500">{formatDate(contact.submitted_at)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Contact Details</h2>
                </div>
                {selectedContact ? (
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedContact.first_name} {selectedContact.last_name}
                        </h3>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedContact.status)}`}>
                          {selectedContact.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'read')}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Mark as Read"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Replied"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteContact(selectedContact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${selectedContact.email}`} className="hover:text-purple-600">
                          {selectedContact.email}
                        </a>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${selectedContact.phone}`} className="hover:text-purple-600">
                            {selectedContact.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(selectedContact.submitted_at)}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Subject
                      </h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedContact.subject}</p>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium text-gray-800 mb-2">Message</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a contact to view details</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}