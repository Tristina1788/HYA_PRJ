import { FrameLocator, Locator, Page } from '@playwright/test';
import { Constant } from '../../common/constant';

export class CommonPage {
  
  readonly page: Page;
  readonly logoAccount: Locator;
  readonly signOutBtn: Locator;
  readonly noBannerCookieBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoAccount = this.page.locator('[data-test-id="profile-popper-btn"]');
    this.signOutBtn = this.page.locator('text=Sign out');
    this.noBannerCookieBtn = this.page.locator('[data-test-id="cookie-banner-no"]');
  }

  async openUrl(urlPath: string): Promise<void> {
    await this.page.goto(urlPath, { timeout: 90 * 1000 });
    await this.page.waitForLoadState();
  }

  async getCurrentUrl() : Promise<string>{
   return this.page.url();
  }

  async signOut() {
    if(await this.noBannerCookieBtn.isVisible())
      await this.noBannerCookieBtn.click();

    await this.logoAccount.click();
    await this.signOutBtn.click();
    
  }

  sleep(s: number) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }
}
