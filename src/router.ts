import { Router } from '@vaadin/router';
import './components/overlay-menu.js';
import './views/home-page.js';
import './views/movie-details.js';
import './views/movie-list.js';
import './views/my-list.js';
import './views/my-profile.js';
import './views/search-view.js';
import './views/tv-shows.js';

let router: Promise<Node>;

export function setRouter(outlet: Element | undefined) {
  router = new Router(outlet).setRoutes([
    { path: '/', redirect: '/home-page' },
    { path: '/home-page', component: 'home-page' },
    { path: '/search-view/:searchQuery?', component: 'search-view' },
    { path: '/movie-search', component: 'movie-search' },
    { path: '/tv-shows', component: 'tv-shows' },
    { path: '/movie-list', component: 'movie-list' },
    { path: '/my-list', component: 'my-list' },
    { path: '/my-profile', component: 'my-profile' },
    { path: '/my-profile', component: 'my-profile' },
    { path: '/movie-details/:id', component: 'movie-details' },
    {
      path: 'movie-details/:id',
      action: async () => {
        await import('./views/movie-details.js');
      },
      component: 'movie-details',
    },
  ]);
}

export function getRouter() {
  return router as any;
}
