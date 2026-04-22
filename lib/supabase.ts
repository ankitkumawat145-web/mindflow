import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cwovxtltcobnikzctbsu.supabase.co';
const supabaseUrl = rawUrl
  ?.replace(/\/rest\/v1\/?$/, "") // Strip /rest/v1/ suffix
  ?.replace(/\/$/, "");           // Strip remaining trailing slash
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3b3Z4dGx0Y29ibmlremN0YnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDQwMzIsImV4cCI6MjA5MjQyMDAzMn0.knMVj8eCekzkPq3NHmqDvfP8oIfqMlbl3JmfR5JKJfE';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_URL) {
  console.warn('Supabase environment variables missing. Using hardcoded fallbacks.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
