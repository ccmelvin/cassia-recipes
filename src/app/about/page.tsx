import Header from '@/components/Header';
import { ChefHat, Heart, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <ChefHat className="h-16 w-16 text-primary-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Cassia Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to my culinary journey! I'm passionate about creating delicious, 
            accessible recipes that bring joy to your kitchen and table.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
            <p className="text-gray-700 mb-6">
              Hi there! I'm Cassia, and cooking has been my passion for as long as I can remember. 
              What started as helping my grandmother in her kitchen has evolved into a lifelong 
              love affair with food, flavors, and the joy of sharing meals with others.
            </p>
            
            <p className="text-gray-700 mb-6">
              This blog is my way of sharing that passion with you. Here, you'll find recipes 
              that range from quick weeknight dinners to special occasion treats, all tested 
              in my own kitchen and crafted with love. I believe that good food doesn't have 
              to be complicated – it just needs to be made with care and the right ingredients.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Find Here</h2>
            <p className="text-gray-700 mb-6">
              Every recipe on this site comes with detailed instructions, helpful tips, and 
              honest notes about what works (and what doesn't!). I'm all about making cooking 
              approachable and fun, whether you're a beginner cook or a seasoned chef looking 
              for new inspiration.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Made with Love</h3>
            <p className="text-sm text-gray-600">
              Every recipe is tested and perfected in my own kitchen
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Family Friendly</h3>
            <p className="text-sm text-gray-600">
              Recipes that bring families together around the table
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Easy to Follow</h3>
            <p className="text-sm text-gray-600">
              Clear instructions and helpful tips for cooking success
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <ChefHat className="h-8 w-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Diverse Flavors</h3>
            <p className="text-sm text-gray-600">
              From comfort food classics to international cuisine
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            I love hearing from fellow food enthusiasts! Whether you've tried one of my recipes, 
            have a question, or just want to share your own cooking adventures, don't hesitate to reach out.
          </p>
          <p className="text-gray-700">
            You can find me on social media or send me an email. I try to respond to everyone, 
            though it might take a little time during busy cooking seasons!
          </p>
        </div>
      </main>
    </div>
  );
}
