import { expect, Locator, Page } from '@playwright/test';
import { RoleInfo } from '../../../model/role';
import { RoleCommonPage } from './role-common.po';

export class RolePage extends RoleCommonPage {
  readonly page: Page;
  readonly titleRoleText: Locator;
  readonly desTemplateRoleBtn: Locator;
  readonly frontEndTemplateSelectoin: Locator;
  readonly partTimeRadio: Locator;
  readonly locationText: Locator;
  readonly deadlineText: Locator;
  readonly amountFromText: Locator;
  readonly amountToText: Locator;
  readonly showRemunerationOption: Locator;
  readonly hiringManagermentSelectBox: Locator;
  readonly hiringManagermentOption3: Locator;
  readonly departmentSelectBox: Locator;
  readonly departmentOption4: Locator;
  readonly numberPositionText: Locator;
  readonly numberPositionLabel: Locator;
  readonly saveContinueBtn: Locator;
  readonly AdditionQuestionText: Locator;
  readonly AdditionQuestionOptionGoodMorning: Locator;
  readonly approvalSelection: Locator;
  readonly acceptApplicationRadio: Locator;
  readonly createRoleBtn: Locator;
  readonly numOfAppliedLabel: any;
  readonly roleNameLabel: any;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.titleRoleText = this.page.locator('input[name="title"]');
    this.desTemplateRoleBtn = this.page.locator('text=DescriptionSelect a template >> svg');
    this.frontEndTemplateSelectoin = this.page.locator('#react-select-3-option-1');
    this.partTimeRadio = this.page.locator('div[role="radio"]:has-text("Part-time")');
    this.locationText = this.page.locator('input[name="location"]');
    this.deadlineText = this.page.locator('input[name="deadline"]');
    this.amountFromText = this.page.locator('text=£$€to >> input[type="text"]').first();
    this.amountToText = this.page.locator('text=£$€to >> input[type="text"]').nth(1);
    this.showRemunerationOption = this.page.locator('text=Show remuneration on job advert');
    this.hiringManagermentSelectBox = this.page.locator('text=Apollo Member4');
    this.hiringManagermentOption3 = this.page.locator('#react-select-4-option-3');
    this.departmentSelectBox = this.page.locator('xpath=//span[text()="Department"]//parent::label//div[contains(@class,"ya-select__indicators")]');
    this.departmentOption4 = this.page.locator('#react-select-5-option-4');
    this.numberPositionText = this.page.locator('input[name="rolesCount"]');
    this.numberPositionLabel = this.page.locator('span:has-text("Number of positions")'); 
    this.saveContinueBtn = this.page.locator('button:has-text("Save and continue")'); 
    this.AdditionQuestionText = this.page.locator('text=Additional questionsType or select a question >> svg'); 
    this.AdditionQuestionOptionGoodMorning = this.page.locator('#react-select-6-option-0'); 
    this.approvalSelection = this.page.locator('.hya-select__indicator'); 
    this.acceptApplicationRadio = this.page.locator('text=Only accept internal applications'); 
    this.createRoleBtn = this.page.locator('button:has-text("Create role")'); 
    this.numOfAppliedLabel = (roleName: string): string => {
      return `(//p[text()='${roleName}']/parent::div/following-sibling::div)[1]//span[text()='Applied']/preceding-sibling::span`;
    };
    this.roleNameLabel = (roleName: string): Locator => {
      return this.page.locator('p', { hasText: roleName });
    };
  }
  
  async addNewRole( role: RoleInfo) {
        await this.titleRoleText.fill(role.name);
        await this.desTemplateRoleBtn.click();
        await this.frontEndTemplateSelectoin.click();
        await this.partTimeRadio.click();
        await this.locationText.click();
        await this.locationText.fill(role.location);
        await this.deadlineText.fill(role.dateTime);
        await this.amountFromText.first().click();
        await this.amountFromText.first().fill(role.amountFrom);
        await this.amountToText.click();
        await this.amountToText.fill(role.amountTo);
        await this.showRemunerationOption.click();
        await this.hiringManagermentSelectBox.click();
        await this.hiringManagermentOption3.click();
        await this.departmentSelectBox.click();
        await this.departmentOption4.click();
        await this.numberPositionText.fill('5');
        await this.numberPositionLabel.click();
        await this.saveContinueBtn.click();
        await this.AdditionQuestionText.waitFor();
        await this.AdditionQuestionText.click();
        await this.AdditionQuestionOptionGoodMorning.click();
        await this.saveContinueBtn.click();
        await this.approvalSelection.click();
        await this.acceptApplicationRadio.click();
        await this.createRoleBtn.click()
        
  }

  async getNumOfApplied(roleName: string) {
    return  this.numOfAppliedLabel(roleName).innerText();
  }

  async verifyNumOfApplied(roleName: string, expectedNum: string): Promise<void> {
    await this.page.waitForSelector(this.numOfAppliedLabel(roleName));
    expect(await this.page.$eval(this.numOfAppliedLabel(roleName), el => el.textContent)).toEqual(expectedNum);
  }

  async clickRoleName(roleName: string) {
    await this.roleNameLabel(roleName).click();
  }
}
