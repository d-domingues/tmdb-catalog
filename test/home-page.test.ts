/* eslint-disable import/no-duplicates */
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/views/home-page.js';
import { HomePage } from '../src/views/home-page.js';

describe('HorizontalDisplay', () => {
  let element: HomePage;

  beforeEach(async () => {
    element = await fixture(html`<home-page></home-page>`);
  });

  it('fetches data', async () => {
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);

    await elementUpdated(element);
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);
  });
});
