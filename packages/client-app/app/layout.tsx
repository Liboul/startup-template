import { TRPCReactProvider } from '@/trpc/react';
import { HydrateClient } from '@/trpc/server';
import { Toaster } from '@repo/ui/components/sonner';
import '@repo/ui/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata() {
  const t = await getTranslations('app');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCReactProvider>
        </NextIntlClientProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
