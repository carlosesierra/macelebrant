'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure, // This must match the name of the exported function in structure.ts
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // This hides the 'About' type from the global 'Create New' menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) =>
            !['about', 'hero', 'feesAndServices', 'spanol'].includes(template.templateId)
        )
      }
      return prev
    },
    // This prevents the 'Duplicate' and 'Delete' actions on the About page
    actions: (prev, { schemaType }) => {
      if (
        schemaType === 'about' ||
        schemaType === 'hero' ||
        schemaType === 'feesAndServices' ||
        schemaType === 'spanol'
      ) {
        return prev.filter((action) => !['duplicate', 'delete'].includes(action.action!))
      }
      return prev
    },
  },
})
