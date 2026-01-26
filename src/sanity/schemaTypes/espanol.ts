// src/sanity/schemaTypes/espanol.ts


export default {
  name: 'espanol',
  title: 'Se Habla Español',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Se Habla Español',
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