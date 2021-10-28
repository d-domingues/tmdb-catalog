import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let LoadingSpinner = class LoadingSpinner extends LitElement {
    render() {
        return html `<div class="loader"></div>`;
    }
};
LoadingSpinner.styles = css `
    .loader {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
      margin: auto;
    }

    /* Safari */
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
LoadingSpinner = __decorate([
    customElement('loading-spinner')
], LoadingSpinner);
export { LoadingSpinner };
//# sourceMappingURL=loading-spinner.js.map