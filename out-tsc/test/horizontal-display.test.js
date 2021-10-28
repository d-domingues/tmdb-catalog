import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/components/horizontal-display.js';
describe('HorizontalDisplay', () => {
    let element;
    beforeEach(async () => {
        const stub = [{ poster_path: 'A' }, { poster_path: 'B' }, { poster_path: 'C' }];
        element = await fixture(html `<horizontal-display .items=${stub}></horizontal-display>`);
    });
    it('renders a title', () => {
        const h4 = element.shadowRoot.querySelector('h4');
        expect(h4).to.exist;
        expect(h4.textContent).to.equal('Novedades');
    });
    it('renders the movie items', () => {
        const movies = element.shadowRoot.querySelectorAll('.item');
        expect(movies).to.be.an.instanceof(NodeList).that.have.length(3);
    });
    it('produces correct image scr property', () => {
        const movies = element.shadowRoot.querySelectorAll('.item');
        expect(movies[2]).to.have.property('src', 'https://image.tmdb.org/t/p/w500/C');
    });
});
//# sourceMappingURL=horizontal-display.test.js.map