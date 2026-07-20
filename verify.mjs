import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push('PAGE ERROR: ' + err.message));

await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

await page.screenshot({ path: 'C:/tmp/hero.png' });
console.log('Hero screenshot saved');

const sections = ['hero','services','projects','about','process','contact'];
for (const id of sections) {
  const el = await page.$(`#${id}`);
  console.log(`#${id}: ${el ? 'FOUND' : 'MISSING'}`);
}

// Navbar check
const navbar = await page.$('header');
console.log(`Navbar: ${navbar ? 'FOUND' : 'MISSING'}`);

await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
await page.waitForTimeout(700);
await page.screenshot({ path: 'C:/tmp/services.png' });
console.log('Services screenshot saved');

await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
await page.waitForTimeout(700);
await page.screenshot({ path: 'C:/tmp/projects.png' });
console.log('Projects screenshot saved');

await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
await page.waitForTimeout(700);
await page.screenshot({ path: 'C:/tmp/contact.png' });
console.log('Contact screenshot saved');

// Full page
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'C:/tmp/fullpage.png', fullPage: true });
console.log('Full page screenshot saved');

console.log('Console errors:', consoleErrors.length ? consoleErrors.join('\n') : 'none');
await browser.close();
