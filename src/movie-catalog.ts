import './components/overlay-menu.js';
import './views/home-page.js';
import './views/movie-list.js';
import './views/my-list.js';
import './views/my-profile.js';
import './views/search-view.js';
import './views/tv-shows.js';

import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

@customElement('movie-catalog')
export class MovieCatalog extends LitElement {
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
    }

    header {
      overflow: hidden;
      background-color: #333;
      width: 100vw;
    }

    header img,
    header #close-btn {
      cursor: pointer;
      float: right;
      padding: 4px;
      margin: 5px 20px;
    }

    header #close-btn {
      position: sticky;
      z-index: 10;
      color: white;
      font-size: 50px;
      width: 32px;
      height: 32px;
      line-height: 36px;
    }

    header img:hover,
    header #close-btn:hover {
      background-color: #adaaff80;
    }

    main {
      flex-grow: 1;
    }

    footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }
  `;

  @property({ type: Boolean }) show = false;

  // eslint-disable-next-line class-methods-use-this
  setRoutes(outlet: Element | undefined) {
    new Router(outlet).setRoutes([
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

  onOpenMenu() {
    this.show = true;
    /*     const tag: any = document.createElement('overlay-menu');
    tag.show = true;
    this.shadowRoot?.appendChild(tag); */
  }

  onCloseMenu() {
    this.show = false;
    /*     const tag: any = this.shadowRoot?.querySelector('overlay-menu');
    this.shadowRoot?.removeChild(tag); */
  }

  iconTmpl() {
    return this.show
      ? html` <span id="close-btn" @click=${this.onCloseMenu} @keydown=${this.onOpenMenu}> &times; </span> `
      : html` <img src="assets/menu-icon.svg" alt="MENU" @click=${this.onOpenMenu} @keydown=${this.onOpenMenu} /> `;
  }

  render() {
    return html`
      <header>${this.iconTmpl()}</header>
      <main ${ref(this.setRoutes)}></main>
      <footer>Movie Catalog</footer>
      <overlay-menu .show=${this.show}></overlay-menu>
    `;
  }
}
