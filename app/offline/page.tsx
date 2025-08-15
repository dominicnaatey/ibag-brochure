"use client"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          You're offline
        </h1>
        <p className="text-gray-600 mb-6">
          Please check your internet connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}