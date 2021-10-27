import { HomePageVM } from '../models/home-page-vm.js';
import { TmdbMovie } from '../models/tmdb-movie.js';

export async function fetchPopularMovies() {
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

  return Promise.resolve({ carousel, horizontalDisplay });
}

export async function fetchSearchMovies(query: string, page = 1) {
  return Promise.resolve([
    { title: 'Movie A' },
    { title: 'Movie B' },
    { title: 'Movie C' },
    { title: 'Movie D' },
    { title: 'Movie E' },
    { title: 'Movie F' },
    { title: 'Movie G' },
  ]);
}

export async function fetchSearchTv(query: string, page = 1) {
  return Promise.resolve([{ name: 'TV Show 1' }, { name: 'TV Show 2' }, { name: 'TV Show 3' }]);
}

export async function fechHomePageData(): Promise<HomePageVM> {
  return Promise.resolve({
    carousel: [],
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
  });
}

export async function fetchSearchMulti() {
  return Promise.resolve([]);
}
