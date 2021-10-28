export async function fetchPopularMovies() {
    const carousel = [
        { title: 'Mocked 1', backdrop_path: 'path_1' },
        { title: 'Mocked 2', backdrop_path: 'path_2' },
        { title: 'Mocked 3', backdrop_path: 'path_3' },
        { title: 'Mocked 4', backdrop_path: 'path_4' },
    ];
    const horizontalDisplay = [
        { title: 'Mocked Poster 1', poster_path: 'poste_path_1' },
        { title: 'Mocked Poster 2', poster_path: 'poste_path_2' },
        { title: 'Mocked Poster 3', poster_path: 'poste_path_3' },
        { title: 'Mocked Poster 4', poster_path: 'poste_path_4' },
        { title: 'Mocked Poster 5', poster_path: 'poste_path_4' },
    ];
    return Promise.resolve({ carousel, horizontalDisplay });
}
export async function fetchSearchMovies(query, page = 1) {
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
export async function fetchSearchTv(query, page = 1) {
    return Promise.resolve([{ name: 'TV Show 1' }, { name: 'TV Show 2' }, { name: 'TV Show 3' }]);
}
//# sourceMappingURL=tmdb.api.js.map