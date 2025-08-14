"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-1 h-6 bg-green-600 rounded-sm"></div>
              <div className="w-1 h-6 bg-white border border-gray-200 rounded-sm"></div>
              <div className="w-1 h-6 bg-red-600 rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">IBAG Admin</h1>
              <p className="text-xs text-gray-600">Content Management</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{user?.name}</span>
          </div>

          <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
