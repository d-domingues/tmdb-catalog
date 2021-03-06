import './mark-favorite.js';
import './star-rating.js';

import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, queryAsync } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { imgSrc } from '../directives/img-directive.js';
import { getMediaType, getName, isMovie, TmdbDataObj } from '../models/tmdb-data-obj.js';
import { putRecentSearches } from '../storage.js';
import { suggestionOptionStyles } from './search-bar.styles.js';

@customElement('suggestion-options')
export class SuggestionOptions extends LitElement {
  static styles = suggestionOptionStyles;

  @property() options!: (string | TmdbDataObj)[];
  @property({ type: Number }) currentIdx = 0;
  @queryAsync('[selected="true"]') selectedOpt!: Promise<HTMLAnchorElement>;
  @queryAsync('[selected="true"] [opttxt]') selectedOptText!: Promise<HTMLSpanElement>;

  getItemName = (item: string | TmdbDataObj) => (typeof item === 'string' ? item : getName(item));

  getDate = (item: string | TmdbDataObj) => {
    if (typeof item !== 'string') {
      const strDate = isMovie(item) ? item.release_date : item.first_air_date;
      return strDate ? `(${strDate.split('-')[0]})` : '';
    }

    return null;
  };

  updated(values: PropertyValues) {
    if (values.has('currentIdx')) {
      this.dispatchEvent(new Event('selectionChange'));
    }
  }

  render() {
    return repeat(
      this.options,
      (opt) => (typeof opt === 'string' ? opt : opt.id),
      (opt, idx) => html`${typeof opt === 'string' ? this.searchOptTmpl(opt, idx) : this.detailOptTmpl(opt, idx)}`
    );
  }

  searchOptTmpl = (text: string, idx: number) =>
    html`
      <a selected=${idx === this.currentIdx} class="search-option" href="search-view/${text}" @click=${() => putRecentSearches(text)}>
        <span opttxt> ${text} </span>
        <span style="color: gray"> - Buscar</span>
      </a>
    `;

  detailOptTmpl = (opt: TmdbDataObj, idx: number) => {
    const { poster_path, id, vote_average, media_type } = opt;

    return html`
      <a
        selected=${idx === this.currentIdx}
        class="details-option"
        href="details/${getMediaType(opt)}/${id}"
        @click=${() => putRecentSearches(opt)}
      >
        <img src=${imgSrc(poster_path, 'w45')} alt="" />
        <span>
          <span opttxt> ${this.getItemName(opt)} </span>
          <span style="color: gray">${this.getDate(opt)}</span></span
        >
        <label>${vote_average}</label>
        <star-rating .item=${opt}></star-rating>
        <mark-favorite size="16" mediaId=${id} mediaType=${media_type}></mark-favorite>
      </a>
    `;
  };
}
