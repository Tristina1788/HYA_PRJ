import { Locator, Page } from '@playwright/test';
import { RoleInfo } from '../../../model/role';

import { CommonPage } from '../common.po';

export class RoleCommonPage extends CommonPage {
  readonly page: Page;
  
  readonly signOutBtn: Locator;
  readonly searchTextbox: Locator;
  readonly userProfileButton: Locator;
  readonly emailProfileLabel: any;
  readonly searchResult: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.searchTextbox = this.page.locator('input[id="search"]');
    this.emailProfileLabel = (title: string): Locator => {
      return this.page.locator('button[title="Profile"] p', { hasText: title });
    };

    this.userProfileButton = this.page.locator('button[title="Profile"]');
    this.signOutBtn = this.page.locator('a', {hasText : 'Sign out'});
    this.searchResult = this.page.locator('div[data-test-id="search-results"]');
    
  }

  async logout() : Promise<void> {
    await this.userProfileButton.click();
    await this.signOutBtn.click();
  }

  async searchRole(roleName : string) : Promise<void> {
    await this.searchTextbox.fill(roleName);
    await this.searchResult.first().click();
  }
}
