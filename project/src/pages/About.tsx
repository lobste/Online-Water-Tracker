import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Droplet, ArrowLeft } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Droplet className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">About Us</h1>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            WaterTracker.online is a free web application designed to help you track your daily water intake. 
            We understand the importance of adequate water consumption for a healthy lifestyle and want to help you maintain it.
          </p>

          <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To enable people to easily track their daily water consumption and develop healthy hydration habits 
            that contribute to their overall well-being.
          </p>

          <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">Why WaterTracker?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>User-friendly interface</li>
            <li>Customizable goals</li>
            <li>Reminder notifications</li>
            <li>Detailed statistics</li>
            <li>Free to use</li>
          </ul>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Learn More</h2>
            <div className="space-y-2">
              <Link to="/how-to-use" className="text-blue-600 hover:text-blue-800 block">
                → How to Use
              </Link>
              <Link to="/benefits-of-water" className="text-blue-600 hover:text-blue-800 block">
                → Benefits of Water
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
