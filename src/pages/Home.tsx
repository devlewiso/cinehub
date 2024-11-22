import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shuffle } from 'lucide-react';

const Home = () => {
  const tools = [
    {
      icon: Search,
      title: 'Movie Search',
      description: 'Search for any movie or TV show with detailed information',
      link: '/search',
    },
    {
      icon: Shuffle,
      title: 'Random Movie',
      description: 'Discover random movies based on your preferences',
      link: '/random',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to CineHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Where Every Frame Tells a Story
        </p>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your ultimate destination for exploring and discovering movies.
          Powered by the OMDB API.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            to={tool.link}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg mb-4">
              <tool.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tool.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Movie Theater"
          className="rounded-lg shadow-lg mx-auto max-w-4xl"
        />
      </div>
    </div>
  );
};

export default Home;