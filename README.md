# Cassia Recipes - Recipe Blog Web App

A modern, responsive recipe blog built with Next.js 15, Sanity CMS, Tailwind CSS v4, and TypeScript. Features a headless CMS backend, clean design, advanced filtering, search functionality, and printable recipe cards.

## 🚀 Features

### Core Features
- **Recipe Listing**: Browse all recipes with beautiful card layouts
- **Recipe Details**: Detailed recipe pages with ingredients, instructions, and metadata
- **Search & Filter**: Advanced search by ingredients, tags, categories, and recipe names
- **Categories**: Organized recipe browsing by food categories (Breakfast, Salads, Main Dishes, Desserts)
- **Printable Recipe Cards**: Print-optimized recipe layouts with custom CSS
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### User Experience
- **Interactive Serving Adjustment**: Dynamically adjust ingredient quantities with +/- buttons
- **Cooking Time Display**: Clear prep time, cook time, and total time indicators
- **Difficulty Levels**: Easy, Medium, Hard difficulty indicators with color coding
- **Tag System**: Comprehensive tagging for easy recipe discovery
- **Image Gallery**: Multiple images per recipe with Unsplash integration
- **Social Sharing**: Share recipes via native sharing API or clipboard
- **Favorites**: Heart icon to mark favorite recipes

### Technical Features
- **Next.js 15**: Latest Next.js with App Router and Turbopack
- **Sanity CMS**: Headless CMS for content management with Studio interface
- **Tailwind CSS v4**: Modern styling with PostCSS integration
- **TypeScript**: Full type safety throughout the application
- **Image Optimization**: Sanity image optimization and Next.js Image component
- **Print Styles**: Custom CSS classes for beautiful printed recipe cards
- **Real-time Content**: Live content updates from Sanity Studio

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.3 with App Router
- **CMS**: Sanity v3.99.0 with Studio interface
- **Styling**: Tailwind CSS v4.1.11 with PostCSS
- **Language**: TypeScript 5
- **Icons**: Lucide React v0.525.0
- **Images**: Sanity Image with optimization
- **Development**: Turbopack for fast development builds

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cassia-recipes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Sanity configuration:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   This uses Turbopack for faster development builds.

5. **Run Sanity Studio (optional)**
   ```bash
   npm run sanity
   ```
   Access the Studio at [http://localhost:3333](http://localhost:3333)

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── categories/        # Categories page
│   ├── recipe/[slug]/     # Dynamic recipe pages (slug-based)
│   ├── studio/            # Sanity Studio integration
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page with server-side data fetching
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── RecipeCard.tsx     # Recipe preview cards
│   ├── RecipeFilters.tsx  # Filter and search components
│   ├── RecipeGrid.tsx     # Client-side recipe grid with filtering
│   └── RecipeClient.tsx   # Client-side recipe detail component
├── lib/                   # External service configurations
│   └── sanity.ts          # Sanity client and GROQ queries
├── sanity/                # Sanity CMS configuration
│   ├── schemaTypes/       # Content type definitions
│   ├── lib/               # Sanity utilities
│   └── structure.ts       # Studio structure
├── types/                 # TypeScript type definitions
│   └── sanity.ts          # Sanity-specific types
├── data/                  # Legacy mock data (for reference)
│   └── mockRecipes.ts     # Original mock data structure
└── utils/                 # Utility functions
    ├── recipeUtils.ts     # Recipe filtering utilities
    └── sanityUtils.ts     # Sanity data fetching utilities
```

## 🎨 Design System

### Colors
- **Primary**: Orange tones (#f2770a) for main actions and branding
- **Secondary**: Green tones (#22c55e) for tags and secondary actions
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Recipe Cards**: Hover effects and clean layouts
- **Buttons**: Primary and secondary button styles
- **Forms**: Consistent input styling with focus states
- **Print Styles**: Optimized layouts for printing

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🖨️ Print Functionality

Recipe pages include print-optimized styles:
- Clean, minimal layout for printing
- Hidden navigation and interactive elements
- Optimized typography and spacing
- Page break considerations

## 🔍 Search & Filter Features

### Search Capabilities
- Recipe titles and descriptions
- Ingredients (searches through ingredient lists)
- Tags and categories
- Real-time search as you type

### Filter Options
- **Categories**: All, Breakfast, Salads, Main Dishes, Desserts, Appetizers, Soups, Beverages
- **Tags**: Multiple tag selection with 25+ available tags including dietary preferences, cooking methods, and cuisines
- **Clear Filters**: One-click filter reset functionality

### Sorting Options
- Most Recent (default) - sorts by creation date
- Alphabetical (A-Z) - sorts by recipe title
- Cooking Time - sorts by total time (prep + cook time)

### Content Management
- **Sanity Studio**: Built-in content management interface at `/studio`
- **Real-time Updates**: Content changes reflect immediately
- **Structured Content**: Defined schemas for recipes, ingredients, and instructions
- **Image Management**: Integrated image upload and optimization

## 🍳 Recipe Data Structure

Each recipe includes:
- **Basic Information**: title, slug, description, category
- **Timing**: prep time, cook time, servings (with interactive adjustment)
- **Difficulty Level**: Easy, Medium, or Hard with color coding
- **Ingredients**: structured array with amount, unit, and ingredient name
- **Instructions**: numbered step-by-step instruction objects
- **Tags**: array of descriptive tags for filtering
- **Images**: Sanity image assets with built-in optimization
- **Notes**: optional chef's notes and tips
- **Metadata**: author, publication date, and Sanity document ID
- **Interactive Features**: serving size adjustment, favorites, sharing, printing

## 🚀 Deployment

### Static Export (Ready for Configuration)
The project is configured for static export compatibility:
- Images are set to `unoptimized: true` in `next.config.ts`
- Remote image patterns configured for Unsplash
- To enable static export, uncomment `output: 'export'` in `next.config.ts`

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Vercel Deployment
1. Connect your repository to Vercel
2. Deploy automatically with each push
3. No additional configuration needed

## 🔧 Customization

### Adding New Recipes
- Use Sanity Studio at `/studio` to create and manage recipes
- Access the Studio interface for rich content editing
- Real-time preview and publishing workflow

### Content Schema
- Recipe schema defined in `src/sanity/schemaTypes/`
- Structured content types for ingredients and instructions
- Extensible schema for adding new fields

### Styling Changes
- Tailwind CSS v4 configuration in `postcss.config.js` and `postcss.config.mjs`
- Global styles in `src/app/globals.css`
- Print-specific styles included for recipe cards

### Component Architecture
- Server-side data fetching with Sanity client
- Client-side filtering and search functionality
- Modular React components with TypeScript
- Responsive design with mobile-first approach

## 🎯 Current Implementation Status

### Completed Features
- ✅ Sanity CMS integration with Studio interface
- ✅ Server-side data fetching from Sanity
- ✅ Recipe listing with search and filtering
- ✅ Dynamic recipe detail pages (slug-based routing)
- ✅ Interactive serving size adjustment
- ✅ Print-optimized recipe cards
- ✅ Responsive design across all devices
- ✅ Social sharing functionality
- ✅ Favorites system (UI implemented)
- ✅ Category and tag-based filtering
- ✅ Real-time search functionality
- ✅ Content management through Sanity Studio

### Future Enhancement Ideas
- **User Authentication**: User accounts and personalization
- **Recipe Ratings**: Community ratings and reviews
- **Shopping Lists**: Generate shopping lists from recipes
- **Meal Planning**: Weekly meal planning functionality
- **Nutritional Information**: Calorie and nutrition data
- **Recipe Scaling**: Advanced unit conversions
- **Comments System**: Recipe comments and community features
- **Recipe Collections**: Curated recipe collections and cookbooks
- **Advanced Search**: Full-text search with Sanity's search capabilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
