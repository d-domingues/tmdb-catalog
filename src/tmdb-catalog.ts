import { Router } from '@vaadin/router';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import './components/overlay-menu.js';
import { tmdbCatalogStyles } from './tmdb-catalog.styles.js';

@customElement('tmdb-catalog')
export class TmdbCatalog extends LitElement {
  static styles = tmdbCatalogStyles;

  @property() router!: Router;
  @state() show = false;

  onOpenMenu() {
    this.show = true;
  }

  onCloseMenu() {
    this.show = false;
  }

  menuIconTmpl() {
    return this.show ? nothing : html`<img src="/menu-icon.svg" alt="MENU" @click=${this.onOpenMenu} @keyup=${this.onOpenMenu} />`;
  }

  render() {
    return html`
      <overlay-menu .show=${this.show} @closemenu=${this.onCloseMenu}></overlay-menu>
      <header>${this.menuIconTmpl()}</header>
      <main ${ref((el) => this.router?.setOutlet(el))}></main>
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
