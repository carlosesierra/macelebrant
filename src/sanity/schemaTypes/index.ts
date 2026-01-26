// schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import home from './home'
import about from './about'
import promoVideo from './promoVideo'
import testimonial from './testimonial'
import fees from './fees'
import espanol from './espanol'
import resources from './resources'
import contact from './contact'
import youtube from './youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, about, promoVideo, testimonial, fees, espanol, resources, contact , youtube], 
}
