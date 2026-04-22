import { getEntries } from '@/app/actions/journal';
import { getSession } from '@/lib/auth';
import DashboardClient from '@/components/dashboard-client';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    return redirect('/login');
  }

  const entries = await getEntries();
  
  return (
    <DashboardClient 
      initialEntries={entries} 
      userEmail={session?.email || ''} 
    />
  );
}
