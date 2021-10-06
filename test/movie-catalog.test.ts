import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/movie-catalog.js';
import { MovieCatalog } from '../src/movie-catalog.js';

describe('MovieCatalog', () => {
  let element: MovieCatalog;
  beforeEach(async () => {
    element = await fixture(html`<movie-catalog></movie-catalog>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Movie Catalog');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
