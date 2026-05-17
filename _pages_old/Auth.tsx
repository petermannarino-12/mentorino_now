import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import SEO from '../src/components/SEO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../src/contexts/AuthContext';
import { notifySuccess } from '../src/lib/toast';
import { loginSchema, signUpSchema, type LoginFormData, type SignUpFormData } from '../src/schemas/auth';

const AuthPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  const queryParams = new URLSearchParams(window.location.search);
  const initialRole = queryParams.get('role');

  const isAdminMode = initialRole === 'admin';
  const isMentorMode = initialRole === 'mentor';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const email = watch('email');

  const handleForgotPassword = async () => {
    notifySuccess('Password reset functionality disabled (backend removed).');
  };

  const handleOAuth = async () => {
    notifySuccess('OAuth functionality disabled (backend removed).');
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        notifySuccess('Demo mode: Account created successfully!');
        setIsSignUp(false);
        reset();
      } else {
        const role = isAdminMode ? 'admin' : isMentorMode ? 'mentor' : 'mentee';
        signIn(data.email.trim(), role);
        notifySuccess('Signed in successfully!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-12 animate-in fade-in duration-700">
      <SEO 
        title={isSignUp ? "Create Account" : "Sign In"} 
        description="Join Mentorino or sign in to your workspace."
      />
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest">
        <ArrowLeft size={14} /> BACK
      </Link>

      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-lg font-black mx-auto mb-4 shadow-xl shadow-black/10">M</div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-1 uppercase">
            {isAdminMode ? 'ADMIN PORTAL' : isMentorMode ? 'MENTOR PORTAL' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </h1>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
            {isAdminMode 
              ? 'SECURE ACCESS FOR PETER MANNARINO'
              : isMentorMode ? 'MENTOR ACCESS TO MENTORINO WORKSPACE'
              : isSignUp ? 'JOIN THE MENTORINO COMMUNITY' : 'WELCOME BACK TO MENTORINO WORKSPACE (DEMO)'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[40px] sm:rounded-[48px] border border-black/[0.03] shadow-2xl">
          <div className="bg-amber-50 p-3 rounded-xl mb-4 text-center">
            <p className="text-[8px] font-black text-amber-700 uppercase">Demo Mode - No Backend</p>
          </div>
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {isSignUp && (
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">FULL NAME</label>
                <div className="relative">
                  <input 
                    {...register('fullName')}
                    type="text" 
                    className={`w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-100'} rounded-xl sm:rounded-[20px] text-xs font-medium text-center focus:bg-white focus:border-black transition-all outline-none`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-[8px] text-red-500 font-bold uppercase mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-1 sm:space-y-1.5">
              <label className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">EMAIL ADDRESS</label>
              <div className="relative">
                <input 
                  {...register('email')}
                  type="email" 
                  className={`w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-xl sm:rounded-[20px] text-xs font-medium text-center focus:bg-white focus:border-black transition-all outline-none`}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-[8px] text-red-500 font-bold uppercase mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">PASSWORD</label>
                {!isSignUp && (
                  <button type="button" onClick={handleForgotPassword} className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-black">FORGOT?</button>
                )}
              </div>
              <div className="relative">
                <input 
                  {...register('password')}
                  type="password" 
                  className={`w-full px-5 sm:px-6 py-3 sm:py-4 bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-100'} rounded-xl sm:rounded-[20px] text-xs font-medium text-center focus:bg-white focus:border-black transition-all outline-none`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-[8px] text-red-500 font-bold uppercase mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="btn-normal bg-black text-white w-full flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </button>

            {!isSignUp && (
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-[8px] uppercase tracking-widest font-black">
                    <span className="bg-white px-2 text-slate-400">OR CONTINUE WITH</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={handleOAuth} disabled={isLoading} className="btn-normal bg-white border border-slate-200 text-slate-900 w-full hover:bg-slate-50">GOOGLE</button>
                  <button type="button" onClick={handleOAuth} disabled={isLoading} className="btn-normal bg-white border border-slate-200 text-slate-900 w-full hover:bg-slate-50">GITHUB</button>
                </div>
              </div>
            )}

            {!isAdminMode && (
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    reset();
                  }}
                  className="text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-black transition-colors"
                >
                  {isSignUp ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;