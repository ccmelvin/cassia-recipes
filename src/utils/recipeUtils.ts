import { Recipe } from '@/data/mockRecipes';

export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes;
  
  const searchTerm = query.toLowerCase().trim();
  
  return recipes.filter(recipe => {
    // Search in title
    if (recipe.title.toLowerCase().includes(searchTerm)) return true;
    
    // Search in description
    if (recipe.description.toLowerCase().includes(searchTerm)) return true;
    
    // Search in ingredients
    if (recipe.ingredients.some(ing => 
      ing.ingredient.toLowerCase().includes(searchTerm)
    )) return true;
    
    // Search in tags
    if (recipe.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )) return true;
    
    // Search in category
    if (recipe.category.toLowerCase().includes(searchTerm)) return true;
    
    // Search in instructions
    if (recipe.instructions.some(instruction => 
      instruction.toLowerCase().includes(searchTerm)
    )) return true;
    
    return false;
  });
}

export function filterRecipesByCategory(recipes: Recipe[], category: string): Recipe[] {
  if (category === 'All') return recipes;
  return recipes.filter(recipe => recipe.category === category);
}

export function filterRecipesByTags(recipes: Recipe[], tags: string[]): Recipe[] {
  if (tags.length === 0) return recipes;
  return recipes.filter(recipe => 
    tags.every(tag => recipe.tags.includes(tag))
  );
}

export function sortRecipes(recipes: Recipe[], sortBy: 'recent' | 'title' | 'time' | 'difficulty'): Recipe[] {
  const sorted = [...recipes];
  
  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'time':
      return sorted.sort((a, b) => 
        (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime)
      );
    
    case 'difficulty':
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return sorted.sort((a, b) => 
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    
    case 'recent':
    default:
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export function getRecipesByCategory(recipes: Recipe[]): Record<string, Recipe[]> {
  return recipes.reduce((acc, recipe) => {
    if (!acc[recipe.category]) {
      acc[recipe.category] = [];
    }
    acc[recipe.category].push(recipe);
    return acc;
  }, {} as Record<string, Recipe[]>);
}

export function getPopularTags(recipes: Recipe[], limit: number = 10): string[] {
  const tagCounts: Record<string, number> = {};
  
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function formatCookingTime(prepTime: number, cookTime: number): string {
  const total = prepTime + cookTime;
  
  if (total < 60) {
    return `${total}min`;
  }
  
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}min`;
}

export function adjustIngredientAmount(amount: string, multiplier: number): string {
  // Handle fractions
  const fractionMatch = amount.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1]) * multiplier;
    const denominator = parseInt(fractionMatch[2]);
    return `${numerator}/${denominator}`;
  }
  
  // Handle mixed numbers (e.g., "1 1/2")
  const mixedMatch = amount.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1]) * multiplier;
    const numerator = parseInt(mixedMatch[2]) * multiplier;
    const denominator = parseInt(mixedMatch[3]);
    return `${whole} ${numerator}/${denominator}`;
  }
  
  // Handle decimal numbers
  const numericAmount = parseFloat(amount);
  if (!isNaN(numericAmount)) {
    const adjusted = numericAmount * multiplier;
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(2);
  }
  
  // Return original if not numeric
  return amount;
}
