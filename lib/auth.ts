import { cookies } from 'next/headers';
import { getSupabaseClient } from './supabase';

export async function getSession() {
  const sessionToken = (await cookies()).get('session')?.value;
  if (!sessionToken) return null;

  try {
    const supabase = getSupabaseClient(sessionToken);
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;

    return {
      userId: user.id,
      email: user.email,
      token: sessionToken,
    };
  } catch (err) {
    console.error('Session retrieval error:', err);
    return null;
  }
}
