import { ListdFrontendPage } from './app.po';

describe('listd-frontend App', function() {
  let page: ListdFrontendPage;

  beforeEach(() => {
    page = new ListdFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
