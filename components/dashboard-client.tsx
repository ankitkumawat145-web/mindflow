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
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Sidebar / Topbar */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3 sm:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-indigo-600" />
          <h1 className="text-xl font-bold hidden sm:block">My Journal</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search entries..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500 hidden lg:block">{userEmail}</span>
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 rounded-full transition-colors disabled:opacity-50"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Your Entries</h2>
            <p className="text-slate-500">Capture your thoughts for today</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            New Entry
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mb-6 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search entries..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-sm shadow-slate-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all group flex flex-col min-h-[220px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openEditModal(entry)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{entry.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-4 flex-1">{entry.content}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px] uppercase font-bold tracking-widest italic font-mono">
                    Created {entry.created_at?.split('T')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEntries.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full mb-4">
                <BookOpen className="h-12 w-12 text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No entries found</h3>
              <p className="text-slate-500">
                {searchQuery ? "Try a different search term" : "Start your journal by creating your first entry!"}
              </p>
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between bg-indigo-600">
                <h3 className="text-xl font-bold text-white">
                  {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Title</label>
                  <input
                    name="title"
                    defaultValue={editingEntry?.title || ''}
                    placeholder="Reflections on today..."
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-lg font-semibold"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Date</label>
                    <input
                      name="date"
                      type="date"
                      defaultValue={editingEntry?.date || new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Content</label>
                  <textarea
                    name="content"
                    defaultValue={editingEntry?.content || ''}
                    placeholder="Write your thoughts here..."
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none leading-relaxed"
                  />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-2xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? 'Saving...' : (editingEntry ? 'Save Changes' : 'Save Entry')}
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
