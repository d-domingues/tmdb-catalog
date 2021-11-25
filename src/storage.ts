import { TmdbDataObj } from '../models/tmdb-data-obj.js';

const RECENT_SEARCHES = Object.freeze('recent_searches');

export function getRecentSearches(): (TmdbDataObj | string)[] {
  return JSON.parse(localStorage.getItem(RECENT_SEARCHES) || '[]');
}

export function putRecentSearches(option: TmdbDataObj | string) {
  let opts: (TmdbDataObj | string)[] = getRecentSearches();

  if (typeof option === 'string') {
    opts = opts.filter(o => o !== option);
    opts.unshift(option);
  }

  if (typeof option !== 'string') {
    opts = opts.filter(o => typeof o !== 'string' && o.id !== option.id);
    opts.unshift(option);
  }

  if (opts.length >= 6) {
    opts.pop();
  }

  localStorage.setItem(RECENT_SEARCHES, JSON.stringify(opts));
}
