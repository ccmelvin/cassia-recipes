export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: {
    amount: string;
    unit: string;
    ingredient: string;
  }[];
  instructions: string[];
  notes?: string;
  images: string[];
  createdAt: string;
  author: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Cinnamon Rolls',
    description: 'Soft, fluffy cinnamon rolls with a rich cream cheese glaze. Perfect for weekend mornings.',
    category: 'Breakfast',
    tags: ['sweet', 'baked', 'comfort food', 'weekend'],
    prepTime: 30,
    cookTime: 25,
    servings: 12,
    difficulty: 'Medium',
    ingredients: [
      { amount: '3', unit: 'cups', ingredient: 'all-purpose flour' },
      { amount: '1/4', unit: 'cup', ingredient: 'granulated sugar' },
      { amount: '1', unit: 'packet', ingredient: 'active dry yeast' },
      { amount: '1', unit: 'tsp', ingredient: 'salt' },
      { amount: '3/4', unit: 'cup', ingredient: 'warm milk' },
      { amount: '1/4', unit: 'cup', ingredient: 'butter, melted' },
      { amount: '1', unit: 'large', ingredient: 'egg' },
      { amount: '1/2', unit: 'cup', ingredient: 'brown sugar' },
      { amount: '2', unit: 'tbsp', ingredient: 'ground cinnamon' },
      { amount: '8', unit: 'oz', ingredient: 'cream cheese, softened' },
      { amount: '1', unit: 'cup', ingredient: 'powdered sugar' },
      { amount: '1', unit: 'tsp', ingredient: 'vanilla extract' }
    ],
    instructions: [
      'In a large bowl, combine flour, granulated sugar, yeast, and salt.',
      'In another bowl, whisk together warm milk, melted butter, and egg.',
      'Add wet ingredients to dry ingredients and mix until a soft dough forms.',
      'Knead dough on a floured surface for 5-8 minutes until smooth.',
      'Place in greased bowl, cover, and let rise for 1 hour.',
      'Roll dough into a 12x18 inch rectangle.',
      'Mix brown sugar and cinnamon, then sprinkle over dough.',
      'Roll up tightly and cut into 12 pieces.',
      'Place in greased 9x13 pan, cover, and let rise 30 minutes.',
      'Bake at 375°F for 20-25 minutes until golden brown.',
      'For glaze: beat cream cheese, powdered sugar, and vanilla until smooth.',
      'Drizzle glaze over warm rolls and serve.'
    ],
    notes: 'Can be prepared the night before and baked in the morning. Store covered for up to 3 days.',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop'],
    createdAt: '2024-01-15',
    author: 'Cassia'
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Salad',
    description: 'A fresh, healthy salad packed with Mediterranean flavors and protein-rich quinoa.',
    category: 'Salads',
    tags: ['healthy', 'vegetarian', 'mediterranean', 'protein'],
    prepTime: 20,
    cookTime: 15,
    servings: 6,
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'cup', ingredient: 'quinoa' },
      { amount: '2', unit: 'cups', ingredient: 'vegetable broth' },
      { amount: '1', unit: 'large', ingredient: 'cucumber, diced' },
      { amount: '2', unit: 'large', ingredient: 'tomatoes, diced' },
      { amount: '1/2', unit: 'cup', ingredient: 'red onion, finely chopped' },
      { amount: '1/2', unit: 'cup', ingredient: 'kalamata olives, pitted and halved' },
      { amount: '1/2', unit: 'cup', ingredient: 'feta cheese, crumbled' },
      { amount: '1/4', unit: 'cup', ingredient: 'fresh parsley, chopped' },
      { amount: '2', unit: 'tbsp', ingredient: 'fresh mint, chopped' },
      { amount: '1/4', unit: 'cup', ingredient: 'olive oil' },
      { amount: '2', unit: 'tbsp', ingredient: 'lemon juice' },
      { amount: '1', unit: 'tsp', ingredient: 'dried oregano' },
      { amount: '1/2', unit: 'tsp', ingredient: 'salt' },
      { amount: '1/4', unit: 'tsp', ingredient: 'black pepper' }
    ],
    instructions: [
      'Rinse quinoa under cold water until water runs clear.',
      'In a saucepan, bring vegetable broth to a boil.',
      'Add quinoa, reduce heat to low, cover and simmer for 15 minutes.',
      'Remove from heat and let stand 5 minutes, then fluff with a fork.',
      'Let quinoa cool completely.',
      'In a large bowl, combine cooled quinoa, cucumber, tomatoes, red onion, olives, feta, parsley, and mint.',
      'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.',
      'Pour dressing over salad and toss to combine.',
      'Refrigerate for at least 30 minutes before serving.',
      'Taste and adjust seasoning as needed.'
    ],
    notes: 'This salad tastes even better the next day! Can be stored in the refrigerator for up to 3 days.',
    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop'],
    createdAt: '2024-02-03',
    author: 'Cassia'
  },
  {
    id: '3',
    title: 'Spicy Thai Basil Chicken',
    description: 'A quick and flavorful Thai stir-fry with ground chicken, fresh basil, and chilies.',
    category: 'Main Dishes',
    tags: ['spicy', 'thai', 'quick', 'protein', 'asian'],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      { amount: '1', unit: 'lb', ingredient: 'ground chicken' },
      { amount: '3', unit: 'tbsp', ingredient: 'vegetable oil' },
      { amount: '4', unit: 'cloves', ingredient: 'garlic, minced' },
      { amount: '2', unit: 'thai chilies', ingredient: 'finely chopped (or to taste)' },
      { amount: '1', unit: 'medium', ingredient: 'onion, sliced' },
      { amount: '1', unit: 'red bell pepper', ingredient: 'sliced' },
      { amount: '2', unit: 'tbsp', ingredient: 'fish sauce' },
      { amount: '1', unit: 'tbsp', ingredient: 'soy sauce' },
      { amount: '1', unit: 'tbsp', ingredient: 'oyster sauce' },
      { amount: '1', unit: 'tsp', ingredient: 'sugar' },
      { amount: '1', unit: 'cup', ingredient: 'fresh Thai basil leaves' },
      { amount: '4', unit: 'cups', ingredient: 'cooked jasmine rice' },
      { amount: '4', unit: 'large', ingredient: 'eggs (optional, for serving)' }
    ],
    instructions: [
      'Heat 2 tablespoons oil in a large wok or skillet over high heat.',
      'Add garlic and chilies, stir-fry for 30 seconds until fragrant.',
      'Add ground chicken and cook, breaking it up, for 3-4 minutes.',
      'Add onion and bell pepper, stir-fry for 2-3 minutes.',
      'In a small bowl, mix fish sauce, soy sauce, oyster sauce, and sugar.',
      'Add sauce mixture to the pan and stir to combine.',
      'Remove from heat and stir in fresh basil leaves.',
      'If using eggs, fry them in remaining oil until crispy edges form.',
      'Serve over jasmine rice, topped with fried egg if desired.',
      'Garnish with extra basil leaves and sliced chilies.'
    ],
    notes: 'Adjust the number of chilies based on your heat preference. Thai basil is preferred, but regular basil can be substituted.',
    images: ['https://images.unsplash.com/photo-1559847844-d721426d6edc?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop'],
    createdAt: '2024-02-10',
    author: 'Cassia'
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies',
    description: 'The perfect chewy chocolate chip cookies with crispy edges and soft centers.',
    category: 'Desserts',
    tags: ['sweet', 'cookies', 'chocolate', 'classic', 'baked'],
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'Easy',
    ingredients: [
      { amount: '2 1/4', unit: 'cups', ingredient: 'all-purpose flour' },
      { amount: '1', unit: 'tsp', ingredient: 'baking soda' },
      { amount: '1', unit: 'tsp', ingredient: 'salt' },
      { amount: '1', unit: 'cup', ingredient: 'butter, softened' },
      { amount: '3/4', unit: 'cup', ingredient: 'granulated sugar' },
      { amount: '3/4', unit: 'cup', ingredient: 'brown sugar, packed' },
      { amount: '2', unit: 'large', ingredient: 'eggs' },
      { amount: '2', unit: 'tsp', ingredient: 'vanilla extract' },
      { amount: '2', unit: 'cups', ingredient: 'chocolate chips' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a medium bowl, whisk together flour, baking soda, and salt.',
      'In a large bowl, cream together softened butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then add vanilla extract.',
      'Gradually mix in the flour mixture until just combined.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons of dough onto ungreased baking sheets.',
      'Bake for 9-11 minutes or until golden brown around edges.',
      'Cool on baking sheet for 2 minutes before transferring to wire rack.',
      'Store in airtight container for up to 1 week.'
    ],
    notes: 'For extra chewy cookies, slightly underbake them. For crispier cookies, bake a minute or two longer.',
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop'],
    createdAt: '2024-01-28',
    author: 'Cassia'
  },
  {
    id: '5',
    title: 'Creamy Mushroom Risotto',
    description: 'Rich and creamy Arborio rice cooked with mixed mushrooms and Parmesan cheese.',
    category: 'Main Dishes',
    tags: ['vegetarian', 'italian', 'creamy', 'mushrooms', 'comfort food'],
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { amount: '6', unit: 'cups', ingredient: 'vegetable broth' },
      { amount: '2', unit: 'tbsp', ingredient: 'olive oil' },
      { amount: '2', unit: 'tbsp', ingredient: 'butter' },
      { amount: '1', unit: 'medium', ingredient: 'onion, finely chopped' },
      { amount: '8', unit: 'oz', ingredient: 'mixed mushrooms, sliced' },
      { amount: '3', unit: 'cloves', ingredient: 'garlic, minced' },
      { amount: '1 1/2', unit: 'cups', ingredient: 'Arborio rice' },
      { amount: '1/2', unit: 'cup', ingredient: 'dry white wine' },
      { amount: '1/2', unit: 'cup', ingredient: 'Parmesan cheese, grated' },
      { amount: '2', unit: 'tbsp', ingredient: 'fresh parsley, chopped' },
      { amount: '1', unit: 'tsp', ingredient: 'salt' },
      { amount: '1/2', unit: 'tsp', ingredient: 'black pepper' }
    ],
    instructions: [
      'Heat vegetable broth in a saucepan and keep warm over low heat.',
      'In a large, heavy-bottomed pan, heat olive oil and 1 tablespoon butter over medium heat.',
      'Add onion and cook until translucent, about 3 minutes.',
      'Add mushrooms and cook until they release their moisture and become golden, about 5 minutes.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Add Arborio rice and stir to coat with oil, cooking for 2 minutes.',
      'Pour in white wine and stir until absorbed.',
      'Add warm broth one ladle at a time, stirring constantly until absorbed before adding more.',
      'Continue this process for 18-20 minutes until rice is creamy and tender.',
      'Remove from heat and stir in remaining butter, Parmesan, and parsley.',
      'Season with salt and pepper to taste.',
      'Serve immediately while hot and creamy.'
    ],
    notes: 'The key to good risotto is patience and constant stirring. The rice should be creamy but still have a slight bite.',
    images: ['https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'],
    createdAt: '2024-02-18',
    author: 'Cassia'
  }
];

export const categories = [
  'All',
  'Breakfast',
  'Salads', 
  'Main Dishes',
  'Desserts',
  'Appetizers',
  'Soups',
  'Beverages'
];

export const allTags = [
  'sweet', 'savory', 'spicy', 'healthy', 'vegetarian', 'vegan', 'gluten-free',
  'quick', 'comfort food', 'baked', 'grilled', 'mediterranean', 'asian', 'italian',
  'thai', 'mexican', 'protein', 'low-carb', 'dairy-free', 'nuts', 'chocolate',
  'seasonal', 'holiday', 'weekend', 'weeknight', 'batch-cooking'
];
