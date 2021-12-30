import './src/components/loading-spinner.js';
import './src/movie-catalog.js';

import { Router } from '@vaadin/router';
import { html, render } from 'lit';

import { routes } from './src/routes.js';
import { getSessionId } from './src/tmdb.api.js';

render(html`<loading-spinner></loading-spinner>`, document.body);

// obtain the session_id
// TODO: sessionStorage.getItem

export const session_id = await getSessionId();

// initializes the router
export const router = new Router();
router.setRoutes(routes);

// initialize service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}

// bootstraps the application component
render(html`<movie-catalog .router=${router}></movie-catalog>`, document.body);
