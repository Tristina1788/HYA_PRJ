import { Locator, Page } from '@playwright/test';

import { RoleCommonPage } from './role-common.po';

export class RoleDetailPage extends RoleCommonPage {
  readonly page: Page;
  readonly appliedNumber: Locator;
  readonly threeDotBtn: Locator;
  readonly viewJobBtn: Locator;
  readonly deleteRoleBtn: Locator;
  readonly doItBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.appliedNumber = this.page.locator('//span[text()="Applied"]/following-sibling::span');
    this.threeDotBtn = this.page.locator('xpath=//button[contains(@id,"headlessui-menu-button")]');
    this.viewJobBtn = this.page.locator('text=View job ad');
    this.deleteRoleBtn = this.page.locator('button[role="menuitem"]');
    this.doItBtn = this.page.locator('button[data-test-id="modal-confirmBtn"]', {hasText : 'Do it!'});
  }

  async getLinkJob() {
    await this.threeDotBtn.click();
    return await this.viewJobBtn.getAttribute('href');
  }

  async deleteRole() {
    await this.threeDotBtn.click();
    await this.deleteRoleBtn.click()
    await this.doItBtn.click();
  }

  async getNumOfApplied() {
    return  this.appliedNumber.innerText();
  }
}
