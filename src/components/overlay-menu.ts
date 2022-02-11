import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('overlay-menu')
export class OverlayMenu extends LitElement {
  static styles = css`
    #menu-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 90;
      /* animation */
      transition: 200ms ease-in-out;
      opacity: 0;
      pointer-events: none;
    }

    #menu-overlay.active {
      opacity: 1;
      pointer-events: all;
    }

    #menu-modal {
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

    #menu-overlay.active #menu-modal {
      transform: translate(-50%, -50%) scale(1);
    }

    #menu-modal a {
      display: block;
      text-decoration: none;
      color: white;
      font-size: 4vh;
      margin: 4px;
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

  @property() show = false;

  views = [
    { path: '/home-page', label: 'Inicio' },
    { path: '/search-view', label: 'Buscador' },
    { path: '/movie-list', label: 'Peliculas' },
    { path: '/tv-shows', label: 'Series TV' },
    { path: '/my-list', label: 'Mis Favoritos' },
    { path: '/my-profile', label: 'Mi Perfil' },
  ];

  async onClose() {
    this.dispatchEvent(new Event('closemenu'));
  }

  render() {
    return html`
      <div id="menu-overlay" class=${this.show ? 'active' : ''}>
        <span id="close-btn" @click=${this.onClose} @keyup=${this.onClose}> &times; </span>
        <nav id="menu-modal">${this.views.map(({ path, label }) => html` <a href=${path} @click=${this.onClose}> ${label} </a> `)}</nav>
      </div>
    `;
  }
}
