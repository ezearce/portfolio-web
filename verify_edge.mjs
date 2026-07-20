import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';

await mkdir('C:/tmp', { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1400, height: 900 });

const errs = [];
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

await page.screenshot({ path: 'C:/tmp/hero.png' });
console.log('hero done');

for (const id of ['hero','services','projects','about','process','contact']) {
  const el = await page.$('#' + id);
  console.log('#' + id + ': ' + (el ? 'FOUND' : 'MISSING'));
}

for (const id of ['services','projects','about','contact']) {
  await page.evaluate(i => document.getElementById(i)?.scrollIntoView({behavior:'instant'}), id);
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'C:/tmp/' + id + '.png' });
  console.log(id + ' screenshot done');
}

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: 'C:/tmp/fullpage.png', fullPage: true });
console.log('fullpage done');
console.log('errors:', errs.length ? errs : 'none');
await browser.close();
