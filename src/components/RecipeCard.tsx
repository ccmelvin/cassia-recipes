import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/sanity';
import { urlFor } from '@/lib/sanity';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link href={`/recipe/${recipe.slug.current}`} className="block">
      <div className="recipe-card overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-gray-200">
          {recipe.images && recipe.images.length > 0 ? (
            <Image
              src={urlFor(recipe.images[0]).width(800).height(600).url()}
              alt={recipe.images[0].alt || recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ChefHat className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Difficulty Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              recipe.difficulty === 'Easy' 
                ? 'bg-green-100 text-green-800'
                : recipe.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
              {recipe.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {recipe.title}
          </h3>

          {/* Description */}
          {recipe.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {recipe.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{totalTime}min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
