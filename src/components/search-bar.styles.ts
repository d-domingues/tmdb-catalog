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

    #search-input:focus {
      width: 400px;
      opacity: 1;
    }

    #search-input.show:focus {
      border-radius: 18px 18px 0 0;
      border-bottom: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    input#search-input {
      width: 100%;
    }
  }

  suggestion-options {
    display: block;
    width: calc(100% - 4px);
    background: white;
    overflow: hidden;
    border: 2px solid #333333;
    border-top: none;
    border-bottom: 0;
    /* animation */
    transition: 300ms ease-in-out;
    max-height: 0vh;
  }

  suggestion-options.show {
    border-bottom: 2px solid #333333;
    max-height: 90vh;
  }
`;

export const suggestionOptionStyles = css`
  a {
    text-decoration: none;
    color: black;
    font-size: 14px;
  }

  a[selected='true'] {
    background: lightblue;
  }

  .search-option {
    display: block;
    padding: 10px 8px;
  }

  .details-option {
    display: grid;
    grid-template-areas:
      'img title title title'
      'img avg_rating rating like';
    grid-template-columns: min-content min-content auto min-content;
    column-gap: 4px;
    padding-right: 10px;
    margin: 0px;
    align-items: end;
  }

  .details-option img {
    grid-area: img;
    height: 46px;
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
