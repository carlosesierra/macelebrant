import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const quicksand = localFont({
  src: [
    { path: './fonts/Quicksand-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Quicksand-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Quicksand-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Quicksand-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Quicksand-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne',
  description: 'Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={quicksand.variable}>
      <body className='antialiased flex flex-col min-h-screen'>
        {children}
      </body>
    </html>
  )
}
