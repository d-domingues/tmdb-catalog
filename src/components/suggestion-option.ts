import './mark-favorite.js';
import './star-rating.js';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { suggestionOptionStyles } from './search-bar.styles.js';

@customElement('suggestion-option')
export class SuggestionOption extends LitElement {
  static styles = suggestionOptionStyles;

  @property() item!: string | TmdbDataObj;

  getName = () => {
    if (typeof this.item === 'string') {
      return this.item;
    }

    return isMovie(this.item) ? this.item.title : this.item.name;
  };

  getDate() {
    if (typeof this.item !== 'string') {
      const strDate = isMovie(this.item) ? this.item.release_date : this.item.first_air_date;
      return strDate ? `(${strDate.split('-')[0]})` : '';
    }

    return null;
  }

  render() {
    if (typeof this.item === 'string') {
      return html` <a class="search-option" href="search-view/${this.item}"> ${this.item} </a> `;
    }

    const { poster_path, id, vote_average, media_type } = this.item;

    return html`
      <a class="details-option" href="details/${isMovie(this.item) ? 'movie' : 'tv'}/${id}">
        <img src=${imgSrc(poster_path, 'w45')} alt="" />
        <span>${this.getName()} ${this.getDate()}</span>
        <label>${vote_average}</label>
        <star-rating rating=${vote_average}></star-rating>
        <mark-favorite size="18" mediaId=${id} mediaType=${media_type}></mark-favorite>
      </a>
    `;
  }
}
