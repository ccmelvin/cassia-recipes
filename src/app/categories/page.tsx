'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import RecipeCard from '@/components/RecipeCard';
import { mockRecipes, categories } from '@/data/mockRecipes';
import { ChefHat } from 'lucide-react';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = selectedCategory === 'All' 
    ? mockRecipes 
    : mockRecipes.filter(recipe => recipe.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === 'All') return mockRecipes.length;
    return mockRecipes.filter(recipe => recipe.category === category).length;
  };

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

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const count = getCategoryCount(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  <ChefHat className="h-8 w-8 mb-2" />
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <p className="text-sm opacity-75">{count} recipe{count !== 1 ? 's' : ''}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All Recipes' : selectedCategory}
          </h2>
          <p className="text-gray-600">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
