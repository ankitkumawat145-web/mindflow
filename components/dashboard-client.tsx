'use client';

import { useState, useTransition, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Calendar, 
  Clock, 
  LogOut, 
  LayoutDashboard,
  Search,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '@/app/actions/auth';
import { createEntry, updateEntry, deleteEntry } from '@/app/actions/journal';
import { useRouter } from 'next/navigation';

interface Entry {
  id: string;
  title: string;
  content: string;
  date: string;
  created_at?: string | null;
}

export default function DashboardClient({ initialEntries, userEmail }: { initialEntries: any[], userEmail: string }) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Sync state when initialEntries changes (e.g. after server refresh)
  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);
  
  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      if (editingEntry) {
        const result = await updateEntry(editingEntry.id, formData);
        if (result?.error) {
          alert(result.error);
          return;
        }
        setIsModalOpen(false);
        setEditingEntry(null);
        router.refresh();
      } else {
        const result = await createEntry(formData);
        if (result?.error) {
          alert(result.error);
          return;
        }
        
        setIsModalOpen(false);
        router.refresh();
      }
    });
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this entry?')) {
      startTransition(async () => {
        const result = await deleteEntry(id);
        if (result?.error) {
          alert(result.error);
          return;
        }
        setEntries(entries.filter(e => e.id !== id));
      });
    }
  }

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  const openEditModal = (entry: Entry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf9] font-sans selection:bg-slate-900 selection:text-white">
      {/* Sidebar / Topbar */}
      <header className="bg-white/40 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10 px-6 py-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-white font-anton text-sm pt-0.5">D</span>
          </div>
          <h1 className="text-xl font-anton uppercase tracking-tighter hidden sm:block">Daily Pulse</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-10 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search your sanctuary..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 border-none rounded-full text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-slate-900 transition-all outline-none placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{userEmail}</span>
          </div>
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="p-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-full transition-all disabled:opacity-50 active:scale-90"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 sm:p-12 max-w-7xl mx-auto w-full space-y-12">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 border border-slate-200 rounded-full text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Personal Vault
            </div>
            <h2 className="text-6xl font-anton uppercase tracking-tighter text-slate-900 leading-[0.85]">
              Your <br /> <span className="text-slate-300">Pulse</span> Timeline.
            </h2>
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-full font-anton text-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus className="h-6 w-6" />
            New Chapter
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mb-8 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[20px] text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-slate-900 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-10 rounded-[40px] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group flex flex-col min-h-[300px] relative"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => openEditModal(entry)}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-3xl font-anton uppercase tracking-tight text-slate-900 mb-6 leading-[0.9] group-hover:text-slate-500 transition-colors">{entry.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-4 flex-1">{entry.content}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="h-3 w-3" />
                    <span className="text-[9px] uppercase font-bold tracking-widest italic">
                      Chapter Logged
                    </span>
                  </div>
                  <div className="w-6 h-px bg-slate-100 group-hover:w-12 transition-all" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEntries.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-slate-300" />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-anton uppercase tracking-tighter text-slate-900">Silence in the Sanctuary</h3>
                <p className="text-slate-400 max-w-xs mx-auto font-light leading-relaxed">
                  {searchQuery ? "Your search returned no echoes. Try a different memory." : "Your pulse timeline is empty. Every journey starts with a single reflection."}
                </p>
              </div>
              {!searchQuery && (
                <button 
                  onClick={openCreateModal}
                  className="px-10 py-4 border-2 border-slate-900 rounded-full font-anton text-lg uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100"
                >
                  Write your first chapter
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-4xl font-anton uppercase tracking-tighter text-slate-900">
                  {editingEntry ? 'Refine Memory' : 'Capture Pulse'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all active:scale-90"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-10 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4">
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400">Chapter Title</label>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-300">Required Selection</div>
                  </div>
                  <input
                    name="title"
                    defaultValue={editingEntry?.title || ''}
                    placeholder="E.g., A Moment of Stillness"
                    required
                    className="w-full px-8 py-5 rounded-[25px] border-none bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all outline-none text-2xl font-anton uppercase tracking-tight placeholder:text-slate-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 px-4">Timeline Hub</label>
                    <input
                      name="date"
                      type="date"
                      defaultValue={editingEntry?.date || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-8 py-5 rounded-[25px] border-none bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all outline-none font-bold text-slate-600"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 px-4">The Inner Story</label>
                  <textarea
                    name="content"
                    defaultValue={editingEntry?.content || ''}
                    placeholder="Let your thoughts flow without judgment..."
                    required
                    rows={8}
                    className="w-full px-8 py-6 rounded-[30px] border-none bg-slate-50 focus:ring-2 focus:ring-slate-900 transition-all outline-none resize-none leading-loose text-slate-700 font-light"
                  />
                </div>
                
                <div className="pt-6 flex justify-end gap-6 items-center">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-12 py-5 bg-slate-900 text-white rounded-full font-anton text-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-100 active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? 'Logging...' : (editingEntry ? 'Refine Pulse' : 'Capture Pulse')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
