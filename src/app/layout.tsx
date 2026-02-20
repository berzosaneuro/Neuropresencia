import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PWARegister from '@/components/PWARegister'
import { PremiumProvider } from '@/context/PremiumContext'

export const metadata: Metadata = {
  title: 'Neuropresencia — Berzosa Neuro',
  description: 'Supraconciencia, metacognición y neuroplasticidad para apagar el ruido mental y vivir desde el presente.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Neuropresencia',
  },
}

export const viewport: Viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body>
        <PremiumProvider>
          <PWARegister />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PremiumProvider>
      </body>
    </html>
  )
}
