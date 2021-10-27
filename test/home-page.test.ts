import '../src/views/home-page.js';

import { aTimeout, elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import { HorizontalDisplay } from '../src/components/horizontal-display.js';

describe('HorizontalDisplay', () => {
  let element: import('../src/views/home-page.js').HomePage;

  beforeEach(async () => {
    element = await fixture(html`<home-page></home-page>`);
  });

  it('loader component present', async () => {
    expect(element.getElementsByTagName('loading-spinner')).to.exist;
  });

  it('fetches data', async () => {
    const horizontalDisp: HorizontalDisplay = element.shadowRoot?.querySelector(
      'horizontal-display'
    ) as HorizontalDisplay;

    expect(horizontalDisp.items).to.have.length(1);

    await aTimeout(0);
    await elementUpdated(element);
  });

  /*   it('fetches data', async () => {
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);

    await elementUpdated(element);
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);
  }); */
});
