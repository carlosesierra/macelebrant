import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='grow'>{children}</main>
      <Footer />
    </>
  )
}
