import { AccountStates } from '../src/models/account-states.js';
import { HomePageVM } from '../src/models/home-page-vm.js';
import { MediaType, TmdbDataObj } from '../src/models/tmdb-data-obj.js';
import { TmdbMovie } from '../src/models/tmdb-movie.js';

function delay(time = 100) {
  return new Promise((r) => setTimeout(r, null, time));
}

export async function fetchPopularMovies() {
  await delay();

  const carousel = [
    { title: 'Mocked 1', backdrop_path: 'path_1' },
    { title: 'Mocked 2', backdrop_path: 'path_2' },
    { title: 'Mocked 3', backdrop_path: 'path_3' },
    { title: 'Mocked 4', backdrop_path: 'path_4' },
  ] as TmdbMovie[];

  const horizontalDisplay = [
    { title: 'Mocked Poster 1', poster_path: 'poste_path_1' },
    { title: 'Mocked Poster 2', poster_path: 'poste_path_2' },
    { title: 'Mocked Poster 3', poster_path: 'poste_path_3' },
    { title: 'Mocked Poster 4', poster_path: 'poste_path_4' },
    { title: 'Mocked Poster 5', poster_path: 'poste_path_4' },
  ] as TmdbMovie[];

  return { carousel, horizontalDisplay };
}

export async function fetchSearchMovies(query: string, page = 1) {
  await delay();
  return [
    { title: 'Movie A' },
    { title: 'Movie B' },
    { title: 'Movie C' },
    { title: 'Movie D' },
    { title: 'Movie E' },
    { title: 'Movie F' },
    { title: 'Movie G' },
  ];
}

export async function fetchSearchTv(query: string, page = 1) {
  await delay();
  return [{ name: 'TV Show 1' }, { name: 'TV Show 2' }, { name: 'TV Show 3' }];
}

export async function fechHomePageData(): Promise<HomePageVM> {
  await delay();
  return {
    carousel: [
      { media_type: 'movie', title: 'MOVIE 1' },
      { media_type: 'movie', title: 'MOVIE 2' },
      { media_type: 'tv', title: 'SHOW 1' },
      { media_type: 'tv', title: 'SHOW 2' },
    ] as TmdbDataObj[],
    recentMovies: [
      {
        adult: false,
        backdrop_path: '/backdrop_path.jpg',
        genre_ids: [1, 2],
        id: 1000,
        original_language: 'en',
        original_title: 'Mocked Movie',
        overview: 'Mocked overview for test purposes.',
        popularity: 9999,
        poster_path: '/poster_path.jpg',
        release_date: '2020-10-10',
        title: 'Mocked Movie',
        video: false,
        vote_average: 7.7,
        vote_count: 687,
      },
    ] as TmdbMovie[],
    tvShows: [],
  };
}

export async function fetchSearchMulti() {
  await delay();
  return [];
}

export async function getAccountStates(media_type: MediaType, media_id: number): Promise<AccountStates> {
  await delay();
  return { favorite: false, id: 1, rated: false, watchlist: false };
}

export async function markAsFavorite(media_type: MediaType, media_id: number, favorite: boolean) {
  await delay();

  return null;
}

export async function postRating(media_type: MediaType, media_id: number, value: number) {
  await delay();
  return null;
}

export async function getPopularMovies(page = 1): Promise<TmdbMovie[]> {
  await delay();

  return [
    { poster_path: 'path0' },
    { poster_path: 'path1' },
    { poster_path: 'path2' },
    { poster_path: 'path3' },
    { poster_path: 'path4' },
    { poster_path: 'path5' },
    { poster_path: 'path6' },
    { poster_path: 'path7' },
    { poster_path: 'path8' },
    { poster_path: 'path9' },
    { poster_path: 'path10' },
    { poster_path: 'path11' },
    { poster_path: 'path12' },
    { poster_path: 'path13' },
    { poster_path: 'path14' },
    { poster_path: 'path15' },
  ] as TmdbMovie[];
}
