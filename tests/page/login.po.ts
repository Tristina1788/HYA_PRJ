import { Locator, Page } from '@playwright/test';

import { CommonPage } from './common.po';

export class login extends CommonPage {
  readonly page: Page;
  readonly singinWithEmailButton: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly signInButton: Locator;
  readonly loginFailMessage: Locator;
  readonly userProfileButton: any;

 

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.singinWithEmailButton = this.page.locator('div[role ="dialog"] button', {hasText : 'Sign in with email'});
    this.usernameTextbox = this.page.locator('input[type="email"]');
    this.passwordTextbox = this.page.locator('input[type="password"]');
    this.signInButton = this.page.locator('button:has-text("Sign in")');
    this.loginFailMessage = this.page.locator('p:has-text("Incorrect email address or password")');
    this.userProfileButton = (title: string): Locator => {
      return this.page.locator('button[title="Profile"] p', { hasText: title });
    };
    
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    await this.singinWithEmailButton.waitFor();
    await this.singinWithEmailButton.click();
    await this.usernameTextbox.fill(email);
    await this.passwordTextbox.fill(password);
    await this.signInButton.click();
  }
}
