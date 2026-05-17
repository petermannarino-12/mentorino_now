import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="text-2xl font-black uppercase tracking-tighter">Mentorino</div>
        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black">
            About
          </Link>
          <Link href="/programs" className="text-sm font-medium text-gray-600 hover:text-black">
            Programs
          </Link>
          <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-black">
            FAQ
          </Link>
          <Link href="/apply" className="btn-compact bg-black text-white">
            Apply Now
          </Link>
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Find Your<br/>Trajectory.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Premium 1-on-1 mentorship for career, education, and life guidance. 
          Transform your future with personalized strategic direction.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/apply" className="btn-normal bg-black text-white px-8 py-4">
            Start Application
          </Link>
          <Link href="/programs" className="btn-normal bg-gray-100 text-black px-8 py-4">
            View Programs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4 text-xl font-black">1</div>
            <h3 className="text-xl font-black uppercase mb-2">Apply</h3>
            <p className="text-gray-500">Submit your application and share your goals with Peter.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4 text-xl font-black">2</div>
            <h3 className="text-xl font-black uppercase mb-2">Review</h3>
            <p className="text-gray-500">Peter personally reviews each application within 48 hours.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4 text-xl font-black">3</div>
            <h3 className="text-xl font-black uppercase mb-2">Grow</h3>
            <p className="text-gray-500">Get accepted and begin your transformation journey.</p>
          </div>
        </div>
      </section>
    </main>
  )
}