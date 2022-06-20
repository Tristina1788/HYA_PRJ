import { test, expect, Page } from "@playwright/test";
import { env } from "../helpers/env";
import { login } from "./page/login.po";

let page: Page;
let loginPage : login;
const { email, password, url } = env;
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new login(page);
  await loginPage.openUrl(url+'/login/');
});
test.describe('Authentication', () => {
  test("should not log in with an correct username", async () => {
    loginPage.loginWithEmailAndPassword(email, password);
    await expect(loginPage.userProfileButton(email)).toBeVisible();
  });

  test("should not log in with an incorrect username", async () => {
    loginPage.loginWithEmailAndPassword('asdf@asdf123123123.asdf', 'any-password');
    await expect(loginPage.loginFailMessage).toBeVisible();
  });
});
