'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, 
  Users, 
  ChefHat, 
  ArrowLeft, 
  Printer, 
  Share2,
  Heart,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import { mockRecipes } from '@/data/mockRecipes';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const [servings, setServings] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const recipe = mockRecipes.find(r => r.id === params.id);
  
  if (!recipe) {
    notFound();
  }

  // Initialize servings with recipe default
  if (servings === 0) {
    setServings(recipe.servings);
  }

  const servingMultiplier = servings / recipe.servings;
  const totalTime = recipe.prepTime + recipe.cookTime;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  const adjustIngredientAmount = (amount: string): string => {
    // Simple fraction and decimal adjustment
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      const adjusted = numericAmount * servingMultiplier;
      return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(2);
    }
    return amount; // Return original if not numeric
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print">
        <Header />
      </div>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="no-print mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to recipes
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="print-recipe bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Hero Image */}
          {recipe.images.length > 0 && (
            <div className="relative h-64 md:h-80">
              <Image
                src={recipe.images[0]}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title and Actions */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                    {recipe.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {recipe.description}
                </p>
              </div>
              
              <div className="no-print flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-full ${
                    isFavorited 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Printer className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Recipe Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Clock className="h-6 w-6 text-gray-500 mx-auto mb-1" />
                <div className="text-sm text-gray-500">Prep Time</div>
                <div className="font-semibold">{recipe.prepTime}min</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 text-gray-500 mx-auto mb-1" />
                <div className="text-sm text-gray-500">Cook Time</div>
                <div className="font-semibold">{recipe.cookTime}min</div>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-gray-500 mx-auto mb-1" />
                <div className="text-sm text-gray-500">Servings</div>
                <div className="font-semibold flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="no-print w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span>{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="no-print w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-center">
                <ChefHat className="h-6 w-6 text-gray-500 mx-auto mb-1" />
                <div className="text-sm text-gray-500">Difficulty</div>
                <div className={`font-semibold ${
                  recipe.difficulty === 'Easy' 
                    ? 'text-secondary-600'
                    : recipe.difficulty === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {recipe.difficulty}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        <strong>{adjustIngredientAmount(ingredient.amount)} {ingredient.unit}</strong> {ingredient.ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-500 text-white text-sm font-medium rounded-full mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Notes */}
            {recipe.notes && (
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Chef's Notes</h3>
                <p className="text-yellow-700">{recipe.notes}</p>
              </div>
            )}

            {/* Recipe Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <div className="flex justify-between items-center">
                <div>
                  Recipe by <span className="font-medium">{recipe.author}</span>
                </div>
                <div>
                  Created on {new Date(recipe.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Images */}
        {recipe.images.length > 1 && (
          <div className="no-print mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">More Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recipe.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${recipe.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
