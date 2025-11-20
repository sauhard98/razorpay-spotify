import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/context'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'Spotify Live - Your favorite artists, live and in person',
  description: 'Discover and book tickets to live music events from your favorite artists on Spotify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  )
}
