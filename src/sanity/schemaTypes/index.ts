import { type SchemaTypeDefinition } from 'sanity'
import { product } from './products'
import { categorySchema } from './categories'
import { order } from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categorySchema, order],
}
