'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen flex selection:bg-slate-900 selection:text-white">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-24">
        <div className="relative z-10 space-y-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-slate-900 font-anton text-xl pt-0.5">D</span>
            </div>
            <span className="text-white font-anton text-3xl tracking-tighter uppercase">Daily Pulse</span>
          </Link>
          <h1 className="text-7xl font-anton uppercase text-white leading-[0.85] tracking-tighter">
            Enter Your <br /> Personal <br /> <span className="text-white/20">Archive.</span>
          </h1>
          <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md">
            The sanctuary is open. Return to your sanctuary and pick up exactly where you left off.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sovereign Privacy Active</span>
            </div>
            <div className="flex items-center gap-4 text-white/40">
              <Heart className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Crafted by Ankit Kumawat</span>
            </div>
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative bg-[#fcfbf9]">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-10 left-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-white font-anton text-sm pt-0.5">D</span>
            </div>
            <span className="font-anton text-xl tracking-tighter uppercase">Daily Pulse</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full space-y-10"
        >
          <div className="space-y-4">
            <Link href="/" className="hidden lg:flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
            </Link>
            <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-tighter text-slate-900">
              Welcome Back.
            </h2>
            <p className="text-slate-400 md:text-slate-500 font-light">
              Reconnect with your inner dialogue. Your secure vault awaits.
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
