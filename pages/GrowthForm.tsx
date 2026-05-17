
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  User, 
  Linkedin, 
  FileText, 
  Shirt, 
  MessageSquare, 
  Map, 
  Mic2,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../src/contexts/AuthContext';
import { TaskActivity, User as UserType } from '../src/types';
import { getNJISOString } from '../src/lib/dateUtils';
import { validationService } from '../src/services/validationService';
import { Toaster, toast } from 'sonner';

const GrowthForm = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState<Partial<TaskActivity>>({
    pb_card_creation: false,
    pb_linkedin_review: false,
    pb_resume_review: false,
    pb_cover_letter: false,
    pb_dress_code: false,
    pb_greeting_intro: false,
    roadmap_topic: '',
    interview_recommendation: '',
    status: 'pending'
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    setCurrentUser(user);

    // Check localStorage for existing activity (demo mode)
    const stored = localStorage.getItem('task_activities');
    if (stored) {
      const activities = JSON.parse(stored);
      const existing = activities.find((a: TaskActivity) => a.user_id === user.id);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [user, navigate]);

  const toggleCheck = (field: keyof TaskActivity) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (field: keyof TaskActivity, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Run dynamic validation
    const validationErrors = validationService.validateEntity('TaskActivity', formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Strategic audit contains validation errors.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const activityData: Partial<TaskActivity> = {
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      status: 'pending',
      
      // Defaults/Previous
      net_attended_event: formData.net_attended_event || '',
      net_people_met: formData.net_people_met || '',
      net_contact_info: formData.net_contact_info || '',
      net_panel_summary: formData.net_panel_summary || '',
      pw_introduction: formData.pw_introduction || '',
      pw_volunteer_hours: formData.pw_volunteer_hours || '',
      cert_topic: formData.cert_topic || '',
      
      // Current Form Data
      ...formData as any
    };

    if (formData.id) {
       await supabase.from('task_activities').update(activityData).eq('id', formData.id);
    } else {
       await supabase.from('task_activities').insert(activityData);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Step 2: Growth Strategy</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-black">
              Career <span className="text-slate-300">Architecture.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-2xl">
              This form establishes your professional foundation. Complete these sections to prepare for Peter's review and strategic feedback.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Personal Branding Section */}
            <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Personal Branding</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Visibility & Identity</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { field: 'pb_card_creation', label: 'Business Card Creation', icon: User },
                  { field: 'pb_linkedin_review', label: 'LinkedIn Optimization', icon: Linkedin },
                  { field: 'pb_resume_review', label: 'Resume Finalization', icon: FileText },
                  { field: 'pb_cover_letter', label: 'Cover Letter Template', icon: MessageSquare },
                  { field: 'pb_dress_code', label: 'Professional Attire Set', icon: Shirt },
                  { field: 'pb_greeting_intro', label: 'The 30s Elevator Intro', icon: Mic2 },
                ].map((item) => (
                  <button
                    key={item.field}
                    type="button"
                    onClick={() => toggleCheck(item.field as keyof TaskActivity)}
                    className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${
                      formData[item.field as keyof TaskActivity] 
                        ? 'bg-black text-white border-black shadow-xl shadow-black/10' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    {formData[item.field as keyof TaskActivity] ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Career Roadmap Section */}
            <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Map size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Career Roadmap</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Strategy & Direction</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PRIMARY CAREER TOPIC/GOAL</label>
                <textarea
                  value={formData.roadmap_topic}
                  onChange={(e) => handleInputChange('roadmap_topic', e.target.value)}
                  placeholder="Describe your 12-month career objective and the specific role you are targeting..."
                  className={`w-full p-8 bg-slate-50 border rounded-[32px] text-sm font-medium focus:bg-white focus:border-black transition-all min-h-[150px] ${errors.roadmap_topic ? 'border-red-500 bg-red-50/50' : 'border-slate-100'}`}
                  required
                />
                {errors.roadmap_topic && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <AlertCircle size={12} /> {errors.roadmap_topic}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Interview Prep Section */}
            <div className="bg-white p-10 rounded-[48px] border border-black/[0.03] shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Mic2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Interview Mastery</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">The Recommendation Process</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">INTERVIEW PREPARATION NOTES</label>
                <textarea
                  value={formData.interview_recommendation}
                  onChange={(e) => handleInputChange('interview_recommendation', e.target.value)}
                  placeholder="Summarize your progress with the recommendation process and any specific hurdles in interview prep..."
                  className={`w-full p-8 bg-slate-50 border rounded-[32px] text-sm font-medium focus:bg-white focus:border-black transition-all min-h-[150px] ${errors.interview_recommendation ? 'border-red-500 bg-red-50/50' : 'border-slate-100'}`}
                  required
                />
                {errors.interview_recommendation && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <AlertCircle size={12} /> {errors.interview_recommendation}
                  </p>
                )}
              </div>
            </div>

            {/* Submission */}
            <div className="flex items-center justify-between pt-8">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
              >
                Cancel & Return
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`flex items-center gap-3 px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                  isSuccess 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-black text-white hover:scale-105 active:scale-95 shadow-2xl shadow-black/20'
                }`}
              >
                {isSubmitting ? (
                  <>Saving Strategy...</>
                ) : isSuccess ? (
                  <><Check size={16} /> Saved Successfully</>
                ) : (
                  <>Submit for Review <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GrowthForm;
