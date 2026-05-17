import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../src/components/SEO';
import { Lock, Loader2 } from 'lucide-react';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Demo mode - just show success
      setNotification('Password reset functionality disabled (backend removed).');
      setTimeout(() => navigate('/auth'), 2000);
    } catch (err: any) {
      setError('Demo mode - password reset unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 animate-in fade-in duration-700">
      <SEO title="Reset Password" description="Reset your Mentorino password." />
      
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-black/10">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">RESET PASSWORD</h1>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Create a new secure key</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[40px] sm:rounded-[48px] border border-black/[0.03] shadow-2xl space-y-6">
          <div className="bg-amber-50 p-3 rounded-xl mb-4 text-center">
            <p className="text-[8px] font-black text-amber-700 uppercase">Demo Mode - Backend Removed</p>
          </div>

          {notification && (
            <div className="bg-emerald-50 p-4 rounded-xl text-center">
              <p className="text-[10px] font-black text-emerald-600 uppercase">{notification}</p>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-xs font-medium focus:bg-white focus:border-black transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-[10px] text-red-500 font-bold text-center">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="btn-normal bg-black text-white w-full flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'UPDATE PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;