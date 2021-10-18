import { Router } from '@vaadin/router';

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
  ]);
}

export function getRouter() {
  return router as any;
}
