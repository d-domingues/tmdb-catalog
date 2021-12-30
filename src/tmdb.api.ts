import { session_id } from '../main.js';
import { AccountStates } from '../models/account-states.js';
import { HomePageVM } from '../models/home-page-vm.js';
import { MediaType, TmdbDataObj } from '../models/tmdb-data-obj.js';
import { TmdbMovie } from '../models/tmdb-movie.js';
import { TmdbTvShow } from '../models/tmdb-tv-show.js';

const api_key = Object.freeze('a7aed79b85b4769070e70428a435f4bb');
const headers = Object.freeze({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

/**
 * Obtains the session_id token for TMDB API
 */
export async function getSessionId(): Promise<string> {
  try {
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

    return response.session_id;
  } catch {
    // TODO: alert
    return '';
  }
}

/**
 * Most popular movies in the last 3 months
 */
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
      language: 'es-ES',
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
      language: 'es-ES',
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
  const params = new URLSearchParams({
    query,
    api_key,
    indexes: 'movies.en,tv_series.en',
    language: 'es-ES',
  }).toString();

  const req = await fetch(`https://api.themoviedb.org/3/search/multi?${params}`);
  const { results } = await req.json();
  return results;
}

export async function getDetails(type: MediaType, movie_id: number): Promise<TmdbDataObj> {
  try {
    const params = new URLSearchParams({
      api_key,
      append_to_response: 'credits,release_dates', // 'videos,images,',
      language: 'es-ES',
    }).toString();

    const req = await fetch(`https://api.themoviedb.org/3/${type}/${movie_id}?${params}`);
    return req.json();
  } catch (error) {
    return {} as TmdbDataObj;
  }
}

export async function markAsFavorite(media_type: MediaType, media_id: number, favorite: boolean) {
  const params = new URLSearchParams({ session_id, api_key }).toString();

  return fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?${params}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ media_type, media_id, favorite }),
  });
}

/**
 * session user's rated and favorite info
 */
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

/**
 * Rating
 */
export async function postRating(media_type: MediaType, media_id: number, value: number) {
  if (value > 10 || value < 0) {
    throw new Error('invaid value');
  }

  const params = new URLSearchParams({ session_id, api_key }).toString();

  await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/rating?${params}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ value }),
  });

  return getDetails(media_type, media_id).then(o => o.vote_average);
}

/**
 * Review
 */
export async function getReviews(movie_id: number) {
  const params = new URLSearchParams({ page: `1`, api_key }).toString();
  const req = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?${params}`);
  return req.json();
}

/**
 * Popular
 */
export async function getPopularMovies(page = 1): Promise<TmdbMovie[]> {
  const params = new URLSearchParams({ page: `${page}`, api_key }).toString();

  return fetch(`https://api.themoviedb.org/3/movie/popular?${params}`).then(resp =>
    resp
      .json()
      .then(movies =>
        Promise.all(
          movies.results.map((movie: TmdbMovie) =>
            getReviews(movie.id).then(({ results }) => ({ ...movie, reviews: results }))
          )
        )
      )
  );
}
