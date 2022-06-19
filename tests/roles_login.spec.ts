import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { env } from "../helpers/env";
import { addAuthTo } from "../lib/firebaseAuth";
import { dashboard } from "./page/dashboard.po";
import { login } from "./page/login.po";
import { role } from "./page/role.po";
let page: Page;
let loginPage:login;
let dashboardPage:dashboard;
let rolePage:role;
const { email, password, url } = env;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new login(page);
  await loginPage.openUrl(url);
  loginPage.loginWithEmailAndPassword(email, password);
});

// test.describe("Roles", () => {
//   test("should enable see all roles", async ({ browser, page }) => {
    
//     await sleep(3000)
//     await expect(dashboardPage.userNameTextbox).toBeVisible();
//     await expect(dashboardPage.roleLabel).toBeVisible();
//     await expect(dashboardPage.viewCareersPageLabel).toBeVisible();
//     await expect(dashboardPage.addRoleButton).toBeVisible();
//     await expect(dashboardPage.newApplicationLabel).toBeVisible();
//     await expect(dashboardPage.interviewsProgressLabel).toBeVisible();
//     await expect(dashboardPage.averageWaitLabel).toBeVisible();
//   });
// });

test.describe("Add a new role", () => {
    test("should enable to create a new role", async () => {
    await sleep(3000);
    dashboardPage = new dashboard(page);
    await dashboardPage.addRoleButton.click();
    //dashboardPage.createRole();
    //await page.locator('text=Add role').click();
    await page.locator('input[name="title"]').fill("testtttttttttt");
    await sleep(3000);
    rolePage = new role(page);
    // await sleep(3000);
    // await page.locator('input[name="title"]').fill("testtttttttttt");
    rolePage.addNewRole("RoleTesting","USA","22-06-2022",5000,8000)

    });
    
    //await expect(page.locator('[data-test-id="role-title"]')).toContainText(roleName);
  });


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
