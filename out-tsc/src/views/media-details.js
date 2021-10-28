import { __decorate } from "tslib";
import '../components/cast-scroller.js';
import '../components/loading-spinner.js';
import '../components/mark-favorite.js';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { getYear, isMovie } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { getRouter } from '../router.js';
import { getAccountStates, getDetails } from '../tmdb.api.js';
import styles from './media-details.styles.js';
let MediaDetails = class MediaDetails extends LitElement {
    constructor() {
        super(...arguments);
        this.location = getRouter().location;
        this.director = (details) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = details === null || details === void 0 ? void 0 : details.credits) === null || _a === void 0 ? void 0 : _a.crew) === null || _b === void 0 ? void 0 : _b.find(({ job }) => job === 'Director')) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '-'; };
        this.productionCountries = (details) => { var _a, _b; return (_b = (_a = details === null || details === void 0 ? void 0 : details.production_countries) === null || _a === void 0 ? void 0 : _a.map(p => p.name).join(', ')) !== null && _b !== void 0 ? _b : '-'; };
        this.genres = (details) => { var _a; return (_a = details === null || details === void 0 ? void 0 : details.genres) === null || _a === void 0 ? void 0 : _a.map(g => html `<span class="genre">${g.name}</span>`); };
        this.cast = (details) => { var _a, _b, _c; return (_c = (_b = (_a = details === null || details === void 0 ? void 0 : details.credits) === null || _a === void 0 ? void 0 : _a.cast) === null || _b === void 0 ? void 0 : _b.sort((a, b) => b.popularity - a.popularity)) !== null && _c !== void 0 ? _c : []; };
        this.moveScroller = (to) => this.castScroller.scrollBy({ left: this.castScroller.offsetWidth * to });
        this.runtimeInHHMM = (details) => {
            var _a, _b, _c, _d;
            const value = isMovie(details) &&
                !Number.isNaN(details.runtime) &&
                `${Math.floor(details.runtime / 60)}:${(_d = (_c = (_b = (_a = (details.runtime % 60)) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.concat('0')) === null || _c === void 0 ? void 0 : _c.substr(0, 2)) === null || _d === void 0 ? void 0 : _d.trim()}`;
            return value ? ` | ${value}` : '';
        };
        this.certification = (details) => {
            var _a, _b, _c, _d, _e, _f;
            const value = isMovie(details) &&
                `${(_f = (_e = (_d = (_c = (_b = (_a = details === null || details === void 0 ? void 0 : details.release_dates) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b.find(({ iso_3166_1 }) => iso_3166_1 === 'ES')) === null || _c === void 0 ? void 0 : _c.release_dates) === null || _d === void 0 ? void 0 : _d.at(0)) === null || _e === void 0 ? void 0 : _e.certification) === null || _f === void 0 ? void 0 : _f.trim()}`;
            return value ? ` | ${value}` : '';
        };
    }
    share(details) {
        navigator.share({
            title: 'Movie Catalog',
            text: `Details for ${isMovie(details) ? details.title : details.name}`,
            url: this.location.getUrl(),
        });
    }
    render() {
        var _a;
        const { type, id } = (_a = this.location) === null || _a === void 0 ? void 0 : _a.params;
        return until(Promise.all([getDetails(type, id), getAccountStates(type, id)]).then(([details, { favorite }]) => html `
          <div id="stack">
            <img id="backdrop-img" src=${imgSrc(details.backdrop_path)} alt="" />
            <!-- TITLE -->
            <span id="title">
              <b>${isMovie(details) ? details.title : details.name}</b>
              <div>
                ${getYear(details) + this.runtimeInHHMM(details) + this.certification(details)}
              </div>
            </span>
            <!-- RATING -->
            <span id="rating">
              <div style="text-align: right">${details.vote_average}</div>
              <star-rating size="16" rating=${details.vote_average}></star-rating>
            </span>
          </div>
          <div id="details">
            <!-- DIRECTOR -->
            <div>
              <h4>Director</h4>
              ${this.director(details)}
            </div>
            <!-- COUNTRY -->
            <div>
              <h4>País</h4>
              ${this.productionCountries(details)}
            </div>
            <!-- GENRES -->
            ${this.genres(details)}
            <!-- MARK FAVORITE BTN -->
            <mark-favorite mediaId=${id} mediaType=${type} ?favorite=${favorite}></mark-favorite>
            <img
              height="25"
              src="assets/share.svg"
              alt="SHARE"
              @click=${this.share}
              @keyup=${this.share}
            />
          </div>
          <!-- OVERVIEW -->
          <h4>Sinopsis</h4>
          <span id="overview">${details.overview}</span>
          <!-- CAST -->
          <h4>Reparto</h4>
          <div style="display: flex">
            <button @click=${() => this.moveScroller(-1)}>&#60;</button>
            <div id="cast-scroller">
              ${this.cast(details).map(({ profile_path, name, character }) => html `
                  <img src=${imgSrc(profile_path, 'w92')} alt="" />
                  <b>${name}</b>
                  <span>${character}</span>
                `)}
            </div>
            <button @click=${() => this.moveScroller(1)}>&#62;</button>
          </div>
        `), html `<loading-spinner></loading-spinner>`);
    }
};
MediaDetails.styles = styles;
__decorate([
    property({ type: Object })
], MediaDetails.prototype, "location", void 0);
__decorate([
    query('#cast-scroller')
], MediaDetails.prototype, "castScroller", void 0);
MediaDetails = __decorate([
    customElement('media-details')
], MediaDetails);
export { MediaDetails };
//# sourceMappingURL=media-details.js.map