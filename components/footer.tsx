import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/ibag_logo.png" 
                alt="IBAG Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Proudly bridging cultures and opportunities. Fostering collaboration, innovation, and growth among
              businesses rooted in Italian culture.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/who-we-are" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/events-gallery" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Events & Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-gray-800 transition-colors">
                  IBAG News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600 text-sm">info@ibag-ghana.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600 text-sm">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600 text-sm">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2024 Italian Business Association of Ghana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
