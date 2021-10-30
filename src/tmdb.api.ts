import { AccountStates } from '../models/account-states.js';
import { HomePageVM } from '../models/home-page-vm.js';
import { MediaType } from '../models/tmdb-data-obj.js';
import { TmdbMovie } from '../models/tmdb-movie.js';
import { TmdbTvShow } from '../models/tmdb-tv-show.js';

const api_key = Object.freeze('a7aed79b85b4769070e70428a435f4bb');
const headers = Object.freeze({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

let session_id = localStorage.getItem('session_id') as string;

(async () => {
  const params = new URLSearchParams({ api_key }).toString();

  const { request_token } = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?${params}`
  ).then(resp => resp.json());

  await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?${params}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      username: 'David_Lopes',
      password: 'Th3M0v13DB',
      request_token,
    }),
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?${params}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ request_token }),
    }
  ).then(resp => resp.json());

  session_id = response.session_id;
  localStorage.setItem('session_id', String(session_id));
})();

export async function fetchDiscoverMovies() {
  const date = new Date();
  const today = date.toJSON();
  date.setMonth(date.getMonth() - 3);
  const threeMontsAgo = date.toJSON();

  try {
    const params = new URLSearchParams({
      api_key,
      'release_date.gte': threeMontsAgo,
      'release_date.lte': today,
      sort_by: 'popularity.desc',
      include_adult: 'false',
      include_video: 'false',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/discover/movie?${params}`);
    const { results } = await req.json();
    return results;
  } catch (error) {
    return [];
  }
}

export async function fetchDiscoverTvShows() {
  const date = new Date();
  const today = date.toJSON();
  date.setMonth(date.getMonth() - 3);
  const threeMontsAgo = date.toJSON();

  try {
    const params = new URLSearchParams({
      api_key,
      'air_date.gte': threeMontsAgo,
      'air_date.lte': today,
      sort_by: 'popularity.desc',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/discover/tv?${params}`);
    const { results } = await req.json();
    return results;
  } catch (error) {
    return [];
  }
}

export async function fechHomePageData(): Promise<HomePageVM> {
  const [movies, shows] = await Promise.all([fetchDiscoverMovies(), fetchDiscoverTvShows()]);

  return {
    carousel: [...movies.splice(0, 2), ...shows.splice(0, 2)],
    recentMovies: movies.splice(0, 5),
    tvShows: shows.splice(0, 5),
  };
}

export async function fetchSearchMovies(query: string, page = 1) {
  try {
    const params = new URLSearchParams({
      query,
      api_key,
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: `${page}`,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`);
    const { results } = await req.json();
    return results;
  } catch (error) {
    return [];
  }
}

export async function fetchSearchTv(query: string, page = 1) {
  try {
    const params = new URLSearchParams({
      query,
      api_key,
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: `${page}`,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/search/tv?${params}`);
    const { results } = await req.json();
    return results;
  } catch (error) {
    return [];
  }
}

export async function fetchSearchMulti(query: string) {
  try {
    const params = new URLSearchParams({
      query,
      api_key,
      indexes: 'movies.en,tv_series.en',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/search/multi?${params}`);
    const { results } = await req.json();
    return results;
  } catch (error) {
    return [];
  }
}

export async function getDetails(type: MediaType, movie_id: number, language = 'es-ES') {
  try {
    const params = new URLSearchParams({
      api_key,
      append_to_response: 'credits,release_dates,', // 'videos,images,',
      language,
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/${type}/${movie_id}?${params}`);
    return req.json();
  } catch (error) {
    return {} as TmdbMovie;
  }
}

export async function markAsFavorite(media_type: MediaType, media_id: number, favorite: boolean) {
  const params = new URLSearchParams({ session_id, api_key }).toString();

  return fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?${params}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ media_type, media_id, favorite }),
  }).then(resp => resp.json());
}

export async function getAccountStates(
  media_type: MediaType,
  media_id: number
): Promise<AccountStates> {
  const params = new URLSearchParams({ session_id, api_key }).toString();

  return fetch(
    `https://api.themoviedb.org/3/${media_type}/${media_id}/account_states?${params}`
  ).then(resp => resp.json());
}

export async function getFavorites(page = 1): Promise<{ movie: TmdbMovie[]; tv: TmdbTvShow[] }> {
  const params = new URLSearchParams({ session_id, page: `${page}`, api_key }).toString();

  return Promise.all([
    fetch(`https://api.themoviedb.org/3/account/David_Lopes/favorite/movies?${params}`).then(resp =>
      resp.json()
    ),
    fetch(`https://api.themoviedb.org/3/account/David_Lopes/favorite/tv?${params}`).then(resp =>
      resp.json()
    ),
  ]).then(([movie, tv]) => ({ movie: movie.results, tv: tv.results }));
}
