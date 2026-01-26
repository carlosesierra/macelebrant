// src/sanity/schemaTypes/about.ts
export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' }, // Standard text
        { type: 'youtube' }, // videos
        {
        type: 'image', // images
        options: { hotspot: true },
        fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
        ],
        },
      ],
    },
    {
      name: 'image01',
      title: 'Image 01',
      type: 'image',
      options: { hotspot: true },
      fields: [
          { name: 'alt', title: 'Alt text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' },
      ],
    },
    {
      name: 'image02',
      title: 'Image 02',
      type: 'image',
      options: { hotspot: true },
      fields: [
          { name: 'alt', title: 'Alt text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }
  ],
}