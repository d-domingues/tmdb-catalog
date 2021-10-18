import './components/overlay-menu.js';
import './views/home-page.js';
import './views/movie-list.js';
import './views/my-list.js';
import './views/my-profile.js';
import './views/search-view.js';
import './views/tv-shows.js';

import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { setRouter } from './router.js';

@customElement('movie-catalog')
export class MovieCatalog extends LitElement {
  static styles = css`
    :host {
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
    }

    header {
      background-color: #333333;
      position: fixed;
      z-index: 9;
      height: 50px;
      width: 100vw;
      top: 0px;
    }

    header img {
      cursor: pointer;
      float: right;
      padding: 4px;
      margin: 5px 18px;
    }

    header img:hover {
      background-color: #adaaff80;
    }

    main {
      max-width: 1000px;
      margin: 50px auto 40px;
    }

    footer {
      font-size: calc(12px + 0.5vmin);
      text-align: center;
      background: #333333;
      color: white;
      height: 100px;
      padding-top: 20px;
    }

    /* Responsive for mobile devices */
    @media only screen and (max-width: 600px) {
      main {
        margin: 58px 8px 28px;
      }
    }
  `;

  @property({ type: Boolean }) show = false;

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

  menuIconTmpl() {
    return this.show
      ? nothing
      : html`
          <img
            src="assets/menu-icon.svg"
            alt="MENU"
            @click=${this.onOpenMenu}
            @keydown=${this.onOpenMenu}
          />
        `;
  }

  render() {
    return html`
      <overlay-menu .show=${this.show}></overlay-menu>
      <header>${this.menuIconTmpl()}</header>
      <main ${ref(setRouter)}></main>
      <footer>
        Movie Catalog<br />
        Sopra Steria Lit Challenge using
        <a href="https://developers.themoviedb.org/3" style="color:white"> TMDB API </a> <br />
        Author: David Filipe Lopes Domingues<br />
        david-filipe.lopes@soprasteria.com | 634278653<br />
      </footer>
    `;
  }
}
