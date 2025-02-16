import { TRPCReactProvider } from '@/trpc/react';
import { HydrateClient } from '@/trpc/server';
import { Toaster } from '@repo/ui/components/sonner';
import '@repo/ui/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Welcome to Startup Template',
  description: 'Startup Template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>{children}</HydrateClient>
        </TRPCReactProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
