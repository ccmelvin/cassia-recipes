import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">Cassia Recipes</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/studio" 
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Studio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
