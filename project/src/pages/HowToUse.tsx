import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { HelpCircle, ArrowLeft, Plus, Minus, Bell, Settings } from 'lucide-react';

export const HowToUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">How to Use</h1>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Core Features</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Add Water</h3>
                <p className="text-gray-600">
                  Click the plus button each time you drink water to add to your daily intake.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Minus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Remove Water</h3>
                <p className="text-gray-600">
                  Use the minus button to correct any mistaken entries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Settings</h3>
                <p className="text-gray-600">
                  Customize your daily goal and cup size to match your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Reminders</h3>
                <p className="text-gray-600">
                  Enable notification reminders to maintain regular water intake.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Tips</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Keep your daily goal realistic</li>
              <li>Drink water at regular intervals</li>
              <li>Track your progress daily</li>
              <li>Keep notifications enabled</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Learn More</h2>
            <div className="space-y-2">
              <Link to="/benefits-of-water" className="text-blue-600 hover:text-blue-800 block">
                → Benefits of Water
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
