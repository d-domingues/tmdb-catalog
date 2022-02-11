import '../src/views/home-page.js';

import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';

import { HorizontalDisplay } from '../src/components/horizontal-display.js';
import { CarouselComponent } from './../src/components/carousel-component.js';

describe('HomePage', () => {
  let element: import('../src/views/home-page.js').HomePage;

  beforeEach(async () => {
    element = await fixture(html`<home-page></home-page>`);
  });

  it('loader component present', async () => {
    expect(element.renderRoot.querySelector('loading-spinner')).to.exist;
  });

  describe('HomePage children rendered', () => {
    beforeEach(async () => {
      // needs to wait until the data is fetched before rendering the child elements
      await waitUntil(() => element.renderRoot.children.length > 1, 'Element did not render children', {
        interval: 100,
      });
    });

    it('loader removed', async () => {
      expect(element.renderRoot.querySelector('loading-spinner')).to.not.exist;
    });

    it('lightDom rendered', () => {
      expect(element).shadowDom.to.equal(`
        <search-bar> </search-bar>
        <carousel-component style="--slide:0;"> </carousel-component>
        <horizontal-display title="Novedades"> </horizontal-display>
        <horizontal-display title="Series"> </horizontal-display>
      `);
    });

    it('CarouselComponent 1st slide title is MOVIE 1', () => {
      const carousel: CarouselComponent = element.renderRoot.querySelector('carousel-component');
      expect(carousel.renderRoot.querySelector('.title').textContent).to.be.equal('MOVIE 1');
    });

    it('HorizontalDisplay has 1 element', () => {
      const horizDisp1: HorizontalDisplay = element.renderRoot.querySelector('horizontal-display');
      expect(horizDisp1.items).to.have.length(1);
    });
  });
});
