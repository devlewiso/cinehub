const API_KEY = 'f1b1dbfa';
const BASE_URL = 'https://www.omdbapi.com';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  );
  return response.json();
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetails> => {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`
  );
  return response.json();
};