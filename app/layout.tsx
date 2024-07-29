import { LocalForageProvider } from '@/app/provider';
import Heading from '@/components/heading';
import '@/styles/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sync Player',
  description: 'an elegant chat room build with next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocalForageProvider>
          <Heading />
          {children}
        </LocalForageProvider>
      </body>
    </html>
  );
}
