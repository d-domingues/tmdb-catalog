import './views/home-page.js';
import { Router } from '@vaadin/router';
let router;
export function setRouter(outlet) {
    router = new Router(outlet).setRoutes([
        { path: '/', redirect: '/home-page' },
        { path: '/home-page', component: 'home-page' },
        {
            path: '/search-view/:searchQuery?',
            component: 'search-view',
            action: async () => {
                await import('./views/search-view.js');
            },
        },
        {
            path: '/tv-shows',
            component: 'tv-shows',
            action: async () => {
                await import('./views/tv-shows.js');
            },
        },
        {
            path: '/movie-list',
            component: 'movie-list',
            action: async () => {
                await import('./views/movie-list.js');
            },
        },
        {
            path: '/my-list',
            component: 'my-list',
            action: async () => {
                await import('./views/my-list.js');
            },
        },
        {
            path: '/my-profile',
            component: 'my-profile',
            action: async () => {
                await import('./views/my-profile.js');
            },
        },
        {
            path: '/details/:type/:id',
            component: 'media-details',
            action: async () => {
                await import('./views/media-details.js');
            },
        },
    ]);
}
export function getRouter() {
    return router;
}
//# sourceMappingURL=router.js.map