import { css } from 'lit';

export const horizontalDisplaySyles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px 8px;
  }

  h5 {
    grid-column: span 5 / auto;
    margin-bottom: 0px;
    text-align: start;
  }

  .movie-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    --label-height: 36px;
    --rating-height: 26px;
  }

  .movie-card a {
    height: 100%;
    margin-bottom: 10px;
  }

  .movie-card a img {
    height: 100%;
    width: 100%;
    border-radius: 6px;
    background: black;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
      rgb(0 0 0 / 20%) 0px -3px 0px inset;
  }

  .movie-card a img:hover {
    transform: scale(1.02);
  }

  .movie-card b.label {
    height: var(--label-height);
    font-size: 14px;
    word-break: break-word;
    line-height: 16px;
    letter-spacing: -0.6px;
    align-items: center;
  }

  .rating {
    align-items: center;
    display: flex;
    justify-content: center;
    column-gap: 6px;
  }

  /* Responsive for mobile devices */
  @media only screen and (max-width: 600px) {
    :host {
      grid-template-columns: repeat(3, 1fr);
    }

    h5 {
      grid-column: span 3;
    }

    .movie-card b.label {
      font-size: 10px;
      line-height: 10px;
    }
  }
`;
