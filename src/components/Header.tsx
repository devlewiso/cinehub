import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8" />
            <span className="font-bold text-xl">CineHub</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              <Link
                to="/search"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/search') 
                    ? 'bg-primary-700 text-white' 
                    : 'text-white hover:bg-primary-500'
                }`}
              >
                Search
              </Link>
              <Link
                to="/random"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/random') 
                    ? 'bg-primary-700 text-white' 
                    : 'text-white hover:bg-primary-500'
                }`}
              >
                Random
              </Link>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-500 transition-colors"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;