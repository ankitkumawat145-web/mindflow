'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, Heart } from 'lucide-react';
import { login } from '@/app/actions/auth';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen flex bg-[#fcfbf9] selection:bg-slate-900 selection:text-white">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-24">
        <div className="relative z-10 space-y-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-slate-900 font-anton text-xl pt-0.5">D</span>
            </div>
            <span className="text-white font-anton text-3xl tracking-tighter uppercase">Daily Pulse</span>
          </Link>
          <h1 className="text-7xl font-anton uppercase text-white leading-tight tracking-tighter">
            Welcome <br /> Back to <br /> your <span className="text-slate-500">Pulse.</span>
          </h1>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md">
            The sanctuary is open. Return to your thoughts and pick up exactly where you left off.
          </p>
          <div className="flex items-center gap-4 text-amber-400">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-xs font-bold uppercase tracking-widest">Your Private Space Awaits</span>
          </div>
        </div>
        
        {/* Animated Background */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[80vw] h-[80vw] bg-slate-800 rounded-full blur-[150px] opacity-20"
        />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full space-y-10"
        >
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
            </Link>
            <h2 className="text-5xl font-anton uppercase tracking-tighter text-slate-900">
              Reconnect
            </h2>
            <p className="text-slate-500 font-light">
              Sign in to access your secure journal vault.
            </p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-2xl border border-red-100"
              >
                {error}
              </motion.div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-4">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-6 py-4 rounded-[20px] border-none bg-white shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-slate-900 transition-all outline-none text-slate-900"
                  placeholder="name@personal.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-4">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-6 py-4 rounded-[20px] border-none bg-white shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-slate-900 transition-all outline-none text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-16 flex justify-center items-center py-3 px-4 bg-slate-900 text-white rounded-[20px] font-anton text-xl uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-200 active:scale-95"
            >
              {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : "Enter Vault"}
            </button>
          </form>
          
          <div className="text-center pt-8 border-t border-slate-100">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">New here? </span>
            <Link href="/signup" className="text-[10px] uppercase tracking-widest font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5 ml-2 hover:text-slate-500 hover:border-slate-300 transition-all">
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
