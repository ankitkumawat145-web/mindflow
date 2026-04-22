import Link from 'next/link';
import { BookText, PenLine, Sparkles, ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <BookText className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl tracking-tight">Daily Pulse</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {session ? (
            <Link
              className="text-sm font-medium hover:text-indigo-600 transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                className="text-sm font-medium hover:text-indigo-600 transition-colors"
                href="/login"
              >
                Log In
              </Link>
              <Link
                className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                href="/signup"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Your private sanctuary for thoughts</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
              Capture every moment,<br />cherish every memory.
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl mb-10 leading-relaxed">
              Better than a paper journal. Secure, accessible anywhere, and designed for your daily reflection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={session ? "/dashboard" : "/signup"}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
              >
                Start Journaling Now
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="p-3 bg-indigo-100 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-slate-500">
                  Your thoughts are personal. We use industry-standard encryption to keep your data safe.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <PenLine className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Simple Writing</h3>
                <p className="text-slate-500">
                  Minimalist interface designed to help you focus on your writing without distractions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Reflect & Grow</h3>
                <p className="text-slate-500">
                  Look back on your journey and see how you have evolved over time with easy viewing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Daily Pulse Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link className="text-sm text-slate-500 hover:text-indigo-600" href="#">Privacy</Link>
            <Link className="text-sm text-slate-500 hover:text-indigo-600" href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
