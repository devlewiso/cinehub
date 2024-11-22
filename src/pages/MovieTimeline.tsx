import React from 'react';
import { Timer } from 'lucide-react';

const MovieTimeline = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Movie Timeline
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
          <Timer className="h-12 w-12 text-primary-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Timeline will be displayed here
        </p>
      </div>
    </div>
  );
};

export default MovieTimeline;