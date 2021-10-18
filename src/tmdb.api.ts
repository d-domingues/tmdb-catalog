import { HomePageVM } from '../models/home-page-vm.js';
import { TmdbDataObj } from '../models/tmdb-data-obj.js';
import { TmdbMovie } from '../models/tmdb-movie.js';
import { TmdbTvShow } from '../models/tmdb-tv-show.js';

export async function fetchDiscoverMovies() {
  let dataset: TmdbMovie[] = [];

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
    dataset = results;
  } catch (error) {
    return [];
  }

  return dataset;
}

export async function fetchDiscoverTvShows() {
  let dataset: TmdbTvShow[] = [];

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
    dataset = results;
  } catch (error) {
    return [];
  }

  return dataset;
}

export async function fechHomePageData(): Promise<HomePageVM> {
  const data: HomePageVM = {
    carousel: [],
    recentMovies: [],
    tvShows: [],
  };

  // TODO: validate the array empty on expetion
  const [movies, shows] = await Promise.all([fetchDiscoverMovies(), fetchDiscoverTvShows()]);

  data.carousel = [...movies.splice(0, 2), ...shows.splice(0, 2)];
  data.recentMovies = movies.splice(0, 5);
  data.tvShows = shows.splice(0, 5);

  return data;
}

export async function fetchSearchMovies(query: string, page = 1) {
  let dataset: TmdbMovie[] = [];

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
    dataset = results;
  } catch (error) {
    return [];
  }

  return dataset;
}

export async function fetchSearchTv(query: string, page = 1) {
  let dataset: TmdbMovie[] = [];

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
    dataset = results;
  } catch (error) {
    return [];
  }

  return dataset;
}

export async function getDetails(type: string, movie_id: number, language = 'es-ES') {
  let object: TmdbDataObj;

  try {
    const params = new URLSearchParams({
      api_key: 'a7aed79b85b4769070e70428a435f4bb',
      append_to_response: 'videos,images,credits,release_dates',
      language,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/${type}/${movie_id}?${params}`);
    object = await req.json();
  } catch (error) {
    return {} as TmdbMovie;
  }

  return object;
}
