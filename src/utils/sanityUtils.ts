import { client, recipesQuery, recipeBySlugQuery, recipesByCategory } from '../lib/sanity'
import { Recipe } from '../types/sanity'

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await client.fetch(recipesQuery)
    return recipes
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const recipe = await client.fetch(recipeBySlugQuery, { slug })
    return recipe
  } catch (error) {
    console.error('Error fetching recipe by slug:', error)
    return null
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    const recipes = await client.fetch(recipesByCategory, { category })
    return recipes
  } catch (error) {
    console.error('Error fetching recipes by category:', error)
    return []
  }
}

// Filter and search utilities (adapted for Sanity data)
export function filterRecipes(
  recipes: Recipe[],
  searchTerm: string,
  selectedCategory: string,
  selectedTags: string[]
): Recipe[] {
  return recipes.filter((recipe) => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => 
        ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )

    // Category filter
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory

    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => recipe.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })
}

export function sortRecipes(recipes: Recipe[], sortBy: string): Recipe[] {
  const sorted = [...recipes]
  
  switch (sortBy) {
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'cookTime':
      return sorted.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime))
    case 'recent':
    default:
      return sorted.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
  }
}
