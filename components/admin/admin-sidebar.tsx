"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Calendar, Users, ImageIcon, Settings, Home, Mail } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News Articles", href: "/admin/news", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8">
          <Home className="h-4 w-4" />
          <span className="text-sm">Back to Website</span>
        </Link>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
