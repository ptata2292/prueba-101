import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    // return element(by.xpath('//h3[contains(text(),"Sign In")]')).getText() as Promise<string>;
    return element(by.css('h3')).getText() as Promise<string>;
  }
}
