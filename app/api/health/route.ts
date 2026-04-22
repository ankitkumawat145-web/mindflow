import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('entries').select('count', { count: 'exact', head: true });
    if (error) throw error;
    return NextResponse.json({ status: 'ok', database: 'supabase', result: data });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
