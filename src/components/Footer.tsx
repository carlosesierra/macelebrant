import Link from 'next/link'

const footerStyle = {
  cols: 'w-full lg:max-w-6xl grid lg:grid-cols-3 gap-6 py-4',
}
const footerBio = {
   heading: 'Maria Pilar Aguilera',
   subHeading: 'Registered Civil Celebrant.',
   content: 'English - Spanish',
}

const footerMenu = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Fees', href: '#fees' },
  { name: 'En Español', href: '#espanol' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
  { name: 'Admin Login', href: '/studio', disabled: true },
]

const footerSocial = [
  { name: 'email: maria@macelebrant.com', href: 'mailto:maria@macelebrant.com' },
  { name: 'facebook: macelebrant', href: 'https://www.facebook.com/MariaPilarCelebrant' },
  { name: 'instagram: mariapilarcelebrant', href: 'https://www.instagram.com/mariapilarcelebrant/' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-[#c6999b] text-white'>

      <div className={footerStyle.cols}>
        <div>
          <h3 className='text-white'>{footerBio.heading}</h3>
          <p className='text-sm'>
            {footerBio.subHeading}<br/>{footerBio.content}
          </p>
        </div>
        <div>
          <h4 className='uppercase text-xs mb-4'>Connect</h4>
          <ul className='space-y-2'> 
              {footerSocial.map((item) => (
                  <li key={item.name} className='text-sm'>
                    <Link 
                      href={item.href} 
                      className='hover:underline transition'>
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
        </div>
        <div>
          <h4 className='uppercase text-xs mb-4'>Navigation</h4>
          <ul className='space-y-2'> 
              {footerMenu.map((item) => (
                  <li key={item.name} className='text-sm'>
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

      <div className='w-full lg:max-w-6xl border-t mt-12 pt-8'>
        &copy; <Link href='https://www.macelebrant.com/' className='hover:underline transition'>macelebrant.com</Link> {currentYear} Marriage Celebrant in Melbourne - Weddings in Spanish - Celebrant Spanish Melbourne <Link href='https://www.carlosesierra.com.au/' className='hover:underline transition'>web design</Link> by carlosesierra.com.au.
      </div>




    </footer>
  )
}