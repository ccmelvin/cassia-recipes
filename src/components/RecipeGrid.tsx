'use client';

import { useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import RecipeFilters from './RecipeFilters';
import { Recipe } from '@/types/sanity';
import { filterRecipes, sortRecipes } from '@/utils/sanityUtils';

interface RecipeGridProps {
  initialRecipes: Recipe[];
}

export default function RecipeGrid({ initialRecipes }: RecipeGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'cookTime'>('recent');

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    const filtered = filterRecipes(initialRecipes, searchQuery, selectedCategory, selectedTags);
    return sortRecipes(filtered, sortBy);
  }, [initialRecipes, searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.34-4.34M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search recipes, ingredients, or tags..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <RecipeFilters
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategory}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      {/* Sort and Results Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          {searchQuery && (
            <span className="ml-2">
              for "<span className="font-medium">{searchQuery}</span>"
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'alphabetical' | 'cookTime')}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="alphabetical">Title A-Z</option>
            <option value="cookTime">Cooking Time</option>
          </select>
        </div>
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
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600 mb-4">
            {initialRecipes.length === 0 
              ? "No recipes have been created yet. Visit the Studio to add your first recipe!"
              : "Try adjusting your search terms or filters to find what you're looking for."
            }
          </p>
          {initialRecipes.length === 0 ? (
            <a
              href="/studio"
              className="btn-primary"
            >
              Go to Studio
            </a>
          ) : (
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
