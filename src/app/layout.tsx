import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne',
  description: 'Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={quicksand.variable}>
      <body className='antialiased flex flex-col min-h-screen font-sans'>
        {children}
      </body>
    </html>
  )
}
