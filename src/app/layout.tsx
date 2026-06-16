import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
  description: 'Built with Sabuj Engineering System',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <QueryProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
              <Toaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
