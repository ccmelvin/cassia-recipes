import Header from '@/components/Header';
import CategoriesGrid from '@/components/CategoriesGrid';
import { getAllRecipes } from '@/utils/sanityUtils';

export default async function CategoriesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse recipes by category to find exactly what you're looking for.
          </p>
        </div>

        <CategoriesGrid recipes={recipes} />
      </main>
    </div>
  );
}
