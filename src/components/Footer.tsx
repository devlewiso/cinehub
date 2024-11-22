import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">CineHub</h3>
            <p className="text-sm">
              Where Every Frame Tells a Story.
              Powered by OMDB API.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="hover:text-primary-500 transition-colors">
                  Movie Search
                </Link>
              </li>
              <li>
                <Link to="/random" className="hover:text-primary-500 transition-colors">
                  Random Movie
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {new Date().getFullYear()} CineHub. Created by <a href="https://neuralcodelab.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400">neuralcodelab.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;