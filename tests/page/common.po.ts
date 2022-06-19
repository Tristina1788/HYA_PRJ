import { FrameLocator, Locator, Page } from '@playwright/test';

export class CommonPage {
  readonly page: Page;
  readonly logoAccount: Locator;
  

  readonly lariPrimaryButton: any;

  constructor(page: Page) {
    this.page = page;
  }

  async openUrl(urlPath: string): Promise<void> {
    await this.page.goto(urlPath);
  }
  
}
