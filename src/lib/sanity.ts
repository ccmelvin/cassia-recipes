import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Remove token for public read access
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for recipes
export const recipesQuery = `*[_type == "recipe"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  category,
  difficulty,
  prepTime,
  cookTime,
  servings,
  ingredients,
  instructions,
  tags,
  images,
  notes,
  author,
  publishedAt
}`

export const recipeBySlugQuery = `*[_type == "recipe" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  category,
  difficulty,
  prepTime,
  cookTime,
  servings,
  ingredients,
  instructions,
  tags,
  images,
  notes,
  author,
  publishedAt
}`

export const recipesByCategory = `*[_type == "recipe" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  category,
  difficulty,
  prepTime,
  cookTime,
  servings,
  ingredients,
  instructions,
  tags,
  images,
  notes,
  author,
  publishedAt
}`
