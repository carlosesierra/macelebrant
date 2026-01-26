// src/sanity/schemaTypes/promoVideo.ts
export default {
  name: 'promoVideo',
  title: 'Promotional Video',
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
      ],
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url'
    }
  ],
}