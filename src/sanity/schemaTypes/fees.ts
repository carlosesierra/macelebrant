// src/sanity/schemaTypes/fees.ts
export default {
  name: 'fees',
  title: 'Fees',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Fees',
    },
    {
      name: 'leftContent',
      title: 'Content 01',
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
      name: 'rightContent',
      title: 'Content 02',
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
  ],
}
