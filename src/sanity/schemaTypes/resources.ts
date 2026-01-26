// src/sanity/schemaTypes/resources.ts

export default {
  name: 'resources',
  title: 'Resources / Legal Requirements',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Resources / Legal Requirements',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
        type: 'image',
        options: { hotspot: true },
        fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
        ],
        },
        { type: 'youtube' },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
          { name: 'alt', title: 'Alt text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }
  ],
}