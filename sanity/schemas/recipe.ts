import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Breakfast', value: 'Breakfast' },
          { title: 'Salads', value: 'Salads' },
          { title: 'Main Dishes', value: 'Main Dishes' },
          { title: 'Desserts', value: 'Desserts' },
          { title: 'Appetizers', value: 'Appetizers' },
          { title: 'Soups', value: 'Soups' },
          { title: 'Beverages', value: 'Beverages' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'Easy' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Hard', value: 'Hard' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'amount',
              title: 'Amount',
              type: 'string',
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
            },
            {
              name: 'ingredient',
              title: 'Ingredient',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              amount: 'amount',
              unit: 'unit',
              ingredient: 'ingredient',
            },
            prepare({ amount, unit, ingredient }) {
              return {
                title: `${amount || ''} ${unit || ''} ${ingredient}`.trim(),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'instruction',
              title: 'Instruction',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              step: 'step',
              instruction: 'instruction',
            },
            prepare({ step, instruction }) {
              return {
                title: `Step ${step}`,
                subtitle: instruction?.substring(0, 60) + '...',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free',
          'quick', 'easy', 'healthy', 'comfort-food', 'spicy',
          'sweet', 'savory', 'italian', 'asian', 'mexican',
          'mediterranean', 'american', 'indian', 'thai', 'chinese',
          'baked', 'grilled', 'fried', 'steamed', 'raw'
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Recipe Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'notes',
      title: 'Chef Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Cassia',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      category: 'category',
      difficulty: 'difficulty',
    },
    prepare({ title, media, category, difficulty }) {
      return {
        title,
        subtitle: `${category} • ${difficulty}`,
        media,
      }
    },
  },
})
