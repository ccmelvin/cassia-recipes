import Link from 'next/link';
import { ChefHat, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <ChefHat className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! It looks like this recipe has gone missing from our kitchen. 
            Don't worry, we have plenty of other delicious recipes waiting for you!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center btn-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try searching for something specific using the search bar above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
