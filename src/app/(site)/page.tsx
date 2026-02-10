// src/app/page.tsx
import { sanityFetch } from '@/lib/sanity.server'


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
  const offlineData = {
    home: null,
    about: null,
    promoVideo: null,
    testimonials: [],
    fees: null,
    espanol: null,
    resources: null,
    contact: null,
  }

  const data = await sanityFetch({
    query: `{
      'home': *[_type == 'home'][0]{
        heading,
        subHeading,
        content,
        image,
        images
      },
      'about': *[_type == 'about'][0]{
        heading,
        content,
        image01,
        image02
      },
      'promoVideo': *[_type == 'promoVideo'][0]{
        heading,
        content,
        video
      },
      'testimonials': *[_type == 'testimonial'] | order(orderRank){
        _id,
        heading,
        content,
        image
      },
      'fees': *[_type == 'fees'][0]{
        heading,
        leftContent,
        rightContent
      },
      'espanol': *[_type == 'espanol'][0]{
        heading,
        content,
        image
      },
      'resources': *[_type == 'resources'][0]{
        heading,
        content,
        image
      },
      'contact': *[_type == 'contact'][0]{
        heading,
        content
      }
    }`,
    revalidate: 60,
    fallback: offlineData,
  })

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
