import { EshopAppPage } from './app.po';

describe('eshop-app App', () => {
  let page: EshopAppPage;

  beforeEach(() => {
    page = new EshopAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
