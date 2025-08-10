import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from './components/ClientWrapper';
import Preloader from './components/preloader/Loader';
import VisitorTracker from './components/settings/VisitorTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shalitha Madhuwantha | Cybersecurity Enthusiast',
  description: 'CTF player | Reverse Engineer | Content Creator | Exploit Development',
  keywords: 'cybersecurity, hacking, CTF, reverse engineering, virus, portfolio , weber , shalitha , shalitha m gamage , gamage , malware',
  authors: [{ name: 'Shalitha Madhuwantha', url: 'https://shalitha.me' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/assets/img/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/img/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/assets/img/favicon/apple-touch-icon.png',
  },
  manifest: '/assets/img/favicon/site.webmanifest',
  openGraph: {
    title: 'Shalitha Madhuwantha | Cybersecurity Enthusiast',
    description: 'CTF player | Reverse Engineer | Content Creator  | Exploit Development | System Engineer | Linux & Windows',
    url: 'https://shalitha.me',
    siteName: 'Shalitha Madhuwantha Portfolio',
    images: [
      {
        url: 'https://shalitha.me/assets/img/dp.jpg',
        width: 1200,
        height: 630,
        alt: 'Shalitha Madhuwantha Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shalitha Madhuwantha | Cybersecurity Enthusiast',
    description: 'CTF player | Reverse Engineer | Content Creator | CCNA | Exploit Development | System Engineer | Linux & Windows',
    creator: '@shalithaMgamage',
    images: ['https://shalitha.me/assets/img/dp.jpg'],
  },
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
