'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  Mail,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowDown
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    text: "Daily Pulse is the first digital medium that successfully replicates the therapeutic stillness of a physical journal. It's a breakthrough in digital wellness.",
    avatar: "https://picsum.photos/seed/doctor/100/100"
  },
  {
    name: "Markus Thorne",
    role: "Series B Founder",
    text: "In the chaos of building a company, Ankit's vision for 'The Pulse' gave me a place to think. It's not an app; it's a strategic edge.",
    avatar: "https://picsum.photos/seed/tech/100/100"
  },
  {
    name: "Elena Rossi",
    role: "Visual Artist",
    text: "Minimalism at its best. No features you don't need—just pure, unadulterated space for my most complex creative blocks to dissolve.",
    avatar: "https://picsum.photos/seed/artist/100/100"
  }
];

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Sanctuary-Grade Privacy",
    description: "Military-grade encryption ensures your thoughts are truly yours. No tracking, no data selling, ever."
  },
  {
    icon: <PenLine className="w-8 h-8" />,
    title: "The Flow Editor",
    description: "A typography-first writing experience designed to induce psychological 'state of flow' in seconds."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Seamless Ecosystem",
    description: "The Pulse follows you. Start on your desktop, refine on your phone—it's one continuous breath."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Legacy Archive",
    description: "Build a lifetime of memories. Our intelligent timeline helps you see the evolution of your own soul."
  }
];

export default function LandingPageClient({ session }: { session: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const isFounderInView = useInView(founderRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScroll = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div className="bg-[#fcfbf9] text-[#1a1a1a] overflow-x-hidden selection:bg-slate-900 selection:text-white font-sans" ref={containerRef}>
      {/* Premium Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-xl bg-white/60 border-b border-slate-100/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center transform active:scale-90 transition-transform cursor-pointer">
            <span className="text-white font-anton text-lg pt-0.5">D</span>
          </div>
          <span className="font-anton text-xl tracking-tighter uppercase sm:block hidden">Daily Pulse</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
          <Link href="#ethos" className="hover:text-black transition-all hover:tracking-[0.35em]">Our Ethos</Link>
          <Link href="#experience" className="hover:text-black transition-all hover:tracking-[0.35em]">Experience</Link>
          <Link href="#founder" className="hover:text-black transition-all hover:tracking-[0.35em]">The Vision</Link>
          <Link href="#community" className="hover:text-black transition-all hover:tracking-[0.35em]">Community</Link>
        </div>

        <div className="flex items-center gap-6">
          {session ? (
            <Link 
              href="/dashboard" 
              className="px-7 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Enter Sanctuary
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors px-2">Sign In</Link>
              <Link 
                href="/signup" 
                className="group relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white bg-slate-900 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl active:scale-95 translate-y-0 hover:-translate-y-0.5"
              >
                <span className="relative z-10 uppercase text-[10px] tracking-widest">Join for Free</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section: Editorial & High Impact */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
        <motion.div 
          style={{ scale: heroScroll, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-1.5 border border-slate-200 rounded-full bg-white/50 backdrop-blur-sm"
          >
            <div className="bg-slate-50 px-5 py-2 rounded-full flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Official Release • v2.0 Ready</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] sm:text-[15vw] md:text-[10vw] font-anton leading-[0.8] uppercase tracking-tighter mb-8 text-slate-900"
          >
            Heal Your <br />
            <span className="italic font-serif normal-case tracking-normal text-slate-300 pl-4 border-l-4 border-slate-900 ml-2">Mind.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mb-12 px-4"
          >
            <p className="text-slate-500 text-base sm:text-lg md:text-2xl font-light leading-relaxed">
              Unlock the science of self-reflection. Daily Pulse isn't just an app—it's a psychological sanctuary designed to induce flow and restore mental clarity in a noisy world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            <Link 
              href={session ? "/dashboard" : "/signup"} 
              className="group flex items-center gap-4 px-10 py-5 sm:px-12 sm:py-6 bg-slate-900 text-white rounded-full font-anton text-xl sm:text-2xl uppercase tracking-[0.1em] shadow-2xl hover:shadow-slate-300 transition-all active:scale-95"
            >
              Begin Reflection <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <div className="flex flex-col items-center gap-3">
              <div className="flex -space-x-3 sm:-space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm relative">
                    <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Trusted by 10,000+ Seekers of Clarity</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Parallax Background Orbs */}
        <motion.div style={{ y: y1 }} className="absolute top-20 right-[-10%] w-[40vw] h-[40vw] bg-amber-50 rounded-full blur-[120px] opacity-40 -z-10" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-slate-100 rounded-full blur-[150px] opacity-30 -z-10" />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore the Pulse</span>
          <div className="w-px h-16 bg-slate-900 animate-pulse" />
        </div>
      </section>

      {/* The Founder's Vision: TRUST SECTION */}
      <section id="founder" ref={founderRef} className="py-24 md:py-40 px-6 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isFounderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl bg-slate-200">
              <Image 
                src="https://picsum.photos/seed/ankit_founder/1200/1500" 
                alt="Founder Ankit Kumawat" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-10 bg-slate-900 border-[6px] sm:border-[10px] border-white text-white p-8 sm:p-12 rounded-[30px] sm:rounded-[50px] shadow-2xl z-20">
              <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-slate-500 mb-4 sm:mb-6" />
              <p className="text-base sm:text-xl font-serif italic mb-4 sm:mb-6 leading-relaxed max-w-[200px] sm:max-w-xs">
                "Writing is the only way to silence the echo of the world."
              </p>
              <div>
                <h4 className="font-anton uppercase text-lg sm:text-xl leading-none font-normal">Ankit Kumawat</h4>
                <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 mt-2">Founder & Curator</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-10 md:space-y-12 order-1 lg:order-2">
            <div className="inline-block px-5 py-1.5 bg-slate-900 text-white rounded-full text-[10px] uppercase tracking-widest font-bold">
              The Mission
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-anton uppercase leading-[0.85] tracking-tighter text-slate-900">
              Built for <br /> <span className="text-slate-300">Legacy,</span> <br /> Not Attention.
            </h2>
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              <p>
                In an era of doom-scrolling, <b>Ankit Kumawat</b> founded Daily Pulse to prioritize intentional living. We've removed every digital hook that drains your mental battery.
              </p>
              <p>
                Our philosophy is simple: <b>Neuro-Minimalism</b>. By removing distractions, we help you enter a state of deep reflection where genuine self-discovery actually happens.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 pt-6 md:pt-10">
              <div className="space-y-4 p-6 bg-slate-50 rounded-[30px]">
                <Lock className="w-8 h-8 text-emerald-500" />
                <h4 className="font-anton uppercase text-lg font-normal">Sovereign Data</h4>
                <p className="text-sm font-light">Your thoughts are your own. We encrypt everything so even we can't see your inner world.</p>
              </div>
              <div className="space-y-4 p-6 bg-slate-50 rounded-[30px]">
                <Clock className="w-8 h-8 text-amber-500" />
                <h4 className="font-anton uppercase text-lg font-normal">Permanent Archive</h4>
                <p className="text-sm font-light">A digital heirloom built on stability. Access your pulse across decades, not just devices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Excellence Showcase */}
      <section id="experience" className="py-24 md:py-40 px-6 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-32 space-y-6">
            <h2 className="text-5xl md:text-8xl font-anton uppercase tracking-tighter text-slate-900 leading-[0.85]">
              The Gold Standard <br /> <span className="text-slate-200">Of Digital Archive.</span>
            </h2>
            <p className="text-slate-400 max-w-sm mx-auto text-base md:text-lg font-light leading-relaxed">
              We've spent thousands of hours optimizing every interacton to fade into the background, leaving only your creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 bg-white border border-slate-100 rounded-[40px] md:rounded-[50px] shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[25px] md:rounded-[30px] flex items-center justify-center mb-8 md:mb-10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-anton uppercase tracking-tight mb-4 font-normal">{feature.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Professional Trust */}
      <section id="community" className="py-24 md:py-40 px-4 md:px-6 bg-slate-900 text-white rounded-[40px] md:rounded-[120px] mx-2 md:mx-4 mb-4">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <h2 className="text-5xl sm:text-6xl md:text-[9vw] font-anton uppercase leading-[0.9] tracking-tighter font-normal">
              Trusted by <br /> The Focused.
            </h2>
            <div className="flex flex-col gap-6 lg:text-right">
              <div className="flex gap-2 lg:justify-end">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-current" />)}
              </div>
              <p className="text-lg md:text-xl text-slate-400 font-light max-w-sm">
                Join 10,000+ creators, founders, and seekers who have found their rhythm with us.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 md:p-12 border border-white/10 rounded-[40px] md:rounded-[60px] bg-white/5 space-y-8 md:space-y-12">
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-white/20" />
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-slate-200">"{t.text}"</p>
                <div className="flex items-center gap-4 md:gap-5 pt-8 md:pt-10 border-t border-white/10">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/20">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-anton uppercase tracking-tight text-base md:text-lg font-normal">{t.name}</h5>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Final CTA */}
      <section className="py-32 md:py-60 px-6 text-center bg-[#fcfbf9]">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          <h2 className="text-5xl md:text-[10vw] font-anton leading-[0.85] uppercase tracking-tighter text-slate-900 font-normal">
            Reflect <br /> To Lead.
          </h2>
          <p className="text-lg md:text-2xl text-slate-400 font-light max-w-xl mx-auto">
            Step away from the dopamine loop. Join the elite who prioritize their mental sanctuary.
          </p>
          <div className="pt-6 md:pt-8 px-4">
            <Link 
              href="/signup" 
              className="w-full md:w-auto inline-flex items-center justify-center px-12 py-6 sm:px-16 sm:py-8 bg-slate-900 text-white rounded-full font-anton text-xl sm:text-3xl uppercase tracking-widest hover:scale-110 hover:shadow-3xl transition-all active:scale-95 shadow-2xl shadow-slate-200"
            >
              Enter Sanctuary
            </Link>
          </div>
          <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.5em] text-slate-300 pt-8 md:pt-10">
            Sacred Privacy • Lifetime Access
          </p>
        </div>
      </section>

      {/* Founder & Corporate Footer */}
      <footer className="bg-white px-6 md:px-20 pt-20 md:pt-40 pb-12 md:pb-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 md:gap-20">
            <div className="sm:col-span-2 lg:col-span-3 space-y-8 md:space-y-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-anton text-xl md:text-3xl pt-1">D</span>
                </div>
                <span className="font-anton text-3xl md:text-5xl tracking-tighter uppercase">Daily Pulse</span>
              </div>
              <p className="max-w-md text-lg md:text-2xl text-slate-400 font-light leading-relaxed">
                Founded by <b>Ankit Kumawat</b> to solve the digital focus crisis. Your legacy deserves a sanctuary.
              </p>
              <div className="flex gap-4 md:gap-6">
                {[Twitter, Instagram, Github].map((Icon, i) => (
                  <Link key={i} href="#" className="p-3 md:p-4 border border-slate-100 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-500">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h6 className="font-anton uppercase tracking-[0.2em] text-xs text-slate-900 font-normal">Sanctuary</h6>
              <ul className="space-y-4 md:space-y-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="hover:text-black transition-all cursor-pointer">The Flow Lab</li>
                <li className="hover:text-black transition-all cursor-pointer">Memory Sync</li>
                <li className="hover:text-black transition-all cursor-pointer">Security Audit</li>
                <li className="hover:text-black transition-all cursor-pointer">Vault Specs</li>
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h6 className="font-anton uppercase tracking-[0.2em] text-xs text-slate-900 font-normal">Ethos</h6>
              <ul className="space-y-4 md:space-y-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="hover:text-black transition-all cursor-pointer">Ankit's Story</li>
                <li className="hover:text-black transition-all cursor-pointer">Privacy Manifesto</li>
                <li className="hover:text-black transition-all cursor-pointer">Digital Health</li>
                <li className="hover:text-black transition-all cursor-pointer">Legal Vault</li>
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h6 className="font-anton uppercase tracking-[0.2em] text-xs text-slate-900 font-normal">Contact</h6>
              <ul className="space-y-4 md:space-y-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-400">
                <li className="flex items-center gap-2 hover:text-black transition-all cursor-pointer">
                  <Mail className="w-4 h-4" /> support@pulse.io
                </li>
                <li className="hover:text-black transition-all cursor-pointer">Press Media</li>
                <li className="flex items-center gap-2 text-emerald-500 font-black">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Stable Pulse
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 md:pt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 text-center md:text-left">
              © 2026 Daily Pulse • Crafted with intention by Ankit Kumawat.
            </p>
            <div className="flex items-center gap-6 md:gap-12 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              <Link href="#" className="hover:text-black transition-colors">Privacy Principles</Link>
              <Link href="#" className="hover:text-black transition-colors">Digital Ethics</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
