import { BooksAppPage } from './app.po';

describe('books-app App', function() {
  let page: BooksAppPage;

  beforeEach(() => {
    page = new BooksAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
