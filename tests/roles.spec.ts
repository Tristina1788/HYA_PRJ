import { test, expect } from "@playwright/test";
import { addAuthTo } from "../lib/firebaseAuth";

test.beforeEach(async ({ browser, page }) => {
  await page.goto("https://app.hya.work/");
  await browser.newContext({
    storageState: "/Users/wimagguc/Desktop/state.json"
  });
  await addAuthTo(page);
  await page.goto("https://app.hya.work/hire/roles/");
});

test.describe("Roles", () => {
  test("should be able to see all roles", async ({ browser, page }) => {
    await expect(page.locator("text=sign in")).not.toBeVisible();
    await expect(page.locator("text=New Role in Interview 0601")).toBeVisible();
  });
});
