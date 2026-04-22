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
  BookOpen,
  ArrowRight
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

  // Sync state when initialEntries changes
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
      {/* Premium Dashboard Header */}
      <header className="bg-white/40 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 px-6 py-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center transform active:scale-90 transition-transform cursor-pointer">
            <span className="text-white font-anton text-lg pt-0.5">D</span>
          </div>
          <h1 className="text-xl font-anton uppercase tracking-tighter hidden sm:block">Daily Pulse</h1>
        </div>
        
        <div className="flex-1 max-w-lg mx-10 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search your sanctuary..." 
              className="w-full pl-14 pr-6 py-3.5 bg-slate-100/40 border-none rounded-full text-[10px] font-black uppercase tracking-[0.2em] focus:ring-2 focus:ring-slate-900 transition-all outline-none placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">{userEmail.split('@')[0]}</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">Authenticated Pulse</span>
          </div>
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="p-3 text-slate-400 hover:bg-slate-900 hover:text-white rounded-full transition-all disabled:opacity-50 active:scale-95 shadow-sm"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 sm:p-12 max-w-7xl mx-auto w-full space-y-12 md:space-y-24 pt-16 md:pt-20">
        {/* Greetings & Action Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
              <div className="px-4 py-1 bg-slate-100 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                Pulse Hub Active
              </div>
            </div>
            <h2 className="text-6xl md:text-9xl font-anton uppercase tracking-tighter text-slate-900 leading-[0.8] mb-2 md:mb-4">
              Peace, <br /> <span className="text-slate-200">Reflector.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg border-l-2 border-slate-100 pl-6 md:pl-8 py-2 md:py-3">
              Welcome back to your digital sanctuary. You have {entries.length} reflections stored in our secure legacy timeline.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCreateModal}
            className="flex items-center justify-center gap-4 md:gap-5 px-8 py-6 md:px-12 md:py-8 bg-slate-900 text-white rounded-[30px] md:rounded-[40px] font-anton text-xl md:text-2xl uppercase tracking-[0.1em] hover:bg-slate-800 transition-all shadow-xl md:shadow-4xl shadow-slate-200"
          >
            <Plus className="h-6 w-6 md:h-8 md:w-8" />
            New Chapter
          </motion.button>
        </div>

        {/* Timeline Control Bar */}
        <div className="space-y-10 md:space-y-16">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 md:pb-10">
            <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-300">Archive Timeline</h3>
            <div className="flex items-center gap-6 md:gap-10">
              <div className="hidden md:flex items-center gap-3 cursor-pointer">
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Artistic Grid</span>
              </div>
              <div className="md:hidden flex items-center gap-4">
                 <Search className="h-5 w-5 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[70px] border border-slate-50 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] md:hover:-translate-y-5 transition-all duration-700 overflow-hidden group flex flex-col min-h-[350px] md:min-h-[400px] relative"
                >
                  <div className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center gap-3 md:gap-4 text-slate-400">
                      <div className="p-2 md:p-3 bg-slate-50 rounded-xl md:rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => openEditModal(entry)}
                        className="p-2 md:p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
                      >
                        <Edit3 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 md:p-3 text-red-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-anton uppercase tracking-tight text-slate-900 mb-6 md:mb-8 leading-[0.85] group-hover:tracking-tighter transition-all duration-700">{entry.title}</h3>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light line-clamp-4 md:line-clamp-5 flex-1">{entry.content}</p>
                  
                  <div className="mt-8 md:mt-12 pt-6 md:pt-10 border-t border-slate-50 flex items-center justify-between group-hover:border-slate-100 transition-colors">
                    <div className="flex items-center gap-3 text-slate-200 group-hover:text-slate-400 transition-colors">
                      <Clock className="h-4 w-4" />
                      <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.4em]">
                        Vaulted
                      </span>
                    </div>
                    <div className="w-8 md:w-12 h-px bg-slate-100 group-hover:w-20 group-hover:bg-slate-900 transition-all duration-700" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredEntries.length === 0 && (
              <div className="col-span-full py-48 flex flex-col items-center justify-center text-center space-y-12 bg-white rounded-[100px] border border-dashed border-slate-100">
                <div className="w-32 h-32 bg-slate-50 rounded-[50px] flex items-center justify-center animate-pulse">
                  <BookOpen className="h-12 w-12 text-slate-200" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-5xl md:text-6xl font-anton uppercase tracking-tighter text-slate-900">Silence in the Vault</h3>
                  <p className="text-slate-400 text-xl max-w-sm mx-auto font-light leading-relaxed">
                    {searchQuery ? "Your search returned no echoes. Reframe your memory." : "Your pulse timeline awaits its first entry. Every legacy begins with a single reflection."}
                  </p>
                </div>
                {!searchQuery && (
                  <button 
                    onClick={openCreateModal}
                    className="px-14 py-6 bg-slate-900 text-white rounded-full font-anton text-2xl uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all"
                  >
                    Initiate First Chapter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Legacy Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-4xl rounded-[40px] sm:rounded-[80px] shadow-[0_100px_100px_-50px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-6 sm:px-12 sm:py-10 border-b border-slate-50 flex items-center justify-between shrink-0">
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-5xl font-anton uppercase tracking-tighter text-slate-900 leading-none">
                    {editingEntry ? 'Refine' : 'Begin'}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.3em] sm:tracking-[0.4em] text-slate-300">Sanctuary Mode</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 sm:p-5 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all active:scale-75"
                >
                  <X className="h-6 w-6 sm:h-8 sm:h-8" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 sm:p-12 space-y-8 sm:space-y-12 overflow-y-auto">
                <div className="space-y-4 sm:space-y-6">
                  <label className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] text-slate-300 px-4 sm:px-6">Identification</label>
                  <input
                    name="title"
                    defaultValue={editingEntry?.title || ''}
                    placeholder="Chapter Title..."
                    required
                    className="w-full px-6 py-5 sm:px-10 sm:py-7 rounded-[25px] sm:rounded-[40px] border-none bg-slate-50 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none text-2xl sm:text-3xl font-anton uppercase tracking-tight placeholder:text-slate-200"
                  />
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <label className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] text-slate-300 px-4 sm:px-6">Timestamp</label>
                  <input
                    name="date"
                    type="date"
                    defaultValue={editingEntry?.date || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-6 py-5 sm:px-10 sm:py-7 rounded-[25px] sm:rounded-[40px] border-none bg-slate-100/50 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none font-bold text-slate-900 text-base sm:text-lg"
                  />
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <label className="text-[9px] sm:text-[11px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] text-slate-300 px-4 sm:px-6">Dialogue</label>
                  <textarea
                    name="content"
                    defaultValue={editingEntry?.content || ''}
                    placeholder="Start typing your legacy..."
                    required
                    rows={8}
                    className="w-full px-6 py-6 sm:px-10 sm:py-10 rounded-[30px] sm:rounded-[50px] border-none bg-slate-50 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none resize-none leading-[1.8] sm:leading-[2] text-lg sm:text-xl text-slate-600 font-light"
                  />
                </div>
                
                <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row justify-end gap-6 sm:gap-10 items-center">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-[9px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-black text-slate-300 hover:text-slate-900 transition-colors order-2 sm:order-1"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto px-12 py-5 sm:px-16 sm:py-7 bg-slate-900 text-white rounded-full font-anton text-xl sm:text-2xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl sm:shadow-4xl shadow-slate-200 active:scale-95 disabled:opacity-50 order-1 sm:order-2"
                  >
                    {isPending ? 'Syncing...' : (editingEntry ? 'Refine' : 'Capture')}
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
