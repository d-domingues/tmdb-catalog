import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import '../src/components/mark-favorite.js';
import { MarkFavorite } from '../src/components/mark-favorite.js';
import '../src/movie-catalog.js';

describe('MarkFavorite', () => {
  let element: MarkFavorite;
  let heart: HTMLImageElement;

  beforeEach(async () => {
    element = await fixture(html`<mark-favorite></mark-favorite>`);
    heart = element.renderRoot.firstElementChild as HTMLImageElement;
  });

  it('favorite is false', () => {
    expect(element.favorite).to.be.false;
  });

  it('icon is shade-heart.svg', () => {
    expect(heart).to.have.property('src', 'http://localhost:8000/shade-heart.svg');
  });

  describe('MarkFavorite after click', () => {
    beforeEach(async () => {
      setTimeout(() => heart.click());
      await oneEvent(element, 'click');
    });

    it('favorite is true', () => {
      expect(element.favorite).to.be.true;
    });

    it('icon is red-heart.svg', () => {
      expect(heart).to.have.property('src', 'http://localhost:8000/red-heart.svg');
    });
  });
});
