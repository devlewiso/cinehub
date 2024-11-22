import React, { useState } from 'react';
import { Shuffle, Film } from 'lucide-react';
import { getMovieDetails } from '../services/omdbApi';
import type { MovieDetails } from '../services/omdbApi';
import MovieDetailsModal from '../components/MovieDetails';

// List of popular movie IDs for random selection
const popularMovieIds = [
  'tt0111161', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0050083',
  'tt0108052', 'tt0167260', 'tt0110912', 'tt0060196', 'tt0120737',
  'tt0109830', 'tt0137523', 'tt0080684', 'tt1375666', 'tt0167261',
  'tt0073486', 'tt0099685', 'tt0133093', 'tt0047478', 'tt0114369',
  'tt0317248', 'tt0076759', 'tt0102926', 'tt0038650', 'tt0118799',
  'tt0110413', 'tt0120815', 'tt0816692', 'tt0245429', 'tt0120689',
  'tt0114814', 'tt0056058', 'tt0088763', 'tt0253474', 'tt0103064',
  'tt0027977', 'tt0054215', 'tt0120586', 'tt0021749', 'tt0172495',
  'tt0407887', 'tt1675434', 'tt0482571', 'tt0064116', 'tt0095327',
  'tt0034583', 'tt0047396', 'tt0095765', 'tt0078788', 'tt0078748'
];

const RandomMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const generateRandomMovie = async () => {
    setLoading(true);
    setError('');

    try {
      const randomId = popularMovieIds[Math.floor(Math.random() * popularMovieIds.length)];
      const movieDetails = await getMovieDetails(randomId);
      setMovie(movieDetails);
    } catch (err) {
      setError('Failed to fetch random movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Random Movie Generator
      </h1>
      
      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {!movie ? (
            <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
              <Film className="h-12 w-12 text-primary-500" />
            </div>
          ) : (
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : ''}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          {error && (
            <div className="text-red-500 dark:text-red-400 text-center mb-4">
              {error}
            </div>
          )}

          <button
            onClick={generateRandomMovie}
            disabled={loading}
            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg 
                     transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <Shuffle className="h-5 w-5" />
                Generate Random Movie
              </>
            )}
          </button>
        </div>
      </div>

      {movie && <MovieDetailsModal movie={movie} onClose={() => setMovie(null)} />}
    </div>
  );
};

export default RandomMovie;