// src/sanity/schemaTypes/testimonial.ts
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'testimonial' }),
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (click generate)',
      type: 'slug',
      options: { source: 'heading', maxLength: 96 },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Paste the testimonial here.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
