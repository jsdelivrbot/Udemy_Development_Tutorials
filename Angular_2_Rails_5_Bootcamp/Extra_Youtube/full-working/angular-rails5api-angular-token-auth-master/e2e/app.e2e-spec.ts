import { TestSampleAppPage } from './app.po';

describe('test-sample-app App', () => {
  let page: TestSampleAppPage;

  beforeEach(() => {
    page = new TestSampleAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
