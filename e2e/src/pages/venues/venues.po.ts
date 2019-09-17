import { browser, element, by } from 'protractor';

export class VenuesPage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeLink() {
    return element(by.css('a[href*="venues"]'));
  }

  getSearchInput() {
    return element(by.name('search'));
  }

  getWhereInput() {
    return element(by.name('where'));
  }

  getCurrentLocationIcon() {
    return element(by.css('input-icon-suffix'));
  }
}
