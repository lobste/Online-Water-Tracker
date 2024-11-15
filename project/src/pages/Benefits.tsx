import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Heart, ArrowLeft, ExternalLink } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">Benefits of Drinking Water</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Regular water consumption is essential for a healthy lifestyle. Here are the main benefits of staying hydrated:
          </p>

          <div className="grid gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">Physical Health</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Regulates body temperature</li>
                <li>Removes toxins</li>
                <li>Protects joint health</li>
                <li>Improves skin health</li>
                <li>Supports digestive system</li>
              </ul>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">Mental Performance</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Increases concentration</li>
                <li>Enhances memory</li>
                <li>Improves mood</li>
                <li>Reduces fatigue</li>
              </ul>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">Weight Management</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Boosts metabolism</li>
                <li>Increases feeling of fullness</li>
                <li>Reduces calorie intake</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Recommended Daily Water Intake</h2>
            <p className="text-gray-600 mb-4">
              According to the World Health Organization, an adult should consume approximately 2-2.5 liters of water daily. 
              However, this amount may vary based on age, gender, physical activity level, and climate conditions.
            </p>
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/drinking-water"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              WHO Water Consumption Guidelines
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Related Pages</h2>
            <div className="space-y-2">
              <Link to="/how-to-use" className="text-blue-600 hover:text-blue-800 block">
                → How to Use
              </Link>
              <Link to="/about" className="text-blue-600 hover:text-blue-800 block">
                → About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
