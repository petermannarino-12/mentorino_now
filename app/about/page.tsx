import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-black uppercase tracking-tighter">Mentorino</Link>
        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-black">About</Link>
          <Link href="/programs" className="text-sm font-medium text-gray-600">Programs</Link>
          <Link href="/faq" className="text-sm font-medium text-gray-600">FAQ</Link>
          <Link href="/apply" className="btn-compact bg-black text-white">Apply Now</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">About</h1>
        <div className="space-y-6 text-gray-600">
          <p className="text-lg">Mentorino is a premium 1-on-1 mentorship platform founded by Peter Mannarino.</p>
          <p>We provide personalized guidance for career, education, and life transformation.</p>
          <p>Our approach is selective - we only accept applicants who demonstrate genuine commitment to growth.</p>
        </div>
      </main>
    </div>
  )
}