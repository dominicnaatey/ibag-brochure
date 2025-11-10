'use client'

import { useEffect } from 'react'

export function DevSwUnregister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev) return
    if (!('serviceWorker' in navigator)) return

    // Unregister any existing service workers in development to avoid fetch interference
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().catch(() => {})
      })
    })

    // Also try to unregister the active controller if present
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
    }
  }, [])

  return null
}

