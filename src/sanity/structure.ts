// src/sanity/structure.ts
import type { StructureBuilder } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S: StructureBuilder, context: any) =>
  S.list()
    .title('Website Content')
    .items([
      // home - singleton
      S.listItem()
        .title('Home')
        .id('home')
        .child(
          S.document()
            .schemaType('home')
            .documentId('home')
        ),

      S.divider(),

      // about - singleton
      S.listItem()
        .title('About Me')
        .id('about') // Unique ID
        .child(
          S.document()
            .schemaType('about')
            .documentId('about-me')
        ),
      
      S.divider(),

      // promoVideo - singleton
      S.listItem()
        .title('Promo Video')
        .id('promoVideo') // Unique ID
        .child(
          S.document()
            .schemaType('promoVideo')
            .documentId('promoVideo')
        ),
      
      S.divider(),
      
      // testimonials - multiple entries
      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Testimonials',
        S,
        context,
      }),


      S.divider(),

      // fees - singleton
      S.listItem()
        .title('Fees')
        .id('fees')
        .child(
          S.document()
            .schemaType('fees')
            .documentId('fees')
        ),
      
      S.divider(),

      // espanol - singleton
      S.listItem()
        .title('Se Habla Español')
        .id('espanol')
        .child(
          S.document()
            .schemaType('espanol')
            .documentId('espanol')
        ),
      

      S.divider(),

      // resources - singleton
      S.listItem()
        .title('Resources / Legal Requirements')
        .id('resources')
        .child(
          S.document()
            .schemaType('resources')
            .documentId('resources')
        ), 

      S.divider(),

      // contact - singleton
      S.listItem()
        .title('Contact')
        .id('contact')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
        ), 
      
    ])
