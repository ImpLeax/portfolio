import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Optional maintenance utility. The generated PNG is committed, so builds need no browser.
const font = await readFile(
  new URL(
    '../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
    import.meta.url,
  ),
);
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
    @font-face { font-family: Geist; src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2'); font-weight: 100 900; }
    * { box-sizing: border-box; } body { margin: 0; width: 1200px; height: 630px; padding: 62px 76px; background: #101214; color: #f0f1f3; font-family: Geist, sans-serif; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #30363f; padding-bottom: 27px; }
    .logo { font-size: 35px; font-weight: 750; letter-spacing: -3px; } .accent { color: #a6bfff; } .name { color: #a0a6af; font-size: 18px; }
    .label { margin-top: 42px; color: #a6bfff; font-size: 13px; letter-spacing: 2px; } h1 { font-size: 83px; font-weight: 600; line-height: 1.1; letter-spacing: -5px; margin: 20px 0 26px; } h1 > span { color: #a0a6af; }
    footer { display: flex; justify-content: space-between; align-items: center; margin-top: 41px; padding-top: 25px; border-top: 1px solid #30363f; color: #a0a6af; font-size: 17px; } .arrow { color: #a6bfff; font-size: 30px; }
    </style><body><header><span class="logo">VB<span class="accent">.</span></span><span class="name">Volodymyr Bondarchuk</span></header><div class="label">JUNIOR DEVELOPER / PORTFOLIO</div><h1>Python Backend<br><span>Developer<span class="accent">.</span></span></h1><footer><span>Django &nbsp;·&nbsp; REST API &nbsp;·&nbsp; PostgreSQL &nbsp;·&nbsp; Automation</span><span class="arrow">↗</span></footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await mkdir(new URL('../public/images/', import.meta.url), { recursive: true });
  await page.screenshot({
    path: fileURLToPath(new URL('../public/images/social-card.png', import.meta.url)),
  });
} finally {
  await browser.close();
}
