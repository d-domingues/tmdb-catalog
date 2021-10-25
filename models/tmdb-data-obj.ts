import { TmdbMovie } from './tmdb-movie.js';
import { TmdbTvShow } from './tmdb-tv-show.js';

export type TmdbDataObj = TmdbMovie | TmdbTvShow;

// Type guard
export const isMovie = (pet: TmdbDataObj): pet is TmdbMovie =>
  (pet as TmdbMovie).title !== undefined;

export const getYear = (item: TmdbDataObj) =>
  (isMovie(item) ? item?.release_date : item?.first_air_date)?.split('-')?.at(0) ?? '';

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Camera = 'Camera',
  CostumeMakeUp = 'Costume & Make-Up',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Lighting = 'Lighting',
  Production = 'Production',
  Sound = 'Sound',
  Writing = 'Writing',
}

export enum Note {
  BluRayDVD = 'Blu-Ray + DVD',
  Empty = '',
  Netflix = 'Netflix',
  VeniceFilmFestival = 'Venice Film Festival',
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Videos {
  results: any[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface Images {
  backdrops: any[];
  logos: any[];
  posters: any[];
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: null | string;
  note: Note;
  release_date: string;
  type: number;
}

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDates {
  results: ReleaseDatesResult[];
}
