import { Locator, Page } from '@playwright/test';
import { Constant } from '../../common/constant';
import { ApplyInfo } from '../../model/applicator';

import { CommonPage } from './common.po';

export class ApplyPage extends CommonPage {
  readonly page: Page;
  readonly displayNameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly phoneTextbox: Locator;
  readonly coverLetterTextbox: Locator;
  readonly linkIDTextbox: Locator;
  readonly applyBtn: Locator;
  readonly cvUploadBtn: Locator;
  readonly loadFileSuccess: string;
  readonly appliedMessage: Locator;
  readonly answerTextbox: Locator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.displayNameTextbox = this.page.locator('input[name="displayName"]');
    this.emailTextbox = this.page.locator('input[name="email"]');
    this.phoneTextbox = this.page.locator('input[name="phoneNumber"]');
    this.linkIDTextbox = this.page.locator('input[name="linkedin"]');
    this.cvUploadBtn = this.page.locator('div[role="button"] input');
    this.applyBtn = this.page.locator('button[type="submit"]', {hasText : 'Apply'});
    this.loadFileSuccess = '//span[text()="100%"]';
    this.appliedMessage = this.page.locator('span[data-test-id="applied-message"]');
    this.answerTextbox = this.page.locator('input[name="applicationAdditionalQuestions.good-morning"]');
    
  }

  async fillApplyInfo(applyInfor: ApplyInfo) {
    await this.displayNameTextbox.fill(applyInfor.name);
    await this.emailTextbox.fill(applyInfor.email);
    await this.phoneTextbox.fill(applyInfor.phoneNumber);
    await this.linkIDTextbox.fill(applyInfor.linkId);
    await this.answerTextbox.fill(Constant.goodMorningAnwser);
    await this.cvUploadBtn.setInputFiles(applyInfor.cvPath);
    await this.page.waitForSelector(this.loadFileSuccess, {timeout : 50 * 1000} );
    await this.applyBtn.click();
  }

  
}
