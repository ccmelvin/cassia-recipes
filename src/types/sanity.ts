// Sanity-specific types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// Updated Recipe interface for Sanity
export interface Recipe {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  instructions: Instruction[]
  tags: string[]
  images: SanityImage[]
  notes?: string
  author: string
  publishedAt: string
}

export interface Ingredient {
  amount?: string
  unit?: string
  ingredient: string
}

export interface Instruction {
  step: number
  instruction: string
}

// Helper type for recipe cards (simplified version)
export interface RecipeCard {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prepTime: number
  cookTime: number
  servings: number
  tags: string[]
  images: SanityImage[]
  author: string
  publishedAt: string
}
