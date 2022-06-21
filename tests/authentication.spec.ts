import { test, expect, Page } from "@playwright/test";
import { env } from "../helpers/env";
import { LoginPage } from "./page/login.po";
import { RolePage } from "./page/role/role.po";

let page: Page;
let loginPage : LoginPage;
const { email, password, url } = env;
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.openUrl(url+'/login/');
});
test.describe('Authentication', () => {
  test("should not log in with an correct username", async () => {
    var rolePage = new RolePage(page);
    loginPage.loginWithEmailAndPassword(email, password);
    await expect(rolePage.emailProfileLabel(email)).toBeVisible();
  });

  test("should not log in with an incorrect username", async () => {
    loginPage.loginWithEmailAndPassword('asdf@asdf123123123.asdf', 'any-password');
    await expect(loginPage.loginFailMessage).toBeVisible();
  });
});
