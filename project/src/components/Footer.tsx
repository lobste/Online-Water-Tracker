import React from 'react';
import { Link } from 'react-router-dom';
import { Info, HelpCircle, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {/* Internal Links */}
        <div>
          <h3 className="text-base font-semibold text-blue-800 mb-2">Site Map</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                <Info className="h-3 w-3" />
                About
              </Link>
            </li>
            <li>
              <Link to="/how-to-use" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                How to Use
              </Link>
            </li>
            <li>
              <Link to="/benefits-of-water" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Benefits of Water
              </Link>
            </li>
          </ul>
        </div>

        {/* External Links */}
        <div>
          <h3 className="text-base font-semibold text-blue-800 mb-2">Resources</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/drinking-water"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                WHO Guidelines
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/healthywater/drinking/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                CDC Info
              </a>
            </li>
            <li>
              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Mayo Clinic
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold text-blue-800 mb-2">Contact</h3>
          <p className="text-gray-600 text-sm mb-1">
            Questions about hydration?
          </p>
          <a
            href="mailto:info@watertracker.online"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            info@watertracker.online
          </a>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} WaterTracker.online - All rights reserved.</p>
      </div>
    </footer>
  );
};
