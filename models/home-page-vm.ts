import { TmdbDataObj } from './tmdb-data-obj.js';

export interface HomePageVM {
  carousel: TmdbDataObj[];
  recentMovies: TmdbDataObj[];
  tvShows: TmdbDataObj[];
}
