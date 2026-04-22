import { cookies } from 'next/headers';
import { supabase } from './supabase';

export async function getSession() {
  const sessionToken = (await cookies()).get('session')?.value;
  if (!sessionToken) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser(sessionToken);
    
    if (error || !user) return null;

    return {
      userId: user.id,
      email: user.email,
    };
  } catch (err) {
    console.error('Session retrieval error:', err);
    return null;
  }
}
