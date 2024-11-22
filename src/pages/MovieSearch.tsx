import React, { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchMovies, getMovieDetails } from '../services/omdbApi';
import type { MovieSearchResult, MovieDetails } from '../services/omdbApi';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetails';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const searchMoviesDebounced = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await searchMovies(query);
      if (response.Response === 'True') {
        setResults(response.Search);
      } else {
        setResults([]);
        setError(response.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to search movies');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(searchMoviesDebounced, 500);
    return () => clearTimeout(timeoutId);
  }, [searchMoviesDebounced]);

  const handleMovieClick = async (imdbId: string) => {
    try {
      const details = await getMovieDetails(imdbId);
      setSelectedMovie(details);
    } catch (err) {
      setError('Failed to load movie details');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Movie Search
      </h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Searching...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieSearch;