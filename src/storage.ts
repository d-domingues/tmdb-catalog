import { TmdbDataObj } from '../models/tmdb-data-obj.js';

interface SavedSearch {
  timestamp: number;
  data: TmdbDataObj | string;
}

const RECENT_SEARCHES = Object.freeze('recent_searches');

export function getUpdatedSavedSearches(): SavedSearch[] {
  let opts: SavedSearch[] = JSON.parse(localStorage.getItem(RECENT_SEARCHES) || '[]');
  opts = opts.filter(o => new Date().getTime() - o.timestamp < 3600000);
  localStorage.setItem(RECENT_SEARCHES, JSON.stringify(opts));
  return opts;
}

export function getRecentSearches(): (TmdbDataObj | string)[] {
  return getUpdatedSavedSearches().map(o => o.data);
}

export function putRecentSearches(data: TmdbDataObj | string) {
  let opts: SavedSearch[] = getUpdatedSavedSearches();

  if (typeof data === 'string') {
    opts = opts.filter(o => o.data !== data);
    opts.unshift({ timestamp: new Date().getTime(), data });
  }

  if (typeof data !== 'string') {
    opts = opts.filter(o => typeof o !== 'string' && (o.data as any).id !== data.id);
    opts.unshift({ timestamp: new Date().getTime(), data });
  }

  if (opts.length >= 6) {
    opts.pop();
  }

  localStorage.setItem(RECENT_SEARCHES, JSON.stringify(opts));
}
