'use client';

import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types/sanity';
import { ChefHat } from 'lucide-react';

interface CategoriesGridProps {
  recipes: Recipe[];
}

const categories = [
  'All',
  'Breakfast',
  'Salads', 
  'Main Dishes',
  'Desserts',
  'Appetizers',
  'Soups',
  'Beverages'
];

export default function CategoriesGrid({ recipes }: CategoriesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === 'All') return recipes.length;
    return recipes.filter(recipe => recipe.category === category).length;
  };

  return (
    <>
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
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50 text-gray-700'
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
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes in this category</h3>
          <p className="text-gray-600 mb-4">
            {recipes.length === 0 
              ? "No recipes have been created yet. Visit the Studio to add your first recipe!"
              : `No recipes found in the ${selectedCategory} category yet.`
            }
          </p>
          {recipes.length === 0 && (
            <a
              href="/studio"
              className="btn-primary"
            >
              Go to Studio
            </a>
          )}
        </div>
      )}
    </>
  );
}
