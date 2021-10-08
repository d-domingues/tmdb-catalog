import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MovieCatalog } from '../movie-catalog.js';

@customElement('overlay-menu')
export class OverlayMenu extends LitElement {
  static styles = css`
    #modal {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 10;
      /* animation */
      transition: all 200ms ease-in-out 0s;
      transform: translate(-50%, -50%) scale(0);
    }

    #modal.active {
      transform: translate(-50%, -50%) scale(1);
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 1vh;
      text-align: center;
    }

    nav a {
      display: block;
      text-decoration: none;
      color: white;
      font-size: 4vh;
      margin: 4px;
    }

    #overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.8);
      /* animation */
      transition: 200ms ease-in-out;
      opacity: 0;
      pointer-events: none;
    }

    #overlay.active {
      opacity: 1;
      pointer-events: all;
    }
  `;

  @property({ type: Boolean }) show = false;

  readonly parent = document.querySelector('movie-catalog');

  views = [
    { path: '/home-page', label: 'Inicio' },
    { path: '/search-view', label: 'Buscador' },
    { path: '/tv-shows', label: 'Series TV' },
    { path: '/movie-list', label: 'Peliculas' },
    { path: '/my-list', label: 'Mi Lista' },
    { path: 'my-profile', label: 'Mi Perfil' },
  ];

  onClose() {
    if (this.parent instanceof MovieCatalog) {
      this.parent.show = false;
    }
  }

  render() {
    return html`
      <div id="modal" class=${this.show ? 'active' : ''}>
        <nav>${this.views.map(({ path, label }) => html` <a href=${path} @click=${this.onClose}> ${label} </a> `)}</nav>
      </div>
      <div id="overlay" class=${this.show ? 'active' : ''}></div>
    `;
  }
}
