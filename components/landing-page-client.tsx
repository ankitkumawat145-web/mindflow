'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  PenLine, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Star,
  Quote,
  Instagram,
  Twitter,
  Github,
  Mail
} from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: "Aria Sterling",
    role: "Digital Nomad",
    text: "Daily Pulse has transformed how I reflect on my travels. The interface is so calming, it actually makes me want to write every single day.",
    avatar: "https://picsum.photos/seed/avatar1/100/100"
  },
  {
    name: "Julian Vane",
    role: "Creative Director",
    text: "Minimalism at its best. No clutter, just my thoughts and the space to grow. The encryption gives me peace of mind for my most private ideas.",
    avatar: "https://picsum.photos/seed/avatar2/100/100"
  },
  {
    name: "Elena Rossi",
    role: "Graduate Student",
    text: "I've tried every journal app. This is the only one that feels like a real paper journal—intentional, quiet, and deeply personal.",
    avatar: "https://picsum.photos/seed/avatar3/100/100"
  }
];

const features = [
  {
    icon: <PenLine className="w-6 h-6" />,
    title: "Artistic Writing",
    description: "A distraction-free environment designed to let your creativity flow without boundaries."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Smart Memory",
    description: "Effortlessly track your emotional growth and revisit memories through beautiful timelines."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Vault-Grade Security",
    description: "Your thoughts are yours alone. End-to-end encryption ensures total privacy for your mind."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Sync",
    description: "Write on your phone, reflect on your tablet. Your pulse stays in sync across all your devices."
  }
];

export default function LandingPageClient({ session }: { session: any }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div className="bg-[#fcfbf9] text-[#1a1a1a] overflow-x-hidden selection:bg-slate-900 selection:text-white font-sans" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-md bg-white/40 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-white font-anton text-xl pt-0.5">D</span>
          </div>
          <span className="font-anton text-2xl tracking-tighter uppercase sm:block hidden">Daily Pulse</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <Link href="#about" className="hover:text-black transition-colors">Our Ethos</Link>
          <Link href="#features" className="hover:text-black transition-colors">Experience</Link>
          <Link href="#reviews" className="hover:text-black transition-colors">Community</Link>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <Link 
              href="/dashboard" 
              className="px-6 py-2 border border-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors px-4">Log In</Link>
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl active:scale-95 translate-y-0 hover:-translate-y-0.5"
              >
                <span className="relative z-10 uppercase text-[10px] tracking-widest">Join Pulse</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 p-4 border border-slate-200 rounded-full bg-white/50 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-slate-400 mb-6 font-bold"
          >
            A Digital Sanctuary for the Soul
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] md:text-[11vw] font-anton leading-[0.82] uppercase tracking-tighter mb-12"
          >
            Evolve Through <br />
            <span className="italic font-serif normal-case tracking-normal text-slate-300 ml-4">Reflection</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mb-12"
          >
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
              Experience the world's most intimate digital journal. Designed to clear the noise and help you capture the true essence of your daily journey.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href={session ? "/dashboard" : "/signup"} 
              className="group flex items-center gap-4 px-10 py-5 bg-slate-900 border border-slate-900 rounded-full text-white font-anton text-xl uppercase tracking-widest shadow-xl hover:shadow-2xl hover:bg-transparent hover:text-slate-900 transition-all active:scale-95"
            >
              Start Writing <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 right-20 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-40 -z-10" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-40 left-10 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-20 -z-10" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 bg-radial-gradient from-white via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-px h-16 bg-slate-900" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-block px-4 py-1 border border-slate-200 rounded-full text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Our Philosophy
            </div>
            <h2 className="text-6xl md:text-8xl font-anton uppercase leading-[0.85] tracking-tighter">
              Clarity <br /> over <br /> <span className="text-slate-300">Complexity.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed font-light max-w-lg">
              We live in an age of constant distraction. Daily Pulse is our answer: a minimalist, high-impact environment where your thoughts are the only priority. No likes, no scrolling, just you and the blank page.
            </p>
            <div className="pt-6">
              <Link href="/signup" className="text-sm font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-slate-500 hover:border-slate-300 transition-all">
                Join the movement
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pb-20">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-[3/4] relative rounded-[40px] overflow-hidden translate-y-20 shadow-2xl"
            >
              <Image src="https://picsum.photos/seed/about1/800/1200" alt="Mindful" fill className="object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-[3/4] relative rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image src="https://picsum.photos/seed/about2/800/1200" alt="Reflect" fill className="object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-40 bg-slate-900 text-white rounded-[60px] md:rounded-[120px] mx-4 mb-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-anton uppercase tracking-tighter leading-none">
                Crafted for <br /> Perfection.
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm text-lg font-light leading-relaxed mb-4">
              Advanced tools hidden behind a simple interface. Everything you need to capture a lifetime of memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="p-10 border border-white/5 rounded-[40px] hover:bg-white/5 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-black transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-anton uppercase tracking-tight mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-32 p-12 bg-white/5 border border-white/10 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <h4 className="text-3xl font-anton uppercase tracking-tight">Ready to see your transformation?</h4>
              <p className="text-slate-400 font-light">Join over 10,000 creators who trust their minds with Daily Pulse.</p>
            </div>
            <Link href="/signup" className="px-12 py-5 bg-white text-black rounded-full font-anton text-xl uppercase tracking-widest hover:scale-105 transition-transform">
              Join the elite
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-40 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-32 space-y-8">
          <Quote className="w-16 h-16 text-slate-100 mx-auto" />
          <h2 className="text-6xl md:text-8xl font-anton uppercase tracking-tighter">
            Mindful <br /> Feedback.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 border border-slate-100 rounded-[50px] bg-white flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <div className="space-y-10">
                <div className="flex gap-1 text-slate-900">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-2xl font-serif italic text-slate-800 leading-relaxed">
                  "{t.text}"
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden grayscale">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h5 className="font-anton uppercase tracking-tight text-sm">{t.name}</h5>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white px-6 md:px-12 border-t border-slate-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-6 gap-16 mb-40">
            <div className="lg:col-span-3 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-anton text-2xl pt-1">D</span>
                </div>
                <span className="font-anton text-4xl tracking-tighter uppercase">Daily Pulse</span>
              </div>
              <p className="max-w-md text-xl text-slate-400 font-light leading-relaxed">
                Empowering individuals to find peace and clarity through artistic digital journaling. Your mind, your pulse, your journey.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Instagram className="w-5 h-5 text-slate-900" />
                </Link>
                <Link href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Twitter className="w-5 h-5 text-slate-900" />
                </Link>
                <Link href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Github className="w-5 h-5 text-slate-900" />
                </Link>
              </div>
            </div>
            
            <div className="space-y-8">
              <h6 className="font-anton uppercase tracking-widest text-xs text-slate-900">Experience</h6>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="hover:text-black transition-colors cursor-pointer">Writing Lab</li>
                <li className="hover:text-black transition-colors cursor-pointer">Memory Vault</li>
                <li className="hover:text-black transition-colors cursor-pointer">Mobile Flow</li>
                <li className="hover:text-black transition-colors cursor-pointer">Encryption</li>
              </ul>
            </div>
            
            <div className="space-y-8">
              <h6 className="font-anton uppercase tracking-widest text-xs text-slate-900">Ethos</h6>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="hover:text-black transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-black transition-colors cursor-pointer Privacy First cursor-pointer link">Privacy First</li>
                <li className="hover:text-black transition-colors cursor-pointer">Security</li>
                <li className="hover:text-black transition-colors cursor-pointer">Terms</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h6 className="font-anton uppercase tracking-widest text-xs text-slate-900">Reach Out</h6>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="hover:text-black transition-colors cursor-pointer flex items-center gap-2"><Mail className="w-3 h-3" /> hello@pulse.io</li>
                <li className="hover:text-black transition-colors cursor-pointer">Press Media</li>
                <li className="hover:text-black transition-colors cursor-pointer underline offset-4 underline-offset-4">Join Careers</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">
              © 2026 Daily Pulse Studio • Crafted with intent
            </p>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Network Secure
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Region: Asia-Pacific</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
