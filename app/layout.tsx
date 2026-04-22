import type { Metadata } from 'next';
import { Outfit, Anton } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

export const metadata: Metadata = {
  title: 'Daily Pulse | Your Personal Life Journal',
  description: 'Daily Pulse is an immersive, creative journal experience designed to capture your thoughts in a beautiful, high-impact digital space.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${anton.variable} font-sans`}>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
