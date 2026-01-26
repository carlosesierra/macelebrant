// src/sanity/schemaTypes/home.ts
export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subHeading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image (no sequence )',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Images Sequence',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.max(7),
    },
  ],
}
