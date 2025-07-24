'use client';

import { useState } from 'react';
import { Heart, Share2, Printer } from 'lucide-react';
import { Recipe } from '@/types/sanity';

interface RecipeClientProps {
  recipe: Recipe;
}

export default function RecipeClient({ recipe }: RecipeClientProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description || '',
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

  return (
    <>
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
    </>
  );
}
