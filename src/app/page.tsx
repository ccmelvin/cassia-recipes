import Header from '@/components/Header';
import RecipeGrid from '@/components/RecipeGrid';
import { getAllRecipes } from '@/utils/sanityUtils';

export default async function Home() {
  // Fetch recipes from Sanity
  const recipes = await getAllRecipes();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Cassia Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover delicious recipes, cooking tips, and culinary inspiration. 
            From quick weeknight dinners to special occasion treats.
          </p>
        </div>

        {/* Recipe Grid with Client-side Filtering */}
        <RecipeGrid initialRecipes={recipes} />
      </main>
    </div>
  );
}
