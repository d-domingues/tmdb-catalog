import { css } from 'lit';

export const horizontalDisplaySyles = css`
  h5 {
    margin-bottom: 8px;
    text-align: start;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 24px 8px;
  }

  .movie-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
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
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
  }

  .movie-card a img:hover {
    transform: scale(1.02);
  }

  .movie-card b.label {
    height: 36px;
    font-size: 14px;
    word-break: break-word;
    line-height: 16px;
    letter-spacing: -0.6px;
    align-items: center;
  }

  .movie-card mark-favorite {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .rating {
    align-items: center;
    display: flex;
    justify-content: center;
    column-gap: 4px;
  }
`;
