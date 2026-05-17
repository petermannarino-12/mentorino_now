'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Application {
  id: string
  userName: string
  userEmail: string
  mentorType: string
  status: string
  createdAt: string
}

interface UserData {
  id: string
  email: string
  fullName: string
  role: string
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !user) {
      redirect('/auth')
    }

    if (user) {
      // Fetch user data from our API
      fetch('/api/users')
        .then((res) => res.json())
        .then((data) => {
          const currentUser = data.find((u: UserData) => u.email === user.primaryEmailAddress?.emailAddress)
          setUserData(currentUser || null)
        })
        .catch(console.error)

      // Fetch applications if mentor
      fetch('/api/applications')
        .then((res) => res.json())
        .then((data) => setApplications(data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [user, isLoaded])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    )
  }

  const isMentor = userData?.role === 'mentor'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome, {user?.firstName || 'User'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {isMentor ? (
          /* Mentor Dashboard */
          <div className="space-y-8">
            <div className="bg-black text-white p-8 rounded-3xl">
              <h2 className="text-3xl font-black uppercase mb-2">Mentor Portal</h2>
              <p className="text-gray-400">Manage applications and mentees</p>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-lg font-bold uppercase mb-4">Recent Applications</h3>
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <p className="text-gray-500">No applications yet</p>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">{app.userName}</h4>
                        <p className="text-sm text-gray-500">{app.userEmail}</p>
                        <p className="text-xs text-gray-400 mt-1">{app.mentorType}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                          app.status === 'accepted' ? 'bg-green-50 text-green-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {app.status}
                        </span>
                        {app.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => fetch(`/api/applications/${app.id}?action=accept`, { method: 'PUT' })
                                .then(() => window.location.reload())}
                              className="px-4 py-2 bg-green-500 text-white text-xs font-bold uppercase rounded-lg hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => fetch(`/api/applications/${app.id}?action=reject`, { method: 'PUT' })
                                .then(() => window.location.reload())}
                              className="px-4 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded-lg hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Mentee Dashboard */
          <div className="space-y-8">
            <div className="bg-black text-white p-8 rounded-3xl">
              <h2 className="text-3xl font-black uppercase mb-2">Your Growth Hub</h2>
              <p className="text-gray-400">Track your mentorship journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold uppercase mb-2">Your Application</h3>
                <p className="text-gray-500 text-sm">
                  {userData ? 'Application status will appear here' : 'Please wait while we verify your account...'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold uppercase mb-2">Sessions</h3>
                <p className="text-gray-500 text-sm">No sessions scheduled yet</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}