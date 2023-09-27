import '@/styles/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Peer',
  description: 'an elegant chat room build with next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <script src='../lib/baidu.js' defer></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
