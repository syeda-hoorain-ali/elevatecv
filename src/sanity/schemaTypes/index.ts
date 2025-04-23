import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { contactPage } from './contactPage'
import { features } from './features'
import { pages } from './pages'
import { pricing } from './pricing'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, contactPage, features, pages, pricing],
}
