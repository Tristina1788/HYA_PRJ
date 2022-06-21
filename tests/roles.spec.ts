import { test, expect } from "@playwright/test";
import { env } from "../helpers/env";
import { addAuthTo } from "../lib/firebaseAuth";
const { email, password, url } = env;
test.beforeEach(async ({ browser, page }) => {
  await page.goto(url);
  await browser.newContext({
    storageState: "/Users/wimagguc/Desktop/state.json"
  });
  await addAuthTo(page);
  await page.goto(url+"/hire/roles/");
});

test.describe("Roles", () => {
  test("should be able to see all roles", async ({ browser, page }) => {
    await expect(page.locator("text=sign in")).not.toBeVisible();
    await expect(page.locator("text=New Role in Interview 0601")).toBeVisible();
  });
});
