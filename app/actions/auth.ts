'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Supabase signup error:', error.message);
    return { error: error.message };
  }

  if (data.session) {
    (await cookies()).set('session', data.session.access_token, { 
      expires: new Date(data.session.expires_at! * 1000), 
      httpOnly: true 
    });
    return redirect('/dashboard');
  } else {
    return { message: 'Signup successful! Please check your email to confirm your account.' };
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Supabase login error:', error.message);
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Please check your inbox and confirm your email address before logging in.' };
    }
    return { error: error.message };
  }

  if (data.session) {
    (await cookies()).set('session', data.session.access_token, { 
      expires: new Date(data.session.expires_at! * 1000), 
      httpOnly: true 
    });
  }

  return redirect('/dashboard');
}

export async function logout() {
  await supabase.auth.signOut();
  (await cookies()).set('session', '', { expires: new Date(0) });
  return redirect('/');
}
