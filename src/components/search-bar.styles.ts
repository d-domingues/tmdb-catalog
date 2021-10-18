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
    margin: 10px 0;
  }

  @media only screen and (min-width: 601px) {
    input#search-input {
      transition: 400ms ease-in-out;
      width: 120px;
      opacity: 0.4;
    }

    input#search-input:focus {
      width: 400px;
      opacity: 1;
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

  #suggestions.show {
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
