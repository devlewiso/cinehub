import React from 'react';
import { GitCompare } from 'lucide-react';

const MovieComparison = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Movie Comparison
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            <GitCompare className="h-12 w-12 text-primary-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Select first movie to compare
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            <GitCompare className="h-12 w-12 text-primary-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Select second movie to compare
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieComparison;