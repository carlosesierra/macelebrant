// src/app/page.tsx
import { client } from '@/lib/sanity.client' // Ensure this is imported!


import HomeSection from '@/components/sections/HomeSection'
import AboutSection from '@/components/sections/AboutSection'
import PromoVideoSection from '@/components/sections/PromoVideoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FeesSection from '@/components/sections/FeesSection'
import EspanolSection from '@/components/sections/EspanolSection'
import ResourcesSection from '@/components/sections/ResourcesSection'
import ContactSection from '@/components/sections/ContactSection'

export default async function HomePage() {
  // Fetch homepage content
  const data = await client.fetch(`{
    'home': *[_type == 'home'][0],
    'about': *[_type == 'about'][0],
    'promoVideo': *[_type == 'promoVideo'][0],
    'testimonials': *[_type == 'testimonial'] | order(orderRank),
    'fees': *[_type == 'fees'][0],
    'espanol': *[_type == 'espanol'][0],
    'resources': *[_type == 'resources'][0],
    'contact': *[_type == 'contact'][0]
  }`)

  return (
    <div className='scroll-smooth'>
      <HomeSection home={data.home} />
      <AboutSection about={data.about} />
      <PromoVideoSection promoVideo={data.promoVideo} />
      <TestimonialsSection testimonials={data.testimonials} />
      <FeesSection fees={data.fees} />
      <EspanolSection espanol={data.espanol} />
      <ResourcesSection resources={data.resources} />
      <ContactSection contact={data.contact} />
    </div>
  )
}
