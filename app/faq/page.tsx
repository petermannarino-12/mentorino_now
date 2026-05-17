import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <Link href="/" className="text-2xl font-black uppercase tracking-tighter">Mentorino</Link>
        <nav className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium text-gray-600">About</Link>
          <Link href="/programs" className="text-sm font-medium text-gray-600">Programs</Link>
          <Link href="/faq" className="text-sm font-medium text-black">FAQ</Link>
          <Link href="/apply" className="btn-compact bg-black text-white">Apply Now</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">FAQ</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold uppercase mb-2">How do I apply?</h2>
            <p className="text-gray-600">Click "Apply Now" and complete the application form. Peter reviews each application personally.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase mb-2">How long does review take?</h2>
            <p className="text-gray-600">We typically respond within 48 hours of receiving your application.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase mb-2">What happens after I'm accepted?</h2>
            <p className="text-gray-600">You'll receive an email with instructions to create your account and access the dashboard.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase mb-2">Is there a cost?</h2>
            <p className="text-gray-600">Mentorino operates on a selective application basis. Pricing details will be shared upon acceptance.</p>
          </div>
        </div>
      </main>
    </div>
  )
}