import { css } from 'lit';

export const searchBarStyles = css`
  input#search-input {
    box-sizing: border-box;
    border: 2px solid #333333;
    border-radius: 20px;
    font-size: 14px;
    background-image: url(assets/search-icon.svg);
    background-position: 8px center;
    background-repeat: no-repeat;
    background-size: 14px;
    padding: 8px;
    outline: none;
    text-indent: 24px;
  }

  @media only screen and (min-width: 601px) {
    input#search-input {
      transition: width 400ms ease-in-out;
      width: 120px;
      opacity: 0.4;
      margin: 0;
    }

    input#search-input:focus {
      width: 400px;
      opacity: 1;
    }

    .show input#search-input:focus {
      border-radius: 18px 18px 0 0;
      border-bottom: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    input#search-input {
      width: 100%;
    }
  }

  #suggestions {
    position: absolute;
    z-index: 20;
    overflow: hidden;
    width: calc(100% - 4px);
    transition: 400ms ease-in-out;
    max-height: 0;
  }

  .show #suggestions {
    border: 2px solid #333333;
    border-top: none;
    max-height: 400px;
  }

  #suggestions suggestion-option[selected='true'] {
    background: lightblue;
  }

  .star {
    width: 20px;
    height: 20px;
  }
`;

export const suggestionOptionStyles = css`
  :host {
    display: block;
    background: white;
    min-height: 32px;
  }

  :host[selected='true'] a {
    background: lightblue;
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 14px;
  }

  .details-option {
    display: grid;
    grid-template-areas:
      'img title title title'
      'img avg_rating rating like';
    grid-template-columns: min-content min-content auto min-content;
    column-gap: 8px;
    padding-right: 10px;
    margin: 0px;
    align-items: end;
  }

  .details-option img {
    grid-area: img;
    height: 50px;
  }

  .details-option span {
    grid-area: title;
  }

  .details-option label {
    grid-area: avg_rating;
  }

  .details-option star-rating {
    grid-area: rating;
  }

  .details-option mark-favorite {
    grid-area: like;
  }
`;
