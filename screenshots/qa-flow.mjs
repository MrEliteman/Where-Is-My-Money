import { chromium } from "playwright";
import fs from "node:fs";

const dir = "/workspace/screenshots";
fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE", m.text());
});

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const startBtn = page.getByRole("button", { name: /Начать|Get started/i });
if (await startBtn.count()) {
  const ru = page.getByRole("button", { name: "Русский" });
  if (await ru.count()) await ru.click();
  await page.getByRole("checkbox").check();
  await startBtn.click();
  await page.waitForTimeout(500);
}

await page.screenshot({ path: `${dir}/home-desktop.png` });

// open food if form not visible
const add = page.getByRole("button", { name: /Добавить|Add/i }).first();
if (!(await add.isVisible().catch(() => false))) {
  const food = page.getByRole("button", { name: /Еда|Food/i }).first();
  if (await food.count()) await food.click();
  await page.waitForTimeout(200);
}
await page.screenshot({ path: `${dir}/home-form.png` });

const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: `${dir}/home-mobile.png` });
await mobile.evaluate(() => window.scrollTo(0, 420));
await mobile.waitForTimeout(200);
await mobile.screenshot({ path: `${dir}/home-mobile-scrolled.png` });

console.log("desktop text", (await page.locator("h1").innerText()).slice(0, 80));
console.log("mobile text", (await mobile.locator("body").innerText()).slice(0, 200));
await browser.close();
console.log("done");
