'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function createEntry(formData: FormData) {
  console.log('--- JOURNAL CREATE REQUEST ---');
  try {
    const session = await getSession();
    if (!session) {
      console.error('Create Entry Failed: No session found');
      return { error: 'Unauthorized: Please log in again.' };
    }

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];

    console.log(`User ${session.email} is saving: ${title}`);

    if (!title || !content) {
      return { error: 'Title and content are required' };
    }

    const { data, error } = await supabase
      .from('entries')
      .insert([
        { 
          user_id: session.userId, 
          title, 
          content, 
          date 
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error.message);
      return { error: `Database error: ${error.message}` };
    }

    console.log('Entry saved successfully');
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    console.error('JOURNAL ACTION CRASH:', err);
    return { error: 'A server error occurred while saving. Please try again.' };
  }
}

export async function updateEntry(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string;

    const { error } = await supabase
      .from('entries')
      .update({ title, content, date, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', session.userId);

    if (error) {
      console.error('Update Entry Error:', error.message);
      return { error: 'Failed to update entry. Please try again.' };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Update Entry Error:', error);
    return { error: 'Failed to update entry' };
  }
}

export async function deleteEntry(id: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id)
      .eq('user_id', session.userId);

    if (error) {
      console.error('Delete Entry Error:', error.message);
      return { error: 'Failed to delete entry. Please try again.' };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Delete Entry Error:', error);
    return { error: 'Failed to delete entry' };
  }
}

export async function getEntries() {
  try {
    const session = await getSession();
    if (!session) return [];

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', session.userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Get Entries Error:', error.message);
      return [];
    }
    
    // Map to ensure serializable plain objects
    return (data || []).map(entry => ({
      id: String(entry.id),
      user_id: String(entry.user_id),
      title: String(entry.title || ''),
      content: String(entry.content || ''),
      date: String(entry.date || ''),
      created_at: entry.created_at ? String(entry.created_at) : null
    }));
  } catch (error) {
    console.error('Get Entries Error:', error);
    return [];
  }
}
