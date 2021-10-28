import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/views/home-page.js';
describe('HorizontalDisplay', () => {
    let element;
    beforeEach(async () => {
        element = await fixture(html `<home-page></home-page>`);
    });
    it('fetches data', async () => {
        expect(element.getElementsByTagName('loading-spinner')).to.exist;
    });
    /*   it('fetches data', async () => {
      expect(element.tmdb.carousel).to.be.empty;
      console.log('>>>>>>>>>>>', element.tmdb.carousel);
  
      await elementUpdated(element);
      expect(element.tmdb.carousel).to.be.empty;
      console.log('>>>>>>>>>>>', element.tmdb.carousel);
    }); */
});
//# sourceMappingURL=home-page.test.js.map