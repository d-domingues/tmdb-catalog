import './views/home-page.ts';

import { Router } from '@vaadin/router';

// let router: Node;

export async function setRouter(outlet: Element | undefined) {
  if (!outlet) {
    return;
  }

  const router = await new Router(outlet).setRoutes([
    { path: '/', redirect: '/home-page' },
    { path: '/home-page', component: 'home-page' },
    {
      path: '/search-view/:searchQuery?',
      component: 'search-view',
      action: async () => {
        await import('./views/search-view.ts');
      },
    },
    {
      path: '/tv-shows',
      component: 'tv-shows',
      action: async () => {
        await import('./views/tv-shows.ts');
      },
    },
    {
      path: '/movie-list',
      component: 'movie-list',
      action: async () => {
        await import('./views/movie-list.ts');
      },
    },
    {
      path: '/my-list',
      component: 'my-list',
      action: async () => {
        await import('./views/my-list.ts');
      },
    },
    {
      path: '/my-profile',
      component: 'my-profile',
      action: async () => {
        await import('./views/my-profile.ts');
      },
    },
    {
      path: '/details/:type/:id',
      component: 'media-details',
      action: async () => {
        await import('./views/media-details.ts');
      },
    },
  ]);

  localStorage.setItem('router', router as any);
}

export function getRouter() {
  return localStorage.getItem('router') as any;
}
