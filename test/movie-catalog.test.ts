import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/movie-catalog.js';
import { MovieCatalog } from '../src/movie-catalog.js';

describe('MovieCatalog', () => {
  let element: MovieCatalog;

  beforeEach(async () => {
    element = await fixture(html`<movie-catalog></movie-catalog>`);
  });

  it('footer text', () => {
    const footer = element.shadowRoot!.querySelector('footer')!;
    expect(footer).to.exist;
    expect(footer.textContent).to.equal('Movie Catalog');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
