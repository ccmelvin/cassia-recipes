'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { categories, allTags } from '@/data/mockRecipes';

interface RecipeFiltersProps {
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export default function RecipeFilters({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters
}: RecipeFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 12);

  const hasActiveFilters = selectedCategory !== 'All' || selectedTags.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {displayedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {allTags.length > 12 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            {showAllTags ? 'Show less' : `Show ${allTags.length - 12} more tags`}
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                Category: {selectedCategory}
                <button
                  onClick={() => onCategoryChange('All')}
                  className="ml-1 hover:text-orange-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
