import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import './components/overlay-menu.js';
import './views/home-page.js';
import './views/movie-list.js';
import './views/my-list.js';
import './views/my-profile.js';
import './views/search-view.js';
import './views/tv-shows.js';

@customElement('movie-catalog')
export class MovieCatalog extends LitElement {
  @query('#outlet') outlet!: HTMLDivElement;

  @query('overlay-menu') overlayMenu!: any;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    .topnav {
      overflow: hidden;
      background-color: #333;
      width: 100vw;
    }

    .topnav img {
      float: right;
      padding: 4px;
      margin: 5px 20px;
      cursor: pointer;
    }

    .topnav img:hover {
      background-color: #ddd;
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }
  `;

  firstUpdated() {
    new Router(this.outlet).setRoutes([
      { path: '/', redirect: '/home-page' },
      { path: '/home-page', component: 'home-page' },
      { path: '/search-view', component: 'search-view' },
      { path: '/movie-search', component: 'movie-search' },
      { path: '/tv-shows', component: 'tv-shows' },
      { path: '/movie-list', component: 'movie-list' },
      { path: '/my-list', component: 'my-list' },
      { path: '/my-profile', component: 'my-profile' },
    ]);
  }

  show = false;

  onOpenMenu() {
    /* Tryed to push the menu modal by injecting the component in the DOM
    and later removing it, but its not working!
    // this.show = true;
    */

    /*     const template = html`<overlay-menu></overlay-menu>`;
    render(template, document.body);
    // this.overlayMenu.onOpen();
    */

    this.show = true;
    this.requestUpdate();
  }

  onCloseModal() {
    this.show = false;
    this.requestUpdate();
  }

  ovrTemplate = html`<overlay-menu></overlay-menu>`;

  render() {
    return html`
      <div class="topnav">
        <img
          src="assets/menu-icon.svg"
          alt="menu"
          @click="${this.onOpenMenu}"
          @keydown=${this.onOpenMenu}
        />
      </div>

      <main>
        <div id="outlet"></div>
      </main>

      <p class="app-footer">Movie Ctalog</p>

      ${this.show
        ? html`<overlay-menu
            ?show="${this.show}"
            @closeModal=${this.onCloseModal}
          ></overlay-menu>`
        : ''}
    `;
  }
}
/*
<overlay-menu ?show="${this.show}"></overlay-menu> */
