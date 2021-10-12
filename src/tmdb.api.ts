import { HomePageVM } from '../models/home-page-vm.js';
import { TmdbMovie } from '../models/tmdb-movie.js';
import { TmdbTvShow } from '../models/tmdb-tv-show.js';

export function imgBackdropSrc(
  movie: TmdbMovie | TmdbTvShow,
  size: 'w300' | 'w780' | '1280' | 'original' = 'original'
) {
  return `https://image.tmdb.org/t/p/${size}${movie.backdrop_path}`;
}

export function imgPosterSrc(
  movie: TmdbMovie | TmdbTvShow,
  size: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original' = 'w500'
) {
  return `https://image.tmdb.org/t/p/${size}${movie.poster_path}`;
}

export async function fetchDiscoverMovies() {
  let data: TmdbMovie[] = [];

  const date = new Date();
  const today = date.toJSON();
  date.setMonth(date.getMonth() - 3);
  const threeMontsAgo = date.toJSON();

  try {
    const params = new URLSearchParams({
      api_key: 'a7aed79b85b4769070e70428a435f4bb',
      'release_date.gte': threeMontsAgo,
      'release_date.lte': today,
      sort_by: 'popularity.desc',
      include_adult: 'false',
      include_video: 'false',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/discover/movie?${params}`);
    const { results } = await req.json();
    data = results;
  } catch (error) {
    return [];
  }

  return data;
}

export async function fetchDiscoverTvShows() {
  let data: TmdbTvShow[] = [];

  const date = new Date();
  const today = date.toJSON();
  date.setMonth(date.getMonth() - 3);
  const threeMontsAgo = date.toJSON();

  try {
    const params = new URLSearchParams({
      api_key: 'a7aed79b85b4769070e70428a435f4bb',
      'air_date.gte': threeMontsAgo,
      'air_date.lte': today,
      sort_by: 'popularity.desc',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/discover/tv?${params}`);
    const { results } = await req.json();
    data = results;
  } catch (error) {
    return [];
  }

  return data;
}

export async function fechHomePageData(): Promise<HomePageVM> {
  let carousel: (TmdbMovie | TmdbTvShow)[] = [];
  let recentMovies: (TmdbMovie | TmdbTvShow)[] = [];
  let tvShows: (TmdbMovie | TmdbTvShow)[] = [];

  // TODO: validate the array empty on expetion
  const [movies, shows] = await Promise.all([fetchDiscoverMovies(), fetchDiscoverTvShows()]);
  carousel = [...movies.splice(0, 2), ...shows.splice(0, 2)];
  recentMovies = movies.splice(0, 5);
  tvShows = shows.splice(0, 5);

  return { carousel, recentMovies, tvShows };
}

export async function fetchSearchMovies(query: string, page = 0) {
  let data: TmdbMovie[] = [];

  try {
    const params = new URLSearchParams({
      query,
      api_key: 'a7aed79b85b4769070e70428a435f4bb',
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: `${page}`,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`);
    const { results } = await req.json();
    data = results;
  } catch (error) {
    return [];
  }

  return data;
}

export async function fetchSearchTv(query: string, page = 0) {
  let data: TmdbMovie[] = [];

  try {
    const params = new URLSearchParams({
      query,
      api_key: 'a7aed79b85b4769070e70428a435f4bb',
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: `${page}`,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/search/tv?${params}`);
    const { results } = await req.json();
    data = results;
  } catch (error) {
    return [];
  }

  return data;
}
