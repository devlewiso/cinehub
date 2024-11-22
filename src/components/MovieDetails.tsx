import React from 'react';
import { X } from 'lucide-react';
import type { MovieDetails } from '../services/omdbApi';

interface MovieDetailsModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{movie.Title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            {movie.Poster && movie.Poster !== 'N/A' && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full md:w-64 h-96 object-cover rounded-lg"
              />
            )}
            
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Release Date</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Released}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Runtime</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Runtime}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Genre</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Genre}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Director</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Director}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cast</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Actors}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Plot</h3>
                  <p className="text-gray-900 dark:text-white">{movie.Plot}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ratings</h3>
                  <div className="mt-2 space-y-2">
                    {movie.Ratings.map((rating) => (
                      <div key={rating.Source} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{rating.Source}</span>
                        <span className="text-primary-600 dark:text-primary-400 font-medium">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;