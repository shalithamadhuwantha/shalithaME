// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from './components/ClientWrapper';
import Preloader from './components/preloader/Loader';
import VisitorTracker from './components/settings/VisitorTracker';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shalitha M Gamage | Cybersecurity Portfolio',
  description: 'CTF player | Reverse Engineer | Content Creator | CCNA | Exploit Development | RUSL B.ICT | MLSA α',
  keywords: 'cybersecurity, hacking, CTF, reverse engineering, CCNA, portfolio',
  icons: {
    icon: [
      { url: '/assets/img/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/img/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/assets/img/favicon/apple-touch-icon.png',
  },
  manifest: '/assets/img/favicon/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full m-0 bg-custom-bg text-custom-text`} suppressHydrationWarning>
    
       <Preloader />
        <VisitorTracker />    
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
