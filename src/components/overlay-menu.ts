import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { MovieCatalog } from '../movie-catalog.js';

@customElement('overlay-menu')
export class OverlayMenu extends LitElement {
  static styles = css`
    #modal {
      display: flex;
      flex-direction: column;
      gap: 1vh;
      text-align: center;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 99;
      /* animation */
      transition: all 200ms ease-in-out;
      transform: translate(-50%, -50%) scale(0);
    }

    #modal.active {
      transform: translate(-50%, -50%) scale(1);
    }

    #modal a {
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
      z-index: 90;
      /* animation */
      transition: 200ms ease-in-out;
      opacity: 0;
      pointer-events: none;
    }

    #overlay.active {
      opacity: 1;
      pointer-events: all;
    }

    #close-btn {
      z-index: 91;
      color: white;
      font-size: 50px;
      width: 30px;
      height: 30px;
      position: fixed;
      right: 0px;
      top: 0;
      cursor: pointer;
      float: right;
      padding: 10px;
      line-height: 35px;
    }

    #close-btn:hover {
      background-color: #adaaff80;
    }
  `;

  @property({ type: Boolean }) show = false;

  readonly parent = document.querySelector('movie-catalog');

  views = [
    { path: 'home-page', label: 'Inicio' },
    { path: 'search-view', label: 'Buscador' },
    { path: 'tv-shows', label: 'Series TV' },
    { path: 'movie-list', label: 'Peliculas' },
    { path: 'my-list', label: 'Mi Lista' },
    { path: 'my-profile', label: 'Mi Perfil' },
  ];

  onClose() {
    if (this.parent instanceof MovieCatalog) {
      this.parent.show = false;
    }
  }

  render() {
    return html`
      <nav id="modal" class=${classMap({ active: this.show })}>
        ${this.views.map(({ path, label }) => html` <a href=${path} @click=${this.onClose}> ${label} </a> `)}
      </nav>

      <div id="overlay" class=${classMap({ active: this.show })}>
        <span id="close-btn" @click=${this.onClose} @keydown=${this.onClose}> &times; </span>
      </div>
    `;
  }
}
