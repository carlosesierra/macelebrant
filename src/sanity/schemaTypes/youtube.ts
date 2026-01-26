// src/sanity/schemaTypes/youtube.ts
export default {
  name: 'youtube', // This name must match exactly
  type: 'object',
  title: 'YouTube Video',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
  ],
}