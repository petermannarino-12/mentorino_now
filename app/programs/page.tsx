import Link from 'next/link'

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-black uppercase tracking-tighter">Mentorino</Link>
        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-gray-600">About</Link>
          <Link href="/programs" className="text-sm font-medium text-black">Programs</Link>
          <Link href="/faq" className="text-sm font-medium text-gray-600">FAQ</Link>
          <Link href="/apply" className="btn-compact bg-black text-white">Apply Now</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Programs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-gray-50 rounded-3xl">
            <h2 className="text-xl font-black uppercase mb-4">Career Strategist</h2>
            <p className="text-gray-600">Transform your career with personalized strategic direction.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl">
            <h2 className="text-xl font-black uppercase mb-4">Academic Guide</h2>
            <p className="text-gray-600">Navigate your educational journey with expert guidance.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl">
            <h2 className="text-xl font-black uppercase mb-4">Research Mentor</h2>
            <p className="text-gray-600">Advance your research with experienced mentorship.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl">
            <h2 className="text-xl font-black uppercase mb-4">Life Coach</h2>
            <p className="text-gray-600">Achieve balance and fulfillment in all life areas.</p>
          </div>
        </div>
      </main>
    </div>
  )
}