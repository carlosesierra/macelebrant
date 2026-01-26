'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navigation = {
  content:{
    logo:{
      copy:`Marriage Celebrant Melbourne`,
      img:`/logo-horizontal.svg`,
      href:`https://www.macelebrant.com/`,
    }
  },
  style:{
    logo:`h-15 w-auto`,
    logolink:`-m-1.5 p-1.5`,
    links:`hover:text-yellow transition`,
    linksmob:`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5`,
  }
}

const items = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#aboutme' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Fees', href: '#fees' },
  { name: 'En Español', href: '#espanol' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/10' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex h-20 items-center justify-between px-4'>

        <Link 
            data-aos='fade-right'
            href={navigation.content.logo.href}
            className={navigation.style.logolink}>
                <span className='sr-only'>{navigation.content.logo.copy}</span>
                <img
                    alt={navigation.content.logo.copy}
                    src={navigation.content.logo.img}
                    className={navigation.style.logo}
                />
        </Link>
        
        <div className='hidden lg:flex gap-8 items-center text-sm uppercase tracking-widest text-gray-600'>
          {items.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={navigation.style.links}>
              {item.name}
            </Link>
          ))}

        </div>

        <button
          type='button'
          aria-label='Open menu'
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className='lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-black/5'
        >
          <svg viewBox='0 0 24 24' className='h-6 w-6' aria-hidden='true'>
            <path
              d='M4 6h16M4 12h16M4 18h16'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>

      <div
        className={`lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type='button'
          aria-label='Close menu'
          onClick={closeMobile}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          role='dialog'
          aria-modal='true'
          className={`fixed inset-y-0 right-0 z-50 h-dvh w-4/5 max-w-sm overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className='flex items-center justify-between px-6 py-5 border-b'>
            <span className='text-sm uppercase tracking-widest text-gray-500'>Menu</span>
            <button
              type='button'
              aria-label='Close menu'
              onClick={closeMobile}
              className='rounded-md p-2 text-gray-700 hover:bg-black/5'
            >
              <svg viewBox='0 0 24 24' className='h-5 w-5' aria-hidden='true'>
                <path
                  d='M6 6l12 12M18 6l-12 12'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
          <div className='px-6 py-6 flex flex-col gap-4 text-base uppercase tracking-widest text-gray-700'>
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobile}
                className='py-2'
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
