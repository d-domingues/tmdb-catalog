import './components/overlay-menu.js';

import { Router } from '@vaadin/router';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { movieCatalogStyles } from './movie-catalog.styles.js';

@customElement('movie-catalog')
export class MovieCatalog extends LitElement {
  static styles = movieCatalogStyles;

  @property() router!: Router;
  @property() show = false;

  onOpenMenu() {
    this.show = true;
  }

  onCloseMenu() {
    this.show = false;
  }

  menuIconTmpl() {
    return this.show ? nothing : html` <img src="/menu-icon.svg" alt="MENU" @click=${this.onOpenMenu} @keyup=${this.onOpenMenu} /> `;
  }

  render() {
    return html`
      <overlay-menu .show=${this.show} @closemenu=${this.onCloseMenu}></overlay-menu>
      <header>${this.menuIconTmpl()}</header>
      <main ${ref((el) => this.router.setOutlet(el))}></main>
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
