"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { membersService } from "@/lib/supabase-service"
import type { Database } from "@/lib/supabase"
import { Plus, Edit, Trash2, Mail, Phone, MapPin, Building, Calendar } from "lucide-react"

type Member = Database['public']['Tables']['members']['Row']
type MemberInsert = Database['public']['Tables']['members']['Insert']
type MemberUpdate = Database['public']['Tables']['members']['Update']

// Extended Member type for UI purposes
type ExtendedMember = Member & {
  status?: 'active' | 'inactive'
  location?: string
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch members from Supabase
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersService.getAll()
        setMembers(data)
      } catch (error) {
        console.error('Error fetching members:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        await membersService.delete(id)
        setMembers(members.filter((member) => member.id !== id))
      } catch (error) {
        console.error('Error deleting member:', error)
      }
    }
  }

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingMember(null)
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Members</h1>
                <p className="text-gray-600">Manage your association members</p>
              </div>
              <Button
                onClick={handleAdd}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Member</span>
              </Button>
            </div>

            {showForm ? (
              <MemberForm
                member={editingMember}
                onSave={(member) => {
                  if (editingMember) {
                    setMembers(members.map((m) => (m.id === member.id ? member : m)))
                  } else {
                    setMembers([...members, { ...member, id: Date.now().toString() }])
                  }
                  setShowForm(false)
                  setEditingMember(null)
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingMember(null)
                }}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {members.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600`}
                      >
                        Active
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building className="h-4 w-4 text-purple-600" />
                        <span>{member.company || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{member.position || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <span>{member.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.membership_type === "corporate"
                            ? "bg-blue-100 text-blue-600"
                            : member.membership_type === "individual"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {member.membership_type}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Joined {new Date(member.joined_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function MemberForm({
  member,
  onSave,
  onCancel,
}: {
  member: Member | null
  onSave: (member: ExtendedMember) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<ExtendedMember>>({
    name: member?.name || "",
    company: member?.company || "",
    position: member?.position || "", // Use position instead of location
    email: member?.email || "",
    phone: member?.phone || "",
    membership_type: member?.membership_type || "individual", // Correct property name
    joined_date: member?.joined_date || new Date().toISOString().split("T")[0], // Correct property name
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create a properly typed member object
    const memberData: ExtendedMember = {
      id: member?.id || "",
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || null, // Ensure null instead of undefined
      company: formData.company || null, // Ensure null instead of undefined
      position: formData.position || null, // Ensure null instead of undefined
      membership_type: formData.membership_type || "individual",
      joined_date: formData.joined_date || new Date().toISOString().split("T")[0],
      created_at: member?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    
    onSave(memberData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{member ? "Edit Member" : "Add New Member"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={formData.company || ""}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={formData.position || ""}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., CEO, Manager, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type *</label>
            <select
              required
              value={formData.membership_type || "individual"}
              onChange={(e) => setFormData({ ...formData, membership_type: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="individual">Individual</option>
              <option value="corporate">Corporate</option>
              <option value="associate">Associate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date *</label>
            <input
              type="date"
              required
              value={formData.joined_date || ""}
              onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            {member ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </div>
  )
}
