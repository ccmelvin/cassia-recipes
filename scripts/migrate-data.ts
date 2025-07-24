import { client } from '../src/lib/sanity'
import { mockRecipes } from '../src/data/mockRecipes'

// This script helps migrate your existing mock data to Sanity
// Run with: npx tsx scripts/migrate-data.ts

async function migrateRecipes() {
  console.log('Starting recipe migration...')
  
  for (const recipe of mockRecipes) {
    try {
      // Transform mock data to Sanity format
      const sanityRecipe = {
        _type: 'recipe',
        title: recipe.title,
        slug: {
          _type: 'slug',
          current: recipe.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        },
        description: recipe.description,
        category: recipe.category,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tags: recipe.tags,
        notes: recipe.notes,
        author: recipe.author,
        publishedAt: recipe.createdAt,
        // Note: You'll need to manually upload images to Sanity
        // and reference them here, or use the Sanity client to upload
      }
      
      const result = await client.create(sanityRecipe)
      console.log(`✅ Migrated recipe: ${recipe.title}`)
      console.log(`   Sanity ID: ${result._id}`)
      
    } catch (error) {
      console.error(`❌ Failed to migrate recipe: ${recipe.title}`, error)
    }
  }
  
  console.log('Migration completed!')
}

// Uncomment the line below when you're ready to run the migration
// migrateRecipes().catch(console.error)
