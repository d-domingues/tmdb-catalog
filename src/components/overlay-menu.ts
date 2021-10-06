import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('overlay-menu')
export class OverlayMenu extends LitElement {
  static styles = css`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: 200ms ease-in-out;
      border: 1px solid black;
      border-radius: 10px;
      z-index: 10;
      background-color: white;
      width: 500px;
      max-width: 80%;
    }

    .modal.active {
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-header {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid black;
    }

    .modal-header .title {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .modal-header .close-button {
      cursor: pointer;
      border: none;
      outline: none;
      background: none;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .modal-body {
      padding: 10px 15px;
    }

    .modal-body a {
      display: block;
    }

    #overlay {
      position: fixed;
      opacity: 0;
      transition: 200ms ease-in-out;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: none;
    }

    #overlay.active {
      opacity: 1;
      pointer-events: all;
    }
  `;

  views = [
    { path: '/movies-home', label: 'Inicio' },
    { path: '/search-view', label: 'Buscador' },
    { path: '/tv-shows', label: 'Series TV' },
    { path: '/movie-list', label: 'Peliculas' },
    { path: '/my-list', label: 'Mi Lista' },
    { path: 'my-profile', label: 'Mi Perfil' },
  ];

  onClose() {
    this.parentNode?.removeChild(this);
  }

  render() {
    return html`
      <div class="modal active" id="modal">
        <div class="modal-header">
          <div class="title">Example Modal</div>
          <button
            data-close-button
            class="close-button"
            @click="${this.onClose}"
          >
            &times;
          </button>
        </div>
        <nav class="modal-body">
          ${this.views.map(
            ({ path, label }) => html`<a href="${path}">${label}</a>`
          )}
        </nav>
      </div>
      <div id="overlay" class="active"></div>
    `;
  }
}
