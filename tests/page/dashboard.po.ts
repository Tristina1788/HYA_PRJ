import { Locator, Page } from '@playwright/test';

import { CommonPage } from './common.po';

export class dashboard extends CommonPage {
  readonly page: Page;
  readonly userNameTextbox: Locator;
  readonly roleLabel: Locator;
  readonly viewCareersPageLabel: Locator;
  readonly addRoleButton: Locator;
  readonly newApplicationLabel: Locator;
  readonly interviewsProgressLabel: Locator;
  readonly averageWaitLabel: Locator;

 

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.userNameTextbox = this.page.locator('p:has-text("'+ process.env.ADMIN_USERNAME +'")');
    this.roleLabel = this.page.locator('h1:has-text("Roles")');
    this.viewCareersPageLabel = this.page.locator('a:has-text("View careers page")');
    this.addRoleButton = this.page.locator('text=Add role');
    this.newApplicationLabel = this.page.locator('text=New applicants');
    this.interviewsProgressLabel = this.page.locator('text=Interviews in progress');
    this.averageWaitLabel = this.page.locator('text=Average wait in stage')

    
  }

  async createRole() {
    await this.addRoleButton.click();
  }
}
