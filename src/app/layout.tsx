import type { Metadata } from 'next';
import { cinzel, hankenGrotesk } from '@/lib/fonts';
import { ThemeProvider } from '@/context/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nestara Realty | Premium Real Estate in Pune',
  description: 'Premium real estate advisory in Pune. Curated luxury homes, villas, and apartments in Koregaon Park, Kalyani Nagar, and Baner.',
  keywords: ['real estate pune', 'luxury homes pune', 'premium apartments pune', 'koregaon park homes', 'nestara realty'],
  authors: [{ name: 'Nestara Realty' }],
  openGraph: {
    title: 'Nestara Realty | Premium Real Estate in Pune',
    description: 'Premium real estate advisory in Pune. Finding homes that feel like they were always yours.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Nestara Realty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nestara Realty | Premium Real Estate in Pune',
    description: 'Premium real estate advisory in Pune.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${hankenGrotesk.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('nestara-theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (!t && window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
