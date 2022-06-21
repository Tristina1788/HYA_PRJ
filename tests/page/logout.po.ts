import { Locator, Page } from '@playwright/test';

import { CommonPage } from './common.po';

export class LogoutPage extends CommonPage {
  readonly page: Page;
  readonly logoutSuccessMessage: Locator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.logoutSuccessMessage = this.page.locator('h1', {hasText : `You're logged out.`});
  }

  async waitLogoutSucess() {
    await this.logoutSuccessMessage.waitFor();
  }

}
