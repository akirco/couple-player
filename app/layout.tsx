import { LocalForageProvider } from '@/app/provider';
import Heading from '@/components/heading';
import '@/styles/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sync Video',
  description: 'an elegant chat room build with next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalForageProvider>
      <html lang="en" className="dark">
        <body>
          <Heading />
          {children}
        </body>
      </html>
    </LocalForageProvider>
  );
}
