# Cassia Recipes - Recipe Blog Web App

A modern, responsive recipe blog built with Next.js 15, Tailwind CSS v4, and TypeScript. Features a clean design, advanced filtering, search functionality, and printable recipe cards.

## 🚀 Features

### Core Features
- **Recipe Listing**: Browse all recipes with beautiful card layouts
- **Recipe Details**: Detailed recipe pages with ingredients, instructions, and metadata
- **Search & Filter**: Advanced search by ingredients, tags, categories, and recipe names
- **Categories**: Organized recipe browsing by food categories
- **Printable Recipe Cards**: Print-optimized recipe layouts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### User Experience
- **Interactive Serving Adjustment**: Dynamically adjust ingredient quantities
- **Cooking Time Display**: Clear prep time, cook time, and total time indicators
- **Difficulty Levels**: Easy, Medium, Hard difficulty indicators
- **Tag System**: Comprehensive tagging for easy recipe discovery
- **Image Gallery**: Multiple images per recipe with optimized loading
- **Social Sharing**: Share recipes via native sharing API or clipboard

### Technical Features
- **Next.js 15**: Latest Next.js with App Router
- **Tailwind CSS v4**: Modern styling with custom design system
- **TypeScript**: Full type safety throughout the application
- **Image Optimization**: Next.js Image component with Unsplash integration
- **Print Styles**: Custom CSS for beautiful printed recipe cards
- **Mock Data**: Comprehensive recipe dataset for development

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom theme
- **Language**: TypeScript
- **Icons**: Lucide React
- **Images**: Next.js Image with Unsplash
- **Fonts**: Inter (Google Fonts)

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

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── categories/        # Categories page
│   ├── recipe/[id]/       # Dynamic recipe pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── RecipeCard.tsx     # Recipe preview cards
│   └── RecipeFilters.tsx  # Filter and search components
├── data/                  # Mock data and types
│   └── mockRecipes.ts     # Recipe data and TypeScript interfaces
└── utils/                 # Utility functions
    └── recipeUtils.ts     # Recipe filtering and search utilities
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
- Ingredients
- Tags and categories
- Cooking instructions

### Filter Options
- **Categories**: Breakfast, Main Dishes, Desserts, etc.
- **Tags**: Dietary preferences, cooking methods, cuisines
- **Difficulty**: Easy, Medium, Hard
- **Cooking Time**: Sort by total preparation time

### Sorting Options
- Most Recent (default)
- Alphabetical (A-Z)
- Cooking Time (shortest first)
- Difficulty Level

## 🍳 Recipe Data Structure

Each recipe includes:
- Basic information (title, description, category)
- Timing (prep time, cook time, servings)
- Difficulty level
- Comprehensive ingredient list with measurements
- Step-by-step instructions
- Tags for categorization
- Multiple images
- Chef's notes and tips
- Author and creation date

## 🚀 Deployment

### Static Export (Recommended)
1. Enable static export in `next.config.ts`:
   ```typescript
   output: 'export'
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Deploy the `out` folder to any static hosting service

### Vercel Deployment
1. Connect your repository to Vercel
2. Deploy automatically with each push
3. Custom domain configuration available

## 🔧 Customization

### Adding New Recipes
Edit `src/data/mockRecipes.ts` to add new recipes following the existing structure.

### Styling Changes
Modify `tailwind.config.ts` for theme customization and `src/app/globals.css` for global styles.

### Adding Features
The modular component structure makes it easy to add new features like:
- User authentication
- Recipe ratings and reviews
- Shopping list generation
- Meal planning
- Recipe collections/favorites

## 🎯 Future Enhancements

Potential features for future development:
- **Backend Integration**: Connect to a CMS or database
- **User Accounts**: Save favorites and create collections
- **Recipe Ratings**: Community ratings and reviews
- **Shopping Lists**: Generate shopping lists from recipes
- **Meal Planning**: Weekly meal planning functionality
- **Recipe Scaling**: Advanced ingredient scaling with unit conversions
- **Nutritional Information**: Calorie and nutrition data
- **Recipe Sharing**: Social features and recipe sharing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
