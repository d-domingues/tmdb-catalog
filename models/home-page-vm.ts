import { TmdbMovie } from './tmdb-movie.js';
import { TmdbTvShow } from './tmdb-tv-show.js';

export interface HomePageVM {
  carousel: (TmdbMovie | TmdbTvShow)[];
  recentMovies: (TmdbMovie | TmdbTvShow)[];
  tvShows: (TmdbMovie | TmdbTvShow)[];
}
