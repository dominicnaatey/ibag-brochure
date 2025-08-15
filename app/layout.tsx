import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Italian Business Association of Ghana - IBAG",
  description:
    "Connecting Italian Heritage to Ghana's Business Landscape. Fostering collaboration, innovation, and growth among businesses rooted in Italian culture.",
  generator: "v0.app",
  keywords:
    "Italian Business Association, Ghana, IBAG, Italian companies Ghana, business networking, trade, investment",
  authors: [{ name: "IBAG Communications Team" }],
  icons: {
    icon: '/ibag_logo.ico',
    shortcut: '/ibag_logo.ico',
    apple: '/ibag_logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Italian Business Association of Ghana - IBAG",
    description: "Connecting Italian Heritage to Ghana's Business Landscape",
    type: "website",
    locale: "en_US",
    images: [{
      url: '/ibag_logo.png',
      width: 1200,
      height: 630,
      alt: 'IBAG - Italian Business Association of Ghana',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Italian Business Association of Ghana - IBAG",
    description: "Connecting Italian Heritage to Ghana's Business Landscape",
    images: ['/ibag_logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IBAG",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'application-name': 'IBAG',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body className="font-sans" suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
