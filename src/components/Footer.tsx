import Link from 'next/link'

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Fees', href: '#fees' },
  { name: 'En Español', href: '#espanol' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
  { name: 'Admin Login', href: '/studio', disabled: true },
]

const contactSocial = [
  { name: 'email: maria@macelebrant.com', href: 'mailto:maria@macelebrant.com' },
  { name: 'facebook: macelebrant', href: 'https://www.facebook.com/MariaPilarCelebrant' },
  { name: 'instagram: mariapilarcelebrant', href: 'https://www.instagram.com/mariapilarcelebrant/' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-neutral-200'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          
          {/* Column 1: Brand & Bio */}
          <div>
            <h3 className='font-serif text-xl font-bold mb-4'>Maria Pilar Aguilera</h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Registered Civil Celebrant.<br/>English – Spanish
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className='font-semibold uppercase tracking-widest text-xs mb-4'>Navigation</h4>


            <ul className='space-y-2'> 
              {navigationLinks.map((item) => (
                  <li key={item.name} className=' text-sm text-gray-600'>
                    <Link 
                      href={item.href} 
                      className='hover:underline transition'>
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>

          </div>

          {/* Column 3: Contact/Social */}
          <div>
            <h4 className='font-semibold uppercase tracking-widest text-xs mb-4'>Connect</h4>
            <ul className='space-y-2'> 
              {contactSocial.map((item) => (
                  <li key={item.name} className=' text-sm text-gray-600'>
                    <Link 
                      href={item.href} 
                      className='hover:underline transition'>
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

        </div>

        <div className='border-t mt-12 pt-8 flex  md:flex-row '>
          <div className='gap-4 mt-4 justify-between items-center text-sm text-gray-400'>
            &copy; <Link href='https://www.macelebrant.com/' className='hover:text-gray-600'>macelebrant.com</Link> {currentYear} Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne <Link href='https://www.carlosesierra.com.au/' className='hover:text-gray-600'>web design</Link> by carlosesierra.com.au.
          </div>
        </div>
      </div>
    </footer>
  )
}