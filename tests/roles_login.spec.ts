import { test, expect } from "@playwright/test";
import { Page } from "playwright";
import { env } from "../helpers/env";
import { addAuthTo } from "../lib/firebaseAuth";
import { DashboardPage } from "./page/dashboard.po";
import { LoginPage } from "./page/login.po";
import { RolePage } from "./page/role/role.po";
import { RoleInfo } from '../model/role';
import { ApplyPage } from "./page/apply.po";
import { ApplyInfo } from "../model/applicator";
import { Constant } from "../common/constant";
import { getCurrentDate, uniqueEmail, uniqueStr } from "../helpers/stringHelper";
import { RoleDetailPage } from "./page/role/role-detail.po";
import { LogoutPage } from "./page/logout.po";

let page: Page;
let loginPage : LoginPage;
let dashboardPage : DashboardPage;


const { email, password, url } = env;
const roleName = uniqueStr("RoleTesting");
let linkApplyRole = '';

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

test.describe("Verify create new role and apply for role as an anonymous user", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.openUrl(url+'/login/');
    await loginPage.loginWithEmailAndPassword(email, password);
  });

  test("should enable to create a new role", async () => {
  dashboardPage = new DashboardPage(page);
  const roleInfor = new RoleInfo(roleName, getCurrentDate());
  const rolePage = new RolePage(page);
  const applyPage = new ApplyPage(page); 
  const roleDetailPage = new RoleDetailPage(page); 
  const logoutPage = new LogoutPage(page); 

  await dashboardPage.createRole();
  await rolePage.addNewRole(roleInfor);

  linkApplyRole =  url+ await roleDetailPage.getLinkJob();
  await applyPage.signOut();
  await logoutPage.waitLogoutSucess();
  });

  test("should enable to apply for the role as an anonymous user", async () => {
    const applydata = new ApplyInfo("ApplyTest", uniqueEmail('test'));
    dashboardPage = new DashboardPage(page);
    const applyPage = new ApplyPage(page); 
    const roleDetailPage = new RoleDetailPage(page); 
    const rolePage = new RolePage(page);
    await dashboardPage.openUrl(linkApplyRole);
    await applyPage.fillApplyInfo(applydata);
    await expect(applyPage.appliedMessage).toBeVisible();

});

    test("Logged-in user should enable verify whether the application has arrived for extra points", async () => {
      const applyPage = new ApplyPage(page); 
      const roleDetailPage = new RoleDetailPage(page); 
      const rolePage = new RolePage(page);
      await applyPage.openUrl(url+'/login/');
      await loginPage.loginWithEmailAndPassword(email, password);
      await rolePage.verifyNumOfApplied(roleName, '1');
      await rolePage.clickRoleName(roleName);
      });

      test("Should enable to delete role", async () => {
        const roleDetailPage = new RoleDetailPage(page); 
        await roleDetailPage.deleteRole();
      });
  });