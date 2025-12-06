import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { AuthProvider } from '@/layouts/auth-provider'
import GeneralLayout from '@/layouts/general-layout'
import ProvidersLayout from '@/layouts/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kivo- (Real Time Communication App)',
  description: 'A product of Alitos.com.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ProvidersLayout>
        <AuthProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ToastContainer />
            <GeneralLayout>{children}</GeneralLayout>
          </body>
        </AuthProvider>
      </ProvidersLayout>
    </html>
  )
}
