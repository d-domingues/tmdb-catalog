import './components/loading-spinner.js';
import './movie-catalog.js';

import { Router } from '@vaadin/router';
import { html, render } from 'lit';

import { routes } from './routes.js';
import { getSessionId } from './tmdb.api.js';

render(html`<loading-spinner></loading-spinner>`, document.body);

// obtain the session_id
// TODO: sessionStorage.getItem

// export const session_id = await getSessionId();

export let session_id!: string;
export let router = new Router();

(async () => {
  session_id = await getSessionId();

  // initializes the router
  router.setRoutes(routes);

  // initialize service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
  }

  // bootstraps the application component
  render(html`<movie-catalog .router=${router}></movie-catalog>`, document.body);
})();
