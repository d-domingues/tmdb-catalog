import '../src/views/home-page.js';

describe('HorizontalDisplay', () => {
  let element: typeof import('../src/views/home-page.js').HomePage;

  beforeEach(async () => {
    //  element = await fixture(html`<home-page></home-page>`);
  });

  /*   it('fetches data', async () => {
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);

    await elementUpdated(element);
    expect(element.tmdb.carousel).to.be.empty;
    console.log('>>>>>>>>>>>', element.tmdb.carousel);
  }); */
});
