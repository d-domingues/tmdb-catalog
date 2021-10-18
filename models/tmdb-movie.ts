import { TmdbTvShow } from './tmdb-tv-show.js';

export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Type guard
export function isMovie(pet: TmdbMovie | TmdbTvShow): pet is TmdbMovie {
  return (pet as TmdbMovie).title !== undefined;
}
