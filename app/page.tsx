import { getSession } from '@/lib/auth';
import LandingPageClient from '@/components/landing-page-client';

export default async function Home() {
  const session = await getSession();

  return <LandingPageClient session={session} />;
}
