import { captureAuthFrom } from "./lib/firebaseAuth";
import { chromium, FullConfig } from "@playwright/test";
import { env } from "./helpers/env";
const { email, password, url } = env;
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url+"/login/");

  await page.locator("text=Sign in with email").click();
  await page.locator('input[type="email"]').fill(process.env.ADMIN_USERNAME+'');
  await page.locator('input[type="password"]').fill(process.env.ADMIN_PASSWORD+'');
  await page.locator('button:has-text("Sign in")').click();
  await page
    .context()
    .storageState({ path: "/Users/wimagguc/Desktop/state.json" });

  // Need a small delay for the indexedDb to be ready
  await delay(500);

  await captureAuthFrom(page);

  await browser.close();
}

export default globalSetup;
