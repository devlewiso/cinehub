import React from 'react';
import { Film } from 'lucide-react';
import type { MovieSearchResult } from '../services/omdbApi';

interface MovieCardProps {
  movie: MovieSearchResult;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer
                 transform hover:scale-105 transition-transform duration-200"
    >
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-72 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-72 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Film className="w-16 h-16 text-gray-400" />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {movie.Year}
          </span>
          <span className="text-sm text-primary-600 dark:text-primary-400 capitalize">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;