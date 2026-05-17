'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function ApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    mentorType: '',
    meetingPreference: 'Virtual',
    frequency: 'Weekly',
    goals: '',
    seriousness: 5,
  })

  const totalSteps = 4

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (currentStep: number): string | null => {
    switch (currentStep) {
      case 1:
        if (!formData.mentorType) return 'Please select a mentor type'
        if (!formData.userName.trim()) return 'Please enter your name'
        if (!formData.userEmail.includes('@')) return 'Please enter a valid email'
        if (!formData.userPhone.trim()) return 'Please enter your phone'
        return null
      case 2:
        return null
      case 3:
        if (formData.goals.trim().length < 20) return 'Please provide more detail (at least 20 characters)'
        return null
      default:
        return null
    }
  }

  const nextStep = () => {
    const error = validateStep(step)
    if (error) {
      toast.error(error)
      return
    }
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setIsSubmitted(true)
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-3">Application Sent</h1>
        <p className="text-gray-500 max-w-md mb-8">
          Peter is reviewing your application. You will receive an email within 48 hours.
        </p>
        <button onClick={() => router.push('/')} className="btn-normal bg-black text-white px-8 py-3">
          Return Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <button onClick={() => router.back()} className="mb-8 text-gray-400 hover:text-black">
        ← Back
      </button>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
          <span>Step {step}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full bg-black rounded-full transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase">Profile & Goals</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">1. Mentor Type</label>
                <select
                  value={formData.mentorType}
                  onChange={(e) => updateField('mentorType', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                >
                  <option value="">Select...</option>
                  <option value="Career Strategist">Career Strategist</option>
                  <option value="Academic Guide">Academic Guide</option>
                  <option value="Research Mentor">Research Mentor</option>
                  <option value="Industry Expert">Industry Expert</option>
                  <option value="Life Coach">Life Coach</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">2. Name</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => updateField('userName', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">3. Phone</label>
                  <input
                    type="tel"
                    value={formData.userPhone}
                    onChange={(e) => updateField('userPhone', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">4. Email</label>
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => updateField('userEmail', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase">Meeting Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Meeting Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Virtual', 'In-Person', 'Hybrid'].map((pref) => (
                    <button
                      key={pref}
                      onClick={() => updateField('meetingPreference', pref)}
                      className={`py-4 rounded-2xl border font-bold uppercase text-xs ${
                        formData.meetingPreference === pref
                          ? 'bg-black text-white'
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => updateField('frequency', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl"
                >
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase">Your Goals</h2>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                What is your main goal in working with a mentor?
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => updateField('goals', e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl min-h-[160px]"
                placeholder="Be specific about what you want to achieve..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                How serious are you? (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.seriousness}
                onChange={(e) => updateField('seriousness', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 font-bold uppercase">
                <span>Exploring</span>
                <span>{formData.seriousness}</span>
                <span>Extremely Serious</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase">Commitment</h2>
            <p className="text-gray-500">
              By submitting this application, you agree to the mentorship commitment terms.
            </p>
          </div>
        )}

        <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`font-bold uppercase text-xs tracking-wider ${step === 1 ? 'text-gray-200' : 'text-gray-400 hover:text-black'}`}
          >
            ← Back
          </button>
          {step < totalSteps ? (
            <button onClick={nextStep} className="btn-normal bg-black text-white">
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-normal bg-black text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Inquiry'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}