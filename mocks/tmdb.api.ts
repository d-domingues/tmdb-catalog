import { TmdbMovie } from '../models/tmdb-movie.js';

export function imgBackdropSrc(movie: TmdbMovie, size: 'w300' | 'w780' | '1280' | 'original' = 'original') {
  return `https://image.tmdb.org/t/p/${size}/${movie.backdrop_path}`;
}

export function imgPosterSrc(movie: TmdbMovie, size: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original' = 'w500') {
  return `https://image.tmdb.org/t/p/${size}/${movie.poster_path}`;
}

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
