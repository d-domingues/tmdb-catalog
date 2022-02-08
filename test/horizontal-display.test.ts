import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/components/horizontal-display.js';
import { HorizontalDisplay } from '../src/components/horizontal-display.js';
import { TmdbMovie } from '../src/models/tmdb-movie.js';

describe('HorizontalDisplay', () => {
  const stub: TmdbMovie[] = [{ poster_path: '/A' }, { poster_path: '/B' }, { poster_path: '/C' }] as TmdbMovie[];

  let element: HorizontalDisplay;

  beforeEach(async () => {
    element = await fixture(html`<horizontal-display title="Test Title" Tilte .items=${stub}></horizontal-display>`);
  });

  it('renders a title', () => {
    const h5 = element.shadowRoot!.querySelector('h5');
    expect(h5).to.exist;
    expect(h5!.textContent).to.equal('Test Title');
  });

  it('renders the movie items', () => {
    const movies = element.shadowRoot!.querySelectorAll('.movie-card');
    expect(movies).to.be.an.instanceof(NodeList).that.have.length(3);
  });

  it('produces correct image scr property', () => {
    const movies = element.shadowRoot!.querySelectorAll('.movie-card');
    expect(movies[2].querySelector('img')).to.have.property('src', 'https://image.tmdb.org/t/p/w185/C');
  });
});
