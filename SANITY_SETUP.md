# Sanity Studio Setup for Cassia Recipes

## Getting Started with Sanity

### 1. Create a Sanity Account and Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   ```bash
   npx sanity@latest init
   ```
   Or create one through the Sanity dashboard

3. Note down your **Project ID** and **Dataset** (usually 'production')

### 2. Configure Environment Variables

Update your `.env.local` file with your actual Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Update Sanity Configuration

Update the `sanity.config.ts` file with your project ID:

```typescript
export default defineConfig({
  name: 'cassia-recipes',
  title: 'Cassia Recipes',
  
  projectId: 'your-actual-project-id', // Replace with your project ID
  dataset: 'production',
  
  // ... rest of config
})
```

### 4. Deploy Your Schema

Deploy your schema to Sanity:

```bash
npx sanity deploy
```

### 5. Access Sanity Studio

You can access Sanity Studio in two ways:

#### Option A: Embedded Studio (Recommended)
Visit `http://localhost:3000/studio` in your Next.js app

#### Option B: Standalone Studio
Run the studio separately:
```bash
npm run sanity
```
Then visit `http://localhost:3333`

### 6. Add Your First Recipe

1. Open Sanity Studio
2. Click "Create" → "Recipe"
3. Fill in all the required fields:
   - Title
   - Slug (auto-generated from title)
   - Description
   - Category
   - Difficulty
   - Prep Time & Cook Time
   - Servings
   - Ingredients (add multiple)
   - Instructions (add multiple steps)
   - Tags
   - Images (upload from your computer)
   - Notes (optional)

### 7. Update Your Next.js App

Once you have recipes in Sanity, you'll need to update your Next.js components to fetch data from Sanity instead of mock data.

#### Example: Update your home page

```typescript
// src/app/page.tsx
import { getAllRecipes } from '../utils/sanityUtils'

export default async function HomePage() {
  const recipes = await getAllRecipes()
  
  // Your existing component logic, but using Sanity data
  return (
    // Your JSX
  )
}
```

### 8. Migrate Existing Mock Data (Optional)

If you want to migrate your existing mock recipes to Sanity:

1. Install tsx for running TypeScript files:
   ```bash
   npm install -D tsx
   ```

2. Update the migration script with your actual project details

3. Run the migration:
   ```bash
   npx tsx scripts/migrate-data.ts
   ```

## Key Features of Your Sanity Setup

### Schema Features
- **Recipe Management**: Complete recipe structure matching your existing data
- **Image Handling**: Upload and manage multiple images per recipe
- **Structured Content**: Ingredients and instructions as structured arrays
- **Categorization**: Predefined categories and tags
- **SEO-Friendly**: Slug generation for clean URLs

### Studio Features
- **Rich Editing**: User-friendly interface for content management
- **Preview**: See how content will look before publishing
- **Validation**: Built-in validation for required fields
- **Media Management**: Upload and organize images
- **Collaborative**: Multiple users can edit content

### Integration Features
- **Real-time**: Changes in Studio appear immediately in your app
- **TypeScript**: Full type safety with generated types
- **Image Optimization**: Automatic image optimization and CDN
- **GROQ Queries**: Powerful query language for fetching data

## Next Steps

1. **Set up your Sanity project** with the steps above
2. **Add some recipes** through the Studio interface
3. **Update your Next.js components** to use Sanity data
4. **Deploy your schema** and start creating content
5. **Customize the Studio** to match your workflow needs

## Useful Commands

```bash
# Start Next.js development server
npm run dev

# Start Sanity Studio (standalone)
npm run sanity

# Deploy schema changes
npx sanity deploy

# Check Sanity project status
npx sanity status

# Generate TypeScript types from schema
npx sanity typegen generate
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
