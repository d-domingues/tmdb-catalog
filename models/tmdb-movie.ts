import {
  Credits,
  Genre,
  Images,
  MediaType,
  ProductionCompany,
  ProductionCountry,
  ReleaseDates,
  Review,
  SpokenLanguage,
  Videos,
} from './tmdb-data-obj.js';

export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  genre_ids: number[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  reviews: Review[];
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  images: Images;
  credits: Credits;
  release_dates: ReleaseDates;
  media_type: MediaType;
}
